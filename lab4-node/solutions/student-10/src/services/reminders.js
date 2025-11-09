
import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('data');
const coursesFile = path.join(dataDir, 'courses.json');
const stateFile = path.join(dataDir, 'state.json');

let botInstance = null;
async function getBot() {
  if (!botInstance) {
    const mod = await import('../bot.js');
    botInstance = mod.default;
  }
  return botInstance;
}

function readJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return fallback; }
}

function notifyUpcoming(deadlineDateISO) {
  const now = new Date();
  const dl = new Date(deadlineDateISO);
  const diffMs = dl - now;
  const hours = diffMs / (1000*60*60);
  return hours > 0 && hours <= 24; // within next 24 hours
}

export default {
  start: function start() {
    // Run check every 10 minutes
    setInterval(async () => {
      try {
        const courses = readJSON(coursesFile, []);
        const state = readJSON(stateFile, {});
        const chatIds = Object.keys(state).filter(id => !!id);
        if (chatIds.length === 0) return;
        for (const c of courses) {
          if (c.deadline && notifyUpcoming(c.deadline)) {
            const bot = await getBot();
            for (const id of chatIds) {
              try {
                await bot.sendMessage(Number(id), `⚠️ Напоминание: у курса "${c.title}" дедлайн ${c.deadline}`);
              } catch (e) { /* ignore per-user send errors */ }
            }
          }
        }
      } catch (e) {
        console.error('Reminders error', e);
      }
    }, 10 * 60 * 1000);
  }
};
