'use strict'

// ===== ЗАДАНИЕ 1: Базовый класс Vehicle =====
class Vehicle {
    static vehicleCount = 0; // статическое свойство для подсчёта

    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this._year = year; // используем приватное поле _year
        Vehicle.vehicleCount++;
    }

    displayInfo() {
        console.log(`Марка: ${this.make}, Модель: ${this.model}, Год: ${this._year}`);
    }

    get age() {
        return new Date().getFullYear() - this._year;
    }

    set year(newYear) {
        const currentYear = new Date().getFullYear();
        if (newYear > currentYear) {
            throw new Error('Год выпуска не может быть больше текущего!');
        }
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
        this.numDoors = numDoors;
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
        this.batteryCapacity = batteryCapacity;
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
const createVehicleFactory = (VehicleClass) => (make, model, year) => {
    return new VehicleClass(make, model, year);
};

// ===== ЗАДАНИЕ 5: Статические методы и свойства =====
// (уже добавлено в Vehicle)


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

    // Проверка фабрики
    const createCarFactory = createVehicleFactory(Car);
    const myNewCar = createCarFactory('BMW', 'X5', 2022);
    console.log('Создан новый автомобиль:');
    myNewCar.displayInfo();

    console.log('Всего создано транспортных средств:', Vehicle.getTotalVehicles());

    // Проверка compareAge
    console.log('Разница в возрасте:', Vehicle.compareAge(vehicle, testVehicle));

    console.log('Все тесты пройдены! ✅');
}

runTests();
