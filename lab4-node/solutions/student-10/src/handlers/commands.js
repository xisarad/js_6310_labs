
import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('data');
const stateFile = path.join(dataDir, 'state.json');
const submissionsFile = path.join(dataDir, 'submissions.json');
const coursesFile = path.join(dataDir, 'courses.json');
const materialsFile = path.join(dataDir, 'materials.json');

function readJSON(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return fallback;
  }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Simple FSM states:
// null or 'idle' - no active flow
// 'awaiting_task_name' - after /homework, ask for task name
// 'awaiting_submission' - waiting for text or file
// Persist per chatId in state.json
export async function handleCommand(bot, msg, cmd) {
  const chatId = String(msg.chat.id);
  const state = readJSON(stateFile, {});
  if (!state[chatId]) state[chatId] = { state: 'idle' };
  if (cmd === 'start') {
    await bot.sendMessage(chatId, 'Привет! EduHelper бот. Команды: /courses, /materials, /homework, /status');
    writeJSON(stateFile, state);
    return;
  }
  if (cmd === 'courses') {
    const courses = readJSON(coursesFile, []);
    const lines = courses.map(c => {
      const dl = c.deadline ? ` — дедлайн: ${c.deadline}` : '';
      return `${c.title} — прогресс: ${c.progress}%${dl}`;
    });
    await bot.sendMessage(chatId, lines.join('\n'));
    return;
  }
  if (cmd === 'materials') {
    const materials = readJSON(materialsFile, []);
    const lines = materials.map(m => `${m.title}: ${m.link}`);
    await bot.sendMessage(chatId, lines.join('\n'));
    return;
  }
  if (cmd === 'homework') {
    state[chatId] = { state: 'awaiting_task_name' };
    writeJSON(stateFile, state);
    await bot.sendMessage(chatId, 'Как называется задание? Введите имя задания (например, HW1)');
    return;
  }
  if (cmd === 'status') {
    const subs = readJSON(submissionsFile, []);
    const mine = subs.filter(s => String(s.chatId) === chatId);
    if (mine.length === 0) {
      await bot.sendMessage(chatId, 'У вас пока нет отправленных работ.');
    } else {
      const lines = mine.map(s => `${s.task} — статус: ${s.status} ${s.comment ? '\nКомментарий: ' + s.comment : ''}`);
      await bot.sendMessage(chatId, lines.join('\n\n'));
    }
    return;
  }
}

export async function handleMessage(bot, msg) {
  const chatId = String(msg.chat.id);
  const state = readJSON(stateFile, {});
  if (!state[chatId]) state[chatId] = { state: 'idle' };
  const s = state[chatId].state || 'idle';

  // if message is a command, ignore here; commands handled separately
  if (msg.text && msg.text.startsWith('/')) return;

  if (s === 'awaiting_task_name') {
    // user provided task name, advance to submission
    state[chatId] = { state: 'awaiting_submission', task: msg.text.trim() };
    writeJSON(stateFile, state);
    await bot.sendMessage(chatId, `Ок, задание "${msg.text.trim()}". Пришлите текст работы или документ.`);
    return;
  }
  if (s === 'awaiting_submission') {
    // accept text or document
    const subs = readJSON(submissionsFile, []);
    const task = state[chatId].task || 'unknown';
    let entry = { chatId: chatId, task, date: new Date().toISOString(), status: 'submitted' };
    if (msg.text) {
      entry.content = msg.text;
    } else if (msg.document) {
      entry.file_name = msg.document.file_name || 'file';
      entry.file_id = msg.document.file_id;
    }
    subs.push(entry);
    writeJSON(submissionsFile, subs);
    // reset state to idle
    state[chatId] = { state: 'idle' };
    writeJSON(stateFile, state);
    await bot.sendMessage(chatId, '✅ Домашка принята и отправлена на проверку. Используйте /status для просмотра статуса.');
    return;
  }

  // default response for other messages
  await bot.sendMessage(chatId, 'Я не ожидал этого сообщения. Используйте /homework для отправки работ или /courses.');
}
