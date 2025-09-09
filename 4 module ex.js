// Задание 1
function logOwnProperties(obj) {
    const allProperties = Object.getOwnPropertyNames(obj);

    for (const key of allProperties) {
        const value = obj[key];
        console.log(`Ключ: ${key}, Значение: ${value}`);
    }
}

// Задание 2
function hasProperty(propName, obj) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    return Object.prototype.hasOwnProperty.call(obj, propName);
}

// Задание 3
function createObjectWithoutPrototype() {
    return Object.create(null);
}

// Задание 4
function ElectricalAppliance(name, power, isTurnedOn = false) {
    this.name = name;
    this.power = power;
    this.isTurnedOn = isTurnedOn;
    this.voltage = 220;
}

ElectricalAppliance.prototype = {
    constructor: ElectricalAppliance,

    turnOn: function() {
        if (!this.isTurnedOn) {
            this.isTurnedOn = true;
            console.log(`${this.name} включен в розетку`);
        } else {
            console.log(`${this.name} уже включен`);
        }
    },

    turnOff: function() {
        if (this.isTurnedOn) {
            this.isTurnedOn = false;
            console.log(`${this.name} выключен из розетки`);
        } else {
            console.log(`${this.name} уже выключен`);
        }
    },

    getCurrentPower: function() {
        return this.isTurnedOn ? this.power : 0;
    },

    getInfo: function() {
        return `${this.name}: ${this.power}Вт, статус: ${this.isTurnedOn ? 'включен' : 'выключен'}`;
    }
};

function DeskLamp(name, power, brightness = 100, colorTemperature = 4000) {
    ElectricalAppliance.call(this, name, power);
    this.brightness = brightness;
    this.colorTemperature = colorTemperature;
    this.hasDimmer = brightness !== 100;
}

DeskLamp.prototype = Object.create(ElectricalAppliance.prototype);
DeskLamp.prototype.constructor = DeskLamp;

DeskLamp.prototype = Object.assign(DeskLamp.prototype, {
    setBrightness: function(level) {
        if (level >= 0 && level <= 100) {
            this.brightness = level;
            console.log(`Яркость ${this.name} установлена на ${level}%`);
        } else {
            console.log('Яркость должна быть от 0 до 100%');
        }
    },

    setColorTemperature: function(temp) {
        if (temp >= 2700 && temp <= 6500) {
            this.colorTemperature = temp;
            console.log(`Цветовая температура ${this.name} установлена на ${temp}K`);
        } else {
            console.log('Цветовая температура должна быть от 2700K до 6500K');
        }
    },

    getInfo: function() {
        const baseInfo = ElectricalAppliance.prototype.getInfo.call(this);
        return `${baseInfo}, яркость: ${this.brightness}%, цветовая температура: ${this.colorTemperature}K`;
    }
});

function Computer(name, power, cpu, ram, isGaming = false) {
    ElectricalAppliance.call(this, name, power);
    this.cpu = cpu;
    this.ram = ram;
    this.isGaming = isGaming;
    this.isSleepMode = false;
}

Computer.prototype = Object.create(ElectricalAppliance.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype = Object.assign(Computer.prototype, {

    sleepMode: function() {
        if (this.isTurnedOn && !this.isSleepMode) {
            this.isSleepMode = true;
            console.log(`${this.name} переведен в режим сна`);
        }
    },

    wakeUp: function() {
        if (this.isSleepMode) {
            this.isSleepMode = false;
            console.log(`${this.name} пробужден из режима сна`);
        }
    },

    getCurrentPower: function() {
        if (!this.isTurnedOn) return 0;
        return this.isSleepMode ? this.power * 0.1 : this.power;
    },

    getInfo: function() {
        const baseInfo = ElectricalAppliance.prototype.getInfo.call(this);
        const powerUsage = this.getCurrentPower();
        return `${baseInfo}, CPU: ${this.cpu}, RAM: ${this.ram}GB, текущее потребление: ${powerUsage}Вт`;
    }
});

function calculateTotalPower(appliances) {
    return appliances.reduce((total, appliance) => {
        return total + appliance.getCurrentPower();
    }, 0);
}

const lamp = new DeskLamp('Настольная лампа', 60, 80, 4500);
const gamingPC = new Computer('Игровой компьютер', 750, 'Intel i7', 32, true);
const officePC = new Computer('Офисный компьютер', 350, 'Intel i5', 16, false);

console.log('=== ДЕМОНСТРАЦИЯ РАБОТЫ ЭЛЕКТРОПРИБОРОВ ===\n');

lamp.turnOn();
gamingPC.turnOn();

console.log('\n--- Информация о приборах ---');
console.log(lamp.getInfo());
console.log(gamingPC.getInfo());
console.log(officePC.getInfo());

console.log('\n--- Потребляемая мощность ---');
console.log(`Общая потребляемая мощность: ${calculateTotalPower([lamp, gamingPC, officePC])}Вт`);

console.log('\n--- Тестирование специфических методов ---');
lamp.setBrightness(50);
lamp.setColorTemperature(3000);

gamingPC.sleepMode();
console.log(`Мощность игрового ПК в режиме сна: ${gamingPC.getCurrentPower()}Вт`);

gamingPC.wakeUp();
console.log(`Мощность игрового ПК после пробуждения: ${gamingPC.getCurrentPower()}Вт`);

console.log('\n--- Выключаем приборы ---');
lamp.turnOff();
gamingPC.turnOff();

console.log('\n--- Финальная потребляемая мощность ---');
console.log(`Общая потребляемая мощность: ${calculateTotalPower([lamp, gamingPC, officePC])}Вт`);


console.log('\n--- Проверка наследования ---');
console.log('lamp instanceof DeskLamp:', lamp instanceof DeskLamp);
console.log('lamp instanceof ElectricalAppliance:', lamp instanceof ElectricalAppliance);
console.log('gamingPC instanceof Computer:', gamingPC instanceof Computer);
console.log('gamingPC instanceof ElectricalAppliance:', gamingPC instanceof ElectricalAppliance);


// Задание 5
class ElectricalAppliance {
    constructor(name, power, isTurnedOn = false) {
        this.name = name;
        this.power = power;
        this.isTurnedOn = isTurnedOn;
        this.voltage = 220;
    }

    turnOn() {
        if (!this.isTurnedOn) {
            this.isTurnedOn = true;
            console.log(`${this.name} включен в розетку`);
        } else {
            console.log(`${this.name} уже включен`);
        }
    }

    turnOff() {
        if (this.isTurnedOn) {
            this.isTurnedOn = false;
            console.log(`${this.name} выключен из розетки`);
        } else {
            console.log(`${this.name} уже выключен`);
        }
    }

    getCurrentPower() {
        return this.isTurnedOn ? this.power : 0;
    }

    getInfo() {
        return `${this.name}: ${this.power}Вт, статус: ${this.isTurnedOn ? 'включен' : 'выключен'}`;
    }
}

class DeskLamp extends ElectricalAppliance {
    constructor(name, power, brightness = 100, colorTemperature = 4000) {
        super(name, power);
        this.brightness = brightness;
        this.colorTemperature = colorTemperature;
        this.hasDimmer = brightness !== 100;
    }

    setBrightness(level) {
        if (level >= 0 && level <= 100) {
            this.brightness = level;
            console.log(`Яркость ${this.name} установлена на ${level}%`);
        } else {
            console.log('Яркость должна быть от 0 до 100%');
        }
    }

    setColorTemperature(temp) {
        if (temp >= 2700 && temp <= 6500) {
            this.colorTemperature = temp;
            console.log(`Цветовая температура ${this.name} установлена на ${temp}K`);
        } else {
            console.log('Цветовая температура должна быть от 2700K до 6500K');
        }
    }

    getInfo() {
        const baseInfo = super.getInfo();
        return `${baseInfo}, яркость: ${this.brightness}%, цветовая температура: ${this.colorTemperature}K`;
    }
}

class Computer extends ElectricalAppliance {
    constructor(name, power, cpu, ram, isGaming = false) {
        super(name, power);
        this.cpu = cpu;
        this.ram = ram; 
        this.isGaming = isGaming;
        this.isSleepMode = false;
    }

    sleepMode() {
        if (this.isTurnedOn && !this.isSleepMode) {
            this.isSleepMode = true;
            console.log(`${this.name} переведен в режим сна`);
        }
    }

    wakeUp() {
        if (this.isSleepMode) {
            this.isSleepMode = false;
            console.log(`${this.name} пробужден из режима сна`);
        }
    }

    getCurrentPower() {
        if (!this.isTurnedOn) return 0;
        return this.isSleepMode ? this.power * 0.1 : this.power;
    }

    getInfo() {
        const baseInfo = super.getInfo();
        const powerUsage = this.getCurrentPower();
        return `${baseInfo}, CPU: ${this.cpu}, RAM: ${this.ram}GB, текущее потребление: ${powerUsage}Вт`;
    }
}

function calculateTotalPower(appliances) {
    return appliances.reduce((total, appliance) => {
        return total + appliance.getCurrentPower();
    }, 0);
}

class ElectricalApplianceDemo {
    static run() {
        console.log('=== ДЕМОНСТРАЦИЯ РАБОТЫ ЭЛЕКТРОПРИБОРОВ (КЛАССЫ ES6) ===\n');

        const lamp = new DeskLamp('Настольная лампа', 60, 80, 4500);
        const gamingPC = new Computer('Игровой компьютер', 750, 'Intel i7', 32, true);
        const officePC = new Computer('Офисный компьютер', 350, 'Intel i5', 16, false);

        lamp.turnOn();
        gamingPC.turnOn();

        console.log('\n--- Информация о приборах ---');
        console.log(lamp.getInfo());
        console.log(gamingPC.getInfo());
        console.log(officePC.getInfo());

        console.log('\n--- Потребляемая мощность ---');
        const appliances = [lamp, gamingPC, officePC];
        console.log(`Общая потребляемая мощность: ${calculateTotalPower(appliances)}Вт`);

        console.log('\n--- Тестирование специфических методов ---');
        lamp.setBrightness(50);
        lamp.setColorTemperature(3000);

        gamingPC.sleepMode();
        console.log(`Мощность игрового ПК в режиме сна: ${gamingPC.getCurrentPower()}Вт`);

        gamingPC.wakeUp();
        console.log(`Мощность игрового ПК после пробуждения: ${gamingPC.getCurrentPower()}Вт`);

        console.log('\n--- Выключаем приборы ---');
        lamp.turnOff();
        gamingPC.turnOff();

        console.log('\n--- Финальная потребляемая мощность ---');
        console.log(`Общая потребляемая мощность: ${calculateTotalPower(appliances)}Вт`);

        console.log('\n--- Проверка наследования ---');
        console.log('lamp instanceof DeskLamp:', lamp instanceof DeskLamp);
        console.log('lamp instanceof ElectricalAppliance:', lamp instanceof ElectricalAppliance);
        console.log('gamingPC instanceof Computer:', gamingPC instanceof Computer);
        console.log('gamingPC instanceof ElectricalAppliance:', gamingPC instanceof ElectricalAppliance);

        console.log('\n=== ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА ===');
    }
}

ElectricalApplianceDemo.run();
// Задание 6

// Задание 7

// Задание 1

// Задание 1