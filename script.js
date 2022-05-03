const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = 'null';
let operator = 'null';
let waitingForSecondValue = false;

update()

function update() {
    display.value = displayValue;
}

keys.addEventListener('click', function (e) {
    const element = e.target;

    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
        // console.log('operator', element.value);
        handleOperator(element.value);
        update();
        return
    }
    if (element.classList.contains('decimal')) {
        // console.log('decimal',element.value);
        inputDecimal();
        update();
        return
    }
    if (element.classList.contains('reset')) {
        // console.log('reset',element.value);
        reset();
        update();
        return
    }

    // console.log('number',element.value);
    inputNumber(element.value);
    update();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue)

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue == null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;

    } else if (operator === '*') {
        return first * second;

    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

function inputNumber(number) {
    if (waitingForSecondValue) {
        displayValue = number;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) { //************** ÖNEMLİ */ includes dizilerde arama yapmak için kullanılır. Contains ise class element gibi durumlarda kullanılır.
        displayValue += '.';
    }
}

function reset() {
    displayValue = '0';
}