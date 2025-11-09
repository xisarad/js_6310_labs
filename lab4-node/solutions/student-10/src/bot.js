
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { handleMessage, handleCommand } from './handlers/commands.js';

dotenv.config();
const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN is not set in .env');
  process.exit(1);
}
const bot = new TelegramBot(token, { polling: true });

// Ensure data files exist
const dataDir = path.resolve('data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const statePath = path.join(dataDir, 'state.json');
if (!fs.existsSync(statePath)) fs.writeFileSync(statePath, '{}');
const submissionsPath = path.join(dataDir, 'submissions.json');
if (!fs.existsSync(submissionsPath)) fs.writeFileSync(submissionsPath, '[]');

bot.on('message', async (msg) => {
  try {
    await handleMessage(bot, msg);
  } catch (err) {
    console.error('Error handling message', err);
    // do not crash the bot
  }
});

bot.onText(/\/(start|courses|materials|homework|status)/, async (msg, match) => {
  try {
    await handleCommand(bot, msg, match[1]);
  } catch (err) {
    console.error('Error handling command', err);
  }
});

export default bot;
