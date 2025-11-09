'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    static vehicleCount = 0; // статическое свойство для подсчёта

    constructor(make, model, year) {
        this._validateMake(make);
        this._validateModel(model);
        this._validateYear(year);
        
        this.make = make;
        this.model = model;
        this._year = year; // используем приватное поле _year
        Vehicle.vehicleCount++;
    }

    _validateMake(make) {
        if (typeof make !== 'string' || make.trim() === '') {
            throw new Error('Марка должна быть непустой строкой!');
        }
    }

    _validateModel(model) {
        if (typeof model !== 'string' || model.trim() === '') {
            throw new Error('Модель должна быть непустой строкой!');
        }
    }

    _validateYear(year) {
        const currentYear = new Date().getFullYear();
        if (typeof year !== 'number' || !Number.isInteger(year)) {
            throw new Error('Год должен быть целым числом!');
        }
        if (year < 1886) { // Первый автомобиль был создан в 1886 году
            throw new Error('Год не может быть меньше 1886!');
        }
        if (year > currentYear) {
            throw new Error('Год выпуска не может быть больше текущего!');
        }
    }

    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this._year}`);
    }

    get age() {
        return new Date().getFullYear() - this._year;
    }

    set year(newYear) {
        this._validateYear(newYear);
        this._year = newYear;
    }

    get year() {
        return this._year;
    }

    static compareAge(vehicle1, vehicle2) {
        return Math.abs(vehicle1.age - vehicle2.age);
    }

    static getTotalVehicles() {
        return Vehicle.vehicleCount;
    }
}

// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    constructor(make, model, year, numDoors) {
        super(make, model, year);
        this._validateNumDoors(numDoors);
        this.numDoors = numDoors;
    }

    _validateNumDoors(numDoors) {
        if (typeof numDoors !== 'number' || !Number.isInteger(numDoors)) {
            throw new Error('Количество дверей должно быть целым числом!');
        }
        if (numDoors < 1 || numDoors > 10) {
            throw new Error('Количество дверей должно быть от 1 до 10!');
        }
    }

    displayInfo() {
        super.displayInfo();
        console.log(`Количество дверей: ${this.numDoors}`);
    }

    honk() {
        console.log("Beep beep!");
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    constructor(make, model, year, numDoors, batteryCapacity) {
        super(make, model, year, numDoors);
        this._validateBatteryCapacity(batteryCapacity);
        this.batteryCapacity = batteryCapacity;
    }

    _validateBatteryCapacity(batteryCapacity) {
        if (typeof batteryCapacity !== 'number') {
            throw new Error('Ёмкость батареи должна быть числом!');
        }
        if (batteryCapacity <= 0) {
            throw new Error('Ёмкость батареи должна быть положительным числом!');
        }
        if (batteryCapacity > 1000) {
            throw new Error('Ёмкость батареи не может превышать 1000 кВт·ч!');
        }
    }

    displayInfo() {
        super.displayInfo();
        console.log(`Ёмкость батареи: ${this.batteryCapacity} кВт·ч`);
    }

    calculateRange() {
        return this.batteryCapacity * 6; // 1 кВт·ч = 6 км
    }
}

// ===== ЗАДАНИЕ 4: Каррирование =====
const createVehicleFactory = (VehicleClass) => (...args) => {
    return new VehicleClass(...args);
};

// Автоматические тесты
function runTests() {
    console.log('Запуск тестов...');
    let testPassed = 0;
    let testFailed = 0;

    function assert(condition, message) {
        if (condition) {
            console.log(`✅ ${message}`);
            testPassed++;
        } else {
            console.log(`❌ ${message}`);
            testFailed++;
        }
    }

    function assertThrows(func, errorMessage, testName) {
        try {
            func();
            console.log(`❌ ${testName} - Ожидалась ошибка, но её не было`);
            testFailed++;
        } catch (e) {
            if (e.message === errorMessage) {
                console.log(`✅ ${testName}`);
                testPassed++;
            } else {
                console.log(`❌ ${testName} - Получена ошибка: "${e.message}", ожидалась: "${errorMessage}"`);
                testFailed++;
            }
        }
    }

    // Тесты для Vehicle
    console.log('\n=== Тесты для Vehicle ===');
    
    // Корректное создание
    try {
        const vehicle = new Vehicle('Toyota', 'Camry', 2015);
        vehicle.displayInfo();
        console.log(`Возраст: ${vehicle.age} лет`);
        assert(true, 'Корректное создание Vehicle');
    } catch (e) {
        assert(false, 'Корректное создание Vehicle');
    }

    // Тесты на валидацию Vehicle
    assertThrows(
        () => new Vehicle("", 'Camry', 2015),
        'Марка должна быть непустой строкой!',
        'Vehicle: пустая марка'
    );

    assertThrows(
        () => new Vehicle('Toyota', '', 2015),
        'Модель должна быть непустой строкой!',
        'Vehicle: пустая модель'
    );

    assertThrows(
        () => new Vehicle('Toyota', 'Camry', 2030),
        'Год выпуска не может быть больше текущего!',
        'Vehicle: год больше текущего'
    );

    assertThrows(
        () => new Vehicle('Toyota', 'Camry', 1885),
        'Год не может быть меньше 1886!',
        'Vehicle: год меньше 1886'
    );

    assertThrows(
        () => new Vehicle('Toyota', 'Camry', '2015'),
        'Год должен быть целым числом!',
        'Vehicle: год как строка'
    );

    // Тест сеттера year
    console.log('\n=== Тесты сеттера year ===');
    const testVehicle = new Vehicle('Test', 'Model', 2010);
    
    try {
        testVehicle.year = 2020;
        assert(testVehicle.year === 2020, 'Сеттер year: корректное значение');
    } catch (e) {
        assert(false, 'Сеттер year: корректное значение');
    }

    assertThrows(
        () => { testVehicle.year = 2030; },
        'Год выпуска не может быть больше текущего!',
        'Сеттер year: год больше текущего'
    );

    // Тесты для Car
    console.log('\n=== Тесты для Car ===');
    
    // Корректное создание
    try {
        const car = new Car('Honda', 'Civic', 2018, 4);
        car.displayInfo();
        car.honk();
        assert(true, 'Корректное создание Car');
    } catch (e) {
        assert(false, 'Корректное создание Car');
    }

    // Тесты на валидацию Car
    assertThrows(
        () => new Car('Honda', 'Civic', 2018, "4"),
        'Количество дверей должно быть целым числом!',
        'Car: количество дверей как строка'
    );

    assertThrows(
        () => new Car('Honda', 'Civic', 2018, 0),
        'Количество дверей должно быть от 1 до 10!',
        'Car: 0 дверей'
    );

    assertThrows(
        () => new Car('Honda', 'Civic', 2018, 11),
        'Количество дверей должно быть от 1 до 10!',
        'Car: 11 дверей'
    );

    // Тесты для ElectricCar
    console.log('\n=== Тесты для ElectricCar ===');
    
    // Корректное создание
    try {
        const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
        electricCar.displayInfo();
        console.log(`Запас хода: ${electricCar.calculateRange()} км`);
        assert(true, 'Корректное создание ElectricCar');
    } catch (e) {
        assert(false, 'Корректное создание ElectricCar');
    }

    // Тесты на валидацию ElectricCar
    assertThrows(
        () => new ElectricCar('Tesla', 'Model 3', 2020, 4, "75"),
        'Ёмкость батареи должна быть числом!',
        'ElectricCar: ёмкость батареи как строка'
    );

    assertThrows(
        () => new ElectricCar('Tesla', 'Model 3', 2020, 4, -10),
        'Ёмкость батареи должна быть положительным числом!',
        'ElectricCar: отрицательная ёмкость батареи'
    );

    assertThrows(
        () => new ElectricCar('Tesla', 'Model 3', 2020, 4, 0),
        'Ёмкость батареи должна быть положительным числом!',
        'ElectricCar: нулевая ёмкость батареи'
    );

    // Тест фабрики с каррированием
    console.log('\n=== Тесты фабрики ===');
    
    const createCarFactory = createVehicleFactory(Car);
    const createElectricCarFactory = createVehicleFactory(ElectricCar);
    
    try {
        const myNewCar = createCarFactory('BMW', 'X5', 2022, 5);
        console.log('Создан новый автомобиль:');
        myNewCar.displayInfo();
        assert(true, 'Фабрика Car работает корректно');
    } catch (e) {
        assert(false, 'Фабрика Car работает корректно');
    }

    try {
        const myNewElectricCar = createElectricCarFactory('Tesla', 'Model S', 2023, 4, 100);
        console.log('Создан новый электромобиль:');
        myNewElectricCar.displayInfo();
        assert(true, 'Фабрика ElectricCar работает корректно');
    } catch (e) {
        assert(false, 'Фабрика ElectricCar работает корректно');
    }

    // Тесты статических методов
    console.log('\n=== Тесты статических методов ===');
    
    console.log('Всего создано транспортных средств:', Vehicle.getTotalVehicles());
    
    const vehicle1 = new Vehicle('Toyota', 'Corolla', 2015);
    const vehicle2 = new Vehicle('Honda', 'Accord', 2020);
    const ageDifference = Vehicle.compareAge(vehicle1, vehicle2);
    console.log('Разница в возрасте:', ageDifference);
    assert(ageDifference === 5, 'Статический метод compareAge работает корректно');

    // Итоги тестирования
    console.log('\n=== Итоги тестирования ===');
    console.log(`Пройдено тестов: ${testPassed}`);
    console.log(`Провалено тестов: ${testFailed}`);
    console.log(`Общее покрытие: ${((testPassed / (testPassed + testFailed)) * 100).toFixed(1)}%`);
    
    if (testFailed === 0) {
        console.log('\n🎉 Все тесты пройдены успешно! ✅');
    } else {
        console.log('\n⚠️ Некоторые тесты провалены, требуется доработка');
    }
}

// Сброс счётчика перед запуском тестов
Vehicle.vehicleCount = 0;
runTests();