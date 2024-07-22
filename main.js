let firstNumber
let secondNumber
let operator

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const arithmetic = ['+', '-', '*', '/']

function add(num1, num2) {
    console.log(num1 + num2);
    return num1 + num2
}
// add(5, -6)
function subtract(num1, num2) {
    console.log(num1 - num2);
    return num1 - num2
}
// subtract(17, 7)
function multiply(num1, num2) {
    console.log(num1 * num2);
    return num1 * num2
}
// multiply(-5, 5)
function divide(num1, num2) {
    console.log(num1 / num2);
    return num1 / num2
}
// divide(45, -5)

function operate(firstNumber, secondNumber, operator) {
    let result
    if (operator == '+') {
        result = add(firstNumber, secondNumber)
    } else if (operator == '-') {
        result = subtract(firstNumber, secondNumber)
    } else if (operator == '*') {
        result = multiply(firstNumber, secondNumber)
    } else {
        result = divide(firstNumber, secondNumber)
    }
    return result
}

// const res = operate(5, 2, '/')
// console.log(res);

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

// let displayValue = display.textContent;

function getValue(event) {
    // console.log(event.target.textContent);
    return event.target.textContent
}

function updateDisplay(newValue) {
    display.textContent = newValue;
}

let displayValue;

buttons.addEventListener('click', assignValues)
function assignValues(event) {
    let newValue = getValue(event);
    if (numbers.includes(newValue) && !firstNumber) {
        firstNumber = newValue;
        console.log(firstNumber);
        displayValue = firstNumber;
        updateDisplay(displayValue);
    } else if (numbers.includes(newValue) && firstNumber) {
        secondNumber = newValue;
        console.log(secondNumber);
        displayValue = secondNumber;
        updateDisplay(displayValue);
    }
    if (arithmetic.includes(newValue)) {
        operator = newValue;
        console.log(operator);
    }
} 


    
    

    





