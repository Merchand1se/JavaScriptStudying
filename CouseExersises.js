// Задание 1
function countElements(arr) {
    let even = 0;
    let odd = 0;
    let zero = 0;
    for (let element of arr) {
        if (typeof element === 'number' && !isNaN(element)) {
            if (element === 0) {
                zero++;
            } else if (element % 2 === 0) {
                even++;
            } else {
                odd++;
            }
        }
    }

    console.log(`Чётных элементов: ${even}`);
    console.log(`Нечётных элементов: ${odd}`);
    console.log(`Нулевых элементов: ${zero}`);
}


const array = [0, 1, 2, 3, 4, null, 'a', undefined, 5, 0, 6, NaN];
countElements(array);

// Задание 2

function definePrime(num) {
    let isPrime, result;
    isPrime = true;

    if (num > 1 && num <= 1000) {
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                isPrime = false;
            }
        }
        result = isPrime ? 'Число ${num} - простое число' : 'Число ${num} - составное число';
    } else if (num > 1000) {
        result = 'Данные неверны';
    }
    return result;
}

// Задание 3

function FunctionSum(a) {
    return function(b) {
        return a + b
    }
};

const sumFunction = FunctionSum(1);

const sum = sumFunction(2)

console.log(sum);

// Задание 4

function logNumbers(begin, end) {
    let current = begin;

    let timerId = setInterval(function() {
        console.log(current);
        if (current == end) {
            clearInterval(timerId);
        }
        current++;
    }, 1000);
}

logNumbers(3, 27);

// Задание 5

const pow = (x, n) => {
    let result = x;

    for (let i = 1; i < n; i++) {
        result *= x;
    }

    return result;
}

const result = pow(10, 6)
console.log(result)