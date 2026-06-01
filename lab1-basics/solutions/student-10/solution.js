// ===== ЗАДАНИЕ 1: Базовые операции =====
function simpleTask() {
    // 1.1 Объявите переменные разных типов (не менее 5)
    let name = "Иван";           // string
    let age = 20;                // number
    let isStudent = true;        // boolean
    let grades = [5, 4, 3];      // object (array)
    let person = { id: 1 };      // object
    let nothing = null;          // null
    
    // 1.2 Выведите типы всех переменных
    console.log("Тип name:", typeof name);
    console.log("Тип age:", typeof age);
    console.log("Тип isStudent:", typeof isStudent);
    console.log("Тип grades:", typeof grades);
    console.log("Тип person:", typeof person);
    console.log("Тип nothing:", typeof nothing);
}

// ===== ЗАДАНИЕ 2: Функции =====
function getReviewerNumber(number, lab) {
    // 2.1 Функция определяющая номер ревьюера для вашей группы по вашему номеру и номеру лабораторной работы
    const totalStudents = 23;
    return (number + lab) % totalStudents;
}

function getVariant(number, variants) {
    // 2.2 Функция определяющая номер варианта, исходя из количества вариантов
    return (number % variants) === 0 ? variants : (number % variants);
}

function calculate(a, b, operation) {
    // 2.3 Напишите функцию калькулятор
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : "Ошибка: деление на ноль";
        default: return "Неизвестная операция";
    }
}

function calculateArea(figure, ...params) {
    // 2.4 Напишите функцию для определения площади фигур
    switch (figure) {
        case 'circle':
            const [radius] = params;
            return Math.PI * radius * radius;
        case 'rectangle':
            const [width, height] = params;
            return width * height;
        case 'triangle':
            const [base, h] = params;
            return (base * h) / 2;
        default:
            return 0;
    }
}

// 2.5 Стрелочные функции
const reverseString = (str) => {
    return str.split('').reverse().join('');
};

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ===== ЗАДАНИЕ 3: Объекты =====
const book = {
    // 3.1 Создайте объект "книга"
    title: "Война и мир",
    author: "Лев Толстой",
    year: 1869,
    pages: 1225,
    isAvailable: true,
    
    getInfo() {
        return `${this.title}, ${this.author}, ${this.year}, ${this.pages} стр.`;
    },
    
    toggleAvailability() {
        this.isAvailable = !this.isAvailable;
        return this.isAvailable;
    }
};

const student = {
    name: "Анна Петрова",
    age: 20,
    course: 2,
    grades: {
        math: 90,
        programming: 95,
        history: 85
    },
    
    getAverageGrade() {
        const gradesArray = Object.values(this.grades);
        const sum = gradesArray.reduce((acc, grade) => acc + grade, 0);
        return sum / gradesArray.length;
    },
    
    addGrade(subject, grade) {
        this.grades[subject] = grade;
    }
};

// ===== ЗАДАНИЕ 4: Массивы =====
function processArrays() {
    const numbers = [12, 45, 23, 67, 34, 89, 56, 91, 27, 14];
    const words = ["JavaScript", "программирование", "массив", "функция", "объект"];
    const users = [
        { id: 1, name: "Анна", age: 25, isActive: true },
        { id: 2, name: "Борис", age: 30, isActive: false },
        { id: 3, name: "Виктория", age: 22, isActive: true },
        { id: 4, name: "Григорий", age: 35, isActive: true },
        { id: 5, name: "Дарья", age: 28, isActive: false }
    ];
    
    // 1. forEach для вывода всех чисел больше 50
    console.log("Числа больше 50:");
    numbers.forEach(num => {
        if (num > 50) console.log(num);
    });

    // 2. map для создания массива квадратов чисел
    const squares = numbers.map(num => num * num);

    // 3. filter для получения активных пользователей
    const activeUsers = users.filter(user => user.isActive);

    // 4. find для поиска пользователя с именем "Виктория"
    const victoria = users.find(user => user.name === "Виктория");

    // 5. reduce для подсчета суммы всех чисел
    const sum = numbers.reduce((acc, num) => acc + num, 0);

    // 6. sort для сортировки пользователей по возрасту (по убыванию)
    const sortedByAge = [...users].sort((a, b) => b.age - a.age);

    // 7. проверка, все ли пользователи старше 18 лет
    const allAdults = users.every(user => user.age > 18);

    // 8. цепочка методов
    const activeUserNames = users
        .filter(user => user.isActive)
        .map(user => user.name)
        .sort();

    return { squares, activeUsers, victoria, sum, sortedByAge, allAdults, activeUserNames };
}

// ===== ЗАДАНИЕ 5: Менеджер задач =====
const taskManager = {
    tasks: [
        { id: 1, title: "Изучить JavaScript", completed: false, priority: "high" },
        { id: 2, title: "Сделать лабораторную работу", completed: true, priority: "high" },
        { id: 3, title: "Прочитать книгу", completed: false, priority: "medium" }
    ],
    
    addTask(title, priority = "medium") {
        const newId = this.tasks.length > 0 
            ? Math.max(...this.tasks.map(t => t.id)) + 1 
            : 1;
        this.tasks.push({
            id: newId,
            title: title,
            completed: false,
            priority: priority
        });
    },
    
    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
        }
    },

    deleteTask(taskId) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    },

    getTasksByStatus(completed) {
        return this.tasks.filter(t => t.completed === completed);
    },
    
    getStats() {
        const total = this.tasks.length;
        const completedCount = this.tasks.filter(t => t.completed).length;
        const pending = total - completedCount;
        const completionRate = total === 0 ? 0 : (completedCount / total) * 100;
        
        return {
            total,
            completed: completedCount,
            pending,
            completionRate
        };
    }
};

// ===== ЗАДАНИЕ 6: Регулярные выражения =====
// Вариант для студента 10: 10 % 4 = 2 → Вариант 2 (валидация пароля)

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Вариант 2: валидация пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    const phoneRegex = /^(\+7|8)[\s(-]?\d{3}[\s)-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    return phoneRegex.test(phone);
}

function validateDate(date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
    return dateRegex.test(date);
}

// Тесты для варианта 2 (пароль)
function testPasswordValidation() {
    console.log("\n=== Тесты валидации пароля (Вариант 2) ===");
    
    const validPasswords = [
        "Password123!",
        "MyP@ssw0rd",
        "Qwerty123!@#",
        "A1b2C3d4!"
    ];
    
    const invalidPasswords = [
        "weak",           // слишком короткий
        "nouppercase1!",  // нет заглавной
        "NOLOWERCASE1!",  // нет строчной
        "NoNumbers!",     // нет цифр
        "NoSpecial123"    // нет спецсимвола
    ];
    
    console.log("Корректные пароли:");
    validPasswords.forEach(pwd => {
        console.log(`  "${pwd}": ${validatePassword(pwd) ? "✅" : "❌"}`);
    });
    
    console.log("\nНекорректные пароли:");
    invalidPasswords.forEach(pwd => {
        console.log(`  "${pwd}": ${validatePassword(pwd) ? "❌" : "✅"}`);
    });
}

// ===== ТЕСТИРОВАНИЕ =====
function runTests() {
    console.log("=== ТЕСТИРОВАНИЕ ===");
    
    // Тест 1: getReviewerNumber
    console.assert(getReviewerNumber(5, 1) === 6, "Тест получения ревьюера провален");
    console.log("✅ Тест getReviewerNumber пройден");
    
    // Тест 2: calculate
    console.assert(calculate(10, 5, '+') === 15, "Тест калькулятора + провален");
    console.assert(calculate(10, 5, '-') === 5, "Тест калькулятора - провален");
    console.assert(calculate(10, 5, '*') === 50, "Тест калькулятора * провален");
    console.assert(calculate(10, 5, '/') === 2, "Тест калькулятора / провален");
    console.log("✅ Тест calculate пройден");
    
    // Тест 3: calculateArea
    console.assert(Math.abs(calculateArea('circle', 5) - 78.5398) < 0.01, "Тест площади круга провален");
    console.assert(calculateArea('rectangle', 4, 6) === 24, "Тест площади прямоугольника провален");
    console.assert(calculateArea('triangle', 4, 3) === 6, "Тест площади треугольника провален");
    console.log("✅ Тест calculateArea пройден");
    
    // Тест 4: reverseString
    console.assert(reverseString("hello") === "olleh", "Тест reverseString провален");
    console.log("✅ Тест reverseString пройден");
    
    // Тест 5: book object
    console.assert(book.getInfo().includes("Война и мир"), "Тест book.getInfo провален");
    console.assert(book.toggleAvailability() === false, "Тест book.toggleAvailability провален");
    console.log("✅ Тесты book пройдены");
    
    // Тест 6: student object
    console.assert(Math.abs(student.getAverageGrade() - 90) < 0.01, "Тест getAverageGrade пройден");
    student.addGrade("physics", 88);
    console.assert(student.grades.physics === 88, "Тест addGrade пройден");
    console.log("✅ Тесты student пройдены");
    
    // Тест 7: taskManager
    taskManager.addTask("Новая задача");
    console.assert(taskManager.tasks.length === 4, "Тест addTask пройден");
    taskManager.completeTask(4);
    const stats = taskManager.getStats();
    console.assert(stats.completed === 2, "Тест getStats пройден");
    console.log("✅ Тесты taskManager пройдены");
    
    // Тест 8: validatePassword
    console.assert(validatePassword("Password123!") === true, "Тест пароля 1 пройден");
    console.assert(validatePassword("weak") === false, "Тест пароля 2 пройден");
    console.log("✅ Тесты validatePassword пройдены");
    
    console.log("\n🎉 Все тесты пройдены успешно! 🎉");
}

// Запуск тестов
simpleTask();
processArrays();
testPasswordValidation();
runTests();
