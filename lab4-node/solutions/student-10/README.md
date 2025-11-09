# EduHelper — обновлённый конфиг для ESLint и Jest

Этот архив содержит исправленные конфигурации для запуска:
- `npm run lint`
- `npm run test`
- `npm run test:coverage`

## Что сделано
✅ ESLint теперь использует новый формат `eslint.config.js`  
✅ Jest настроен для ESM (Node 18+ поддерживается)  
✅ Скрипты в package.json исправлены

## Использование
1. Распакуйте архив в корень проекта (где ваш src/, data/ и tests/).
2. Замените существующие файлы `eslint.config.js`, `jest.config.js` и `package.json`.
3. Выполните:
   ```bash
   npm install
   npm run lint
   npm test
   ```
