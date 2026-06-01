# EduHelper Bot

Telegram бот-ассистент для студентов онлайн-курсов.

## Функциональность

### /courses
- Показывает список доступных курсов
- Отображает прогресс по каждому курсу
- Напоминает о дедлайнах и ближайших занятиях

### /homework
- Принимает выполненные задания в текстовом виде или файлом
- Отслеживает статус проверки работ
- /homework_status - показывает комментарии преподавателя

### /materials
- Предоставляет доступ к учебным материалам
- Рекомендует дополнительные ресурсы по темам (/js, /node, /react)

## Установка
npm install

## Настройка
- Создайте бота в Telegram через @BotFather
- Получите токен
- Создайте файл .env:
TELEGRAM_BOT_TOKEN=ваш_токен_здесь

## Запуск
npm start

## Тестирование
npm test
npm run test:coverage

## Линтинг
npm run lint
npm run lint:fix

## Примеры работы
screenshots/1.png
screenshots/2.png
screenshots/3.png

## Технологии
- Node.js (ES Modules)
- node-telegram-bot-api
- Jest (тестирование)
- ESLint (отступы 2 пробела)

## Автор
Студент №10
