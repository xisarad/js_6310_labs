import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import stateManager from './stateManager.js';
import { getCourses, submitHomework, getHomeworkStatus, materials } from './courses.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('TELEGRAM_BOT_TOKEN not found in .env file');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Глобальный обработчик ошибок
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// Конечный автомат для команд
const commandHandlers = {
  async handleCourses(userId) {
    const courses = getCourses();
    let message = '📚 Ваши курсы:\n\n';
    
    for (const course of courses) {
      const progressBar = '█'.repeat(Math.floor(course.progress / 10)) + 
                         '░'.repeat(10 - Math.floor(course.progress / 10));
      message += `${course.name}\n`;
      message += `Прогресс: ${progressBar} ${course.progress}%\n`;
      message += `Дедлайн: ${course.deadline}\n`;
      message += `Ближайшее занятие: ${course.nextClass}\n\n`;
    }
    
    await bot.sendMessage(userId, message);
    stateManager.clearState(userId);
  },

  async startHomework(userId) {
    stateManager.setState(userId, 'homework', 'waiting_text');
    await bot.sendMessage(userId, '📝 Отправьте текст выполненного задания или файл с решением:');
  },

  async handleHomeworkText(userId, text) {
    const submission = submitHomework(userId, text);
    await bot.sendMessage(userId, `✅ Задание #${submission.id} принято на проверку!\nСтатус: ожидает проверки`);
    stateManager.clearState(userId);
  },

  async handleHomeworkFile(userId, fileId, fileName) {
    const submission = submitHomework(userId, `[Файл: ${fileName}]`, fileId);
    await bot.sendMessage(userId, `✅ Файл "${fileName}" принят на проверку!\nЗадание #${submission.id}\nСтатус: ожидает проверки`);
    stateManager.clearState(userId);
  },

  async handleHomeworkStatus(userId) {
    const submissions = getHomeworkStatus(userId);
    if (submissions.length === 0) {
      await bot.sendMessage(userId, '📭 У вас пока нет отправленных заданий.');
      stateManager.clearState(userId);
      return;
    }
    
    let message = '📋 Статус ваших заданий:\n\n';
    for (const sub of submissions) {
      const statusEmoji = sub.status === 'pending' ? '⏳' : (sub.status === 'approved' ? '✅' : '❌');
      message += `${statusEmoji} #${sub.id}: ${sub.text}\n`;
      message += `Статус: ${sub.status === 'pending' ? '⏳ На проверке' : (sub.status === 'approved' ? '✅ Зачтено' : '❌ Требует доработки')}\n`;
      if (sub.feedback) {
        message += `📝 Комментарий: ${sub.feedback}\n`;
      }
      message += '\n';
    }
    
    await bot.sendMessage(userId, message);
    stateManager.clearState(userId);
  },

  async handleMaterials(userId, topic = null) {
    if (!topic) {
      const topics = Object.entries(materials).map(([key, mat]) => 
        `/${key} - ${mat.title}`
      ).join('\n');
      await bot.sendMessage(userId, `📖 Доступные материалы:\n\n${topics}\n\nВыберите тему командой (/js, /node, /react)`);
      return;
    }
    
    const material = materials[topic];
    if (material) {
      const message = `${material.title}\n\n${material.description}\n\nСсылка: ${material.url}`;
      await bot.sendMessage(userId, message);
    } else {
      await bot.sendMessage(userId, '❌ Тема не найдена. Доступные темы: /js, /node, /react');
    }
    stateManager.clearState(userId);
  }
};

// Обработка текстовых сообщений
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const userId = msg.from.id;
  
  // Игнорируем команды, которые обрабатываются отдельно
  if (text && text.startsWith('/')) return;
  
  const state = stateManager.getState(userId);
  
  // Если пользователь в процессе отправки домашнего задания
  if (state.command === 'homework' && state.step === 'waiting_text') {
    await commandHandlers.handleHomeworkText(userId, text);
    return;
  }
  
  await bot.sendMessage(chatId, 'Используйте команды: /courses, /homework, /materials');
});

// Обработка документов (файлов)
bot.on('document', async (msg) => {
  const userId = msg.from.id;
  const fileId = msg.document.file_id;
  const fileName = msg.document.file_name;
  
  const state = stateManager.getState(userId);
  if (state.command === 'homework' && state.step === 'waiting_text') {
    await commandHandlers.handleHomeworkFile(userId, fileId, fileName);
  } else {
    await bot.sendMessage(msg.chat.id, 'Сначала введите команду /homework, затем отправьте файл');
  }
});

// Команда /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `🎓 Добро пожаловать в EduHelper!\n\nЯ ваш ассистент в обучении.\n\nДоступные команды:\n/courses - список курсов и прогресс\n/homework - отправить задание на проверку\n/materials - учебные материалы\n\n/homework_status - статус отправленных заданий`;
  await bot.sendMessage(chatId, welcomeMessage);
  stateManager.clearState(msg.from.id);
});

// Команда /courses
bot.onText(/\/courses/, async (msg) => {
  await commandHandlers.handleCourses(msg.from.id);
});

// Команда /homework
bot.onText(/\/homework/, async (msg) => {
  await commandHandlers.startHomework(msg.from.id);
});

// Команда /homework_status
bot.onText(/\/homework_status/, async (msg) => {
  await commandHandlers.handleHomeworkStatus(msg.from.id);
});

// Команда /materials
bot.onText(/\/materials/, async (msg) => {
  await commandHandlers.handleMaterials(msg.from.id);
});

// Команды для материалов
bot.onText(/\/js/, async (msg) => {
  await commandHandlers.handleMaterials(msg.from.id, 'js');
});

bot.onText(/\/node/, async (msg) => {
  await commandHandlers.handleMaterials(msg.from.id, 'node');
});

bot.onText(/\/react/, async (msg) => {
  await commandHandlers.handleMaterials(msg.from.id, 'react');
});

console.log('🤖 EduHelper bot started successfully!');
