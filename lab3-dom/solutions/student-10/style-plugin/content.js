// KAI Style Changer - плагин для темной темы kai.ru
// Студент №10

(function() {
    'use strict';
    
    if (!window.location.href.includes('kai.ru')) {
        return;
    }
    
    let isStyleEnabled = false;
    
    function init() {
        const savedState = localStorage.getItem('kaiStyleEnabled');
        isStyleEnabled = savedState === 'true';
        
        createToggleButton();
        
        if (isStyleEnabled) {
            applyDarkTheme();
        }
    }
    
    function createToggleButton() {
        const oldButton = document.getElementById('kai-style-toggle');
        if (oldButton) oldButton.remove();
        
        const toggleButton = document.createElement('button');
        toggleButton.id = 'kai-style-toggle';
        toggleButton.innerHTML = isStyleEnabled ? '🌙 Тема: ВКЛ' : '☀️ Тема: ВЫКЛ';
        toggleButton.title = 'Переключить темную тему';
        
        Object.assign(toggleButton.style, {
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: '10000',
            padding: '10px 15px',
            backgroundColor: isStyleEnabled ? '#4CAF50' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            fontFamily: 'Arial, sans-serif'
        });
        
        toggleButton.addEventListener('click', function() {
            isStyleEnabled = !isStyleEnabled;
            localStorage.setItem('kaiStyleEnabled', isStyleEnabled);
            
            if (isStyleEnabled) {
                applyDarkTheme();
                toggleButton.innerHTML = '🌙 Тема: ВКЛ';
                toggleButton.style.backgroundColor = '#4CAF50';
            } else {
                removeDarkTheme();
                toggleButton.innerHTML = '☀️ Тема: ВЫКЛ';
                toggleButton.style.backgroundColor = '#f44336';
            }
        });
        
        document.body.appendChild(toggleButton);
    }
    
    function applyDarkTheme() {
        // Глобальные стили для body и общих элементов
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#e0e0e0';
        
        // Принудительно меняем фон всех основных контейнеров
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const bgColor = window.getComputedStyle(el).backgroundColor;
            const color = window.getComputedStyle(el).color;
            
            // Если элемент имеет белый или светлый фон
            if (bgColor.includes('255, 255, 255') || 
                bgColor.includes('255,255,255') ||
                bgColor === 'rgb(255, 255, 255)' ||
                bgColor === '#ffffff' ||
                bgColor === 'white') {
                el.style.backgroundColor = '#2d2d2d';
            }
            
            // Если элемент имеет очень светлый фон
            if (bgColor.includes('248, 248, 248') || 
                bgColor.includes('245, 245, 245') ||
                bgColor.includes('240, 240, 240')) {
                el.style.backgroundColor = '#3a3a3a';
            }
            
            // Если текст черный
            if (color === 'rgb(0, 0, 0)' || color === '#000000' || color === 'black') {
                el.style.color = '#e0e0e0';
            }
        });
        
        // Специфичные элементы по ID
        const header = document.getElementById('header');
        if (header) {
            header.style.backgroundColor = '#2d2d2d';
            header.style.borderBottom = '2px solid #444';
        }
        
        // Навигация - используем сложный селектор
        const navbar = document.querySelector('nav.navbar-default');
        if (navbar) {
            navbar.style.backgroundColor = '#333333';
            // Используем parentElement
            const navParent = navbar.parentElement;
            if (navParent) {
                navParent.style.backgroundColor = '#333333';
            }
            
            // Используем children для элементов навигации
            const navChildren = navbar.children;
            for (let i = 0; i < navChildren.length; i++) {
                const child = navChildren[i];
                child.style.backgroundColor = '#333333';
            }
        }
        
        // Все контейнеры и обертки
        const containers = document.querySelectorAll('.container, .container-fluid, .wrapper, .content, .main, .row, .col-md-, .col-sm-, .col-xs-, .col-lg-');
        containers.forEach(container => {
            container.style.backgroundColor = '#2d2d2d';
            container.style.color = '#e0e0e0';
        });
        
        // Все карточки, панели и блоки
        const panels = document.querySelectorAll('[class*="panel"], [class*="card"], [class*="block"], [class*="box"], [class*="well"], [class*="widget"]');
        panels.forEach(panel => {
            panel.style.backgroundColor = '#3a3a3a';
            panel.style.color = '#e0e0e0';
            panel.style.border = '1px solid #555';
            panel.style.borderRadius = '6px';
        });
        
        // Заголовки
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6');
        headings.forEach(heading => {
            heading.style.color = '#80b3ff';
        });
        
        // Таблицы и их элементы
        const tables = document.querySelectorAll('table, .table');
        tables.forEach(table => {
            table.style.backgroundColor = '#3a3a3a';
            table.style.color = '#e0e0e0';
            
            const thCells = table.querySelectorAll('th');
            thCells.forEach(th => {
                th.style.backgroundColor = '#444';
                th.style.color = '#ffffff';
            });
            
            const tdCells = table.querySelectorAll('td');
            tdCells.forEach(td => {
                td.style.backgroundColor = '#3a3a3a';
                td.style.color = '#e0e0e0';
            });
        });
        
        // Формы
        const forms = document.querySelectorAll('form, .form');
        forms.forEach(form => {
            form.style.backgroundColor = '#3a3a3a';
            form.style.color = '#e0e0e0';
        });
        
        const inputs = document.querySelectorAll('input, select, textarea, .form-control');
        inputs.forEach(input => {
            input.style.backgroundColor = '#444';
            input.style.color = '#e0e0e0';
            input.style.border = '1px solid #666';
        });
        
        // Кнопки
        const buttons = document.querySelectorAll('button, .btn, input[type="submit"], input[type="button"]');
        buttons.forEach(button => {
            if (!button.id.includes('kai-style-toggle')) {
                button.style.backgroundColor = '#0066cc';
                button.style.color = 'white';
                button.style.border = 'none';
            }
        });
        
        // Ссылки
        const links = document.querySelectorAll('a, .link');
        links.forEach(link => {
            link.style.color = '#80b3ff';
        });
        
        // Футер
        const footers = document.querySelectorAll('footer, .footer');
        footers.forEach(footer => {
            footer.style.backgroundColor = '#2d2d2d';
            footer.style.color = '#b0b0b0';
        });
        
        // Списки
        const lists = document.querySelectorAll('ul, ol, .list-group');
        lists.forEach(list => {
            list.style.backgroundColor = '#3a3a3a';
            list.style.color = '#e0e0e0';
            
            const listItems = list.querySelectorAll('li');
            listItems.forEach(item => {
                item.style.backgroundColor = '#3a3a3a';
                item.style.color = '#e0e0e0';
                item.style.borderColor = '#555';
            });
        });
        
        // Баннеры и джамботроны
        const jumbotrons = document.querySelectorAll('.jumbotron, .banner, .hero');
        jumbotrons.forEach(jumbo => {
            jumbo.style.backgroundColor = '#333';
            jumbo.style.color = '#e0e0e0';
        });
        
        // Навбары и меню
        const navs = document.querySelectorAll('nav, .nav, .navbar, .menu');
        navs.forEach(nav => {
            nav.style.backgroundColor = '#333333';
        });
        
        // Иконки и изображения (инвертируем светлые иконки)
        const icons = document.querySelectorAll('img[src*="icon"], .icon, .fa');
        icons.forEach(icon => {
            if (icon.src && (icon.src.includes('white') || icon.src.includes('light'))) {
                icon.style.filter = 'invert(1) brightness(2)';
            }
        });
        
        // Модальные окна
        const modals = document.querySelectorAll('.modal, .modal-content, .modal-header, .modal-body, .modal-footer');
        modals.forEach(modal => {
            modal.style.backgroundColor = '#3a3a3a';
            modal.style.color = '#e0e0e0';
            modal.style.borderColor = '#555';
        });
        
        // Вкладки
        const tabs = document.querySelectorAll('.tab-content, .tab-pane, .nav-tabs');
        tabs.forEach(tab => {
            tab.style.backgroundColor = '#3a3a3a';
            tab.style.color = '#e0e0e0';
        });
        
        // Добавляем CSS-фильтр для инвертирования светлых элементов
        const style = document.createElement('style');
        style.id = 'kai-dark-theme';
        style.textContent = `
            .navbar-default .navbar-nav > li > a { color: #80b3ff !important; }
            .dropdown-menu { background-color: #3a3a3a !important; border-color: #555 !important; }
            .dropdown-menu > li > a { color: #e0e0e0 !important; }
            .breadcrumb { background-color: #3a3a3a !important; }
            .pagination > li > a { background-color: #444 !important; border-color: #555 !important; color: #e0e0e0 !important; }
            .label { color: #1a1a1a !important; }
            .badge { background-color: #0066cc !important; }
            .alert { background-color: #2d2d2d !important; border-color: #555 !important; color: #e0e0e0 !important; }
            .progress { background-color: #444 !important; }
            .list-group-item { background-color: #3a3a3a !important; border-color: #555 !important; color: #e0e0e0 !important; }
            * { background-color: #2d2d2d !important; color: #e0e0e0 !important; }
        `;
        document.head.appendChild(style);
    }
    
    function removeDarkTheme() {
        const styleElement = document.getElementById('kai-dark-theme');
        if (styleElement) {
            styleElement.remove();
        }
        window.location.reload();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();