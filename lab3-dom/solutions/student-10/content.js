// content.js - Обновленная версия для kai.ru
'use strict';

function addThemeToggleButton() {
    if (document.querySelector('.kai-dark-toggle')) return;

    const button = document.createElement('button');
    button.className = 'kai-dark-toggle';
    button.textContent = '🌙 Тёмная тема';

    // Проверяем и применяем сохранённую тему
    const isDarkTheme = localStorage.getItem('kai-dark-theme') === 'true';
    if (isDarkTheme) {
        document.documentElement.classList.add('kai-dark-theme');
        button.textContent = '☀️ Светлая тема';
    }

    // Обработчик клика
    button.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('kai-dark-theme');
        button.textContent = isDark ? '☀️ Светлая тема' : '🌙 Тёмная тема';
        localStorage.setItem('kai-dark-theme', isDark);
    });

    document.body.appendChild(button);
}

// Запускаем добавление кнопки после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addThemeToggleButton);
} else {
    addThemeToggleButton();
}
