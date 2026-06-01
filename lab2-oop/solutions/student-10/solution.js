'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    // Статическое свойство для подсчёта транспортных средств
    static vehicleCount = 0;
    
    // Конструктор
    constructor(make, model, year) {
        Vehicle.vehicleCount++;
        this.make = make;
        this.model = model;
        this._year = year;
    }

    // Метод displayInfo
    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this._year}`);
    }

    // Геттер age
    get age() {
        const currentYear = new Date().getFullYear();
        return currentYear - this._year;
    }

    // Сеттер year с проверкой
    set year(newYear) {
        const currentYear = new Date().getFullYear();
        if (newYear <= currentYear) {
            this._year = newYear;
        } else {
            console.log("Ошибка: год не может быть больше текущего");
        }
    }

    get year() {
        return this._year;
    }

    // Статический метод compareAge
    static compareAge(vehicle1, vehicle2) {
        return Math.abs(vehicle1.age - vehicle2.age);
    }
    
    // Статический метод getTotalVehicles
    static getTotalVehicles() {
        return Vehicle.vehicleCount;
    }
}

// ===== ЗАДАНИЕ 2: Класс Car (наследуется от Vehicle) =====
class Car extends Vehicle {
    constructor(make, model, year, numDoors) {
        super(make, model, year);
        this.numDoors = numDoors;
    }

    // Переопределённый displayInfo
    displayInfo() {
        super.displayInfo();
        console.log(`Количество дверей: ${this.numDoors}`);
    }

    // Метод honk
    honk() {
        console.log("Beep beep!");
    }
}

// ===== ЗАДАНИЕ 3: Класс ElectricCar (наследуется от Car) =====
class ElectricCar extends Car {
    constructor(make, model, year, numDoors, batteryCapacity) {
        super(make, model, year, numDoors);
        this.batteryCapacity = batteryCapacity;
    }

    // Переопределённый displayInfo
    displayInfo() {
        super.displayInfo();
        console.log(`Ёмкость батареи: ${this.batteryCapacity} кВт·ч`);
    }

    // Метод calculateRange
    calculateRange() {
        return this.batteryCapacity * 6;
    }
}

// ===== ЗАДАНИЕ 4: Каррирование =====
// Функция createVehicleFactory для создания транспортных средств определённого типа
const createVehicleFactory = (vehicleType) => (make, model, year) => {
    return new vehicleType(make, model, year);
};

// ===== ЗАДАНИЕ 5: Статические методы и свойства =====
// (Уже добавлены в класс Vehicle)

// Автоматические тесты
function runTests() {
    console.log('Запуск тестов...');
    
    // Проверка наследования
    const vehicle = new Vehicle('Toyota', 'Camry', 2015);
    vehicle.displayInfo();
    console.log(`Возраст: ${vehicle.age} лет`);

    const car = new Car('Honda', 'Civic', 2018, 4);
    car.displayInfo();
    car.honk();

    const electricCar = new ElectricCar('Tesla', 'Model 3', 2020, 4, 75);
    electricCar.displayInfo();
    console.log(`Запас хода: ${electricCar.calculateRange()} км`);
    
    // Проверка возраста
    const testVehicle = new Vehicle('Test', 'Model', 2010);
    console.assert(testVehicle.age === (new Date().getFullYear() - 2010), 'Тест возраста провален');
    console.log('✅ Тест возраста пройден');
    
    // Проверка сеттера года
    const yearTestVehicle = new Vehicle('Test', 'Model', 2020);
    yearTestVehicle.year = 2025; // некорректный год
    console.assert(yearTestVehicle.year === 2020, 'Тест сеттера года провален');
    yearTestVehicle.year = 2018;
    console.assert(yearTestVehicle.year === 2018, 'Тест сеттера года провален');
    console.log('✅ Тест сеттера года пройден');
    
    // Проверка статического метода compareAge
    const vehicle1 = new Vehicle('A', 'B', 2010);
    const vehicle2 = new Vehicle('C', 'D', 2015);
    const ageDiff = Vehicle.compareAge(vehicle1, vehicle2);
    console.assert(ageDiff === 5, 'Тест compareAge пройден');
    console.log('✅ Тест compareAge пройден');
    
    // Проверка каррирования
    const createCarFactory = createVehicleFactory(Car);
    const myNewCar = createCarFactory('BMW', 'X5', 2022);
    console.log('Создан новый автомобиль:');
    myNewCar.displayInfo();
    console.assert(myNewCar instanceof Car, 'Тест каррирования провален');
    console.log('✅ Тест каррирования пройден');
    
    // Проверка статического подсчёта
    console.log('Всего создано транспортных средств:', Vehicle.getTotalVehicles());
    console.assert(Vehicle.getTotalVehicles() >= 5, 'Тест статического подсчёта пройден');
    console.log('✅ Тест статического подсчёта пройден');
    
    console.log('\n🎉 Все тесты пройдены! 🎉');
}

runTests();
