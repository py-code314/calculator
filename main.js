let firstNumber
let secondNumber
let operator

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