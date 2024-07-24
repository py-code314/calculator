let firstNumber = ''
let secondNumber = ''
let operator = ''

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const operators = ['+', '-', '*', '/', '%', '+/-']

function add(num1, num2) {
    // console.log(num1 + num2);
    return num1 + num2
}
// add(5, -6)
function subtract(num1, num2) {
    // console.log(num1 - num2);
    return num1 - num2
}
// subtract(17, 7)
function multiply(num1, num2) {
    // console.log(num1 * num2);
    return num1 * num2
}
// multiply(-5, 5)
function divide(num1, num2) {
    // console.log(num1 / num2);
    return num1 / num2
}
// divide(45, -5)

function percentage(num) {
    // console.log(num / 100);
    return num / 100
}
// percentage(6)

function changeSign(num) {
    let number
    if (Math.sign(num) == 1) {
        number = num * -1
    } else if (Math.sign(num) == -1) {
        number = num * -1
    } else if (Math.sign(num) == 0) {
        number = 0
    }
    // console.log(number);
    return number
}
// changeSign(0)

function getPercentage(num) {
    
    if (operator == '%') {
        let numberPercent = percentage(num)
        // console.log(numberPercent);
        return numberPercent
    }
    // console.log(num);
    return num
    
    
}

function convertToNumber(str) {
    let number;
    if (str.includes('.')) {
        number = parseFloat(str)
    } else {
        number = parseInt(str)
    }
    return number
}

function operate(firstNumber, secondNumber, operator) {
    firstNumber = convertToNumber(firstNumber);
    // console.log(firstNumber);
    
    
    secondNumber = convertToNumber(secondNumber);
    let result
    
    if (operator == '+') {
        result = add(firstNumber, secondNumber)
    } else if (operator == '-') {
        result = subtract(firstNumber, secondNumber)
    } else if (operator == '/') {
        result = divide(firstNumber, secondNumber);
        
    } else {
        result = multiply(firstNumber, secondNumber);
    }
    // console.log(result);
    if (result.toString().length > 10) {
        let solution = result.toFixed(7)
        // console.log(solution);
        return solution;
        
    } else if (result == Infinity) {
        result = 'please!'
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
    
    if (!operator && numbers.includes(newValue)) {

        firstNumber += newValue;
        // console.log(firstNumber);
        // firstNumber = getPercentage(firstNumber)
        // console.log(firstNumber);
        displayValue = firstNumber;
        updateDisplay(displayValue);
    } else if (firstNumber && newValue == '%') {
        // console.log(typeof firstNumber);
        let firstNumberPercent = percentage(firstNumber).toString()
        // console.log(typeof firstNumberPercent);
        firstNumber = firstNumberPercent
        displayValue = firstNumber;
        updateDisplay(displayValue);
    } else if (operator && numbers.includes(newValue)) {
        secondNumber += newValue;
        // console.log(secondNumber);
        displayValue = secondNumber;
        updateDisplay(displayValue);
    }   
}


// const allNumberButtons = document.querySelectorAll(".number-btn");
// allNumberButtons.forEach(button => {
//     button.addEventListener('click', (event) => {
//         let newValue = getValue(event)
//         console.log(newValue);
//         if (!operator && numbers.includes(newValue)) {
//             firstNumber += newValue
//             console.log(firstNumber);
//         } else if (operator && numbers.includes(newValue)) {
//             secondNumber += newValue
//             console.log(secondNumber);
//         }
//     })
// })



buttons.addEventListener('click', assignOperator)
function assignOperator(event) {
    let newValue = getValue(event)
    if (!secondNumber && operators.includes(newValue)) {
        operator = newValue;
        // console.log(operator);
    } else if (secondNumber && operators.includes(newValue)) {
        let solution = operate(firstNumber, secondNumber, operator);
        firstNumber = solution
        secondNumber = ""
        operator = newValue
        // console.log(firstNumber);
        updateDisplay(firstNumber)
    }
}
    

// if firstNumber true & secondNumber true & operator true:
// then if newValue is = or operators:
// then firstNumber = solution

buttons.addEventListener("click", displaySolution)
function displaySolution(event) {
    let newValue = getValue(event);
    if (newValue == "=" && firstNumber && secondNumber && operator) {
        // firstNumber = parseInt(firstNumber);
        // secondNumber = parseInt(secondNumber);
        let solution = operate(firstNumber, secondNumber, operator);
        // console.log(solution);
        updateDisplay(solution);
        firstNumber = "";
        secondNumber = "";
        operator = "";
    }
}

buttons.addEventListener("click", resetDisplay);
function resetDisplay(event) {
    let newValue = getValue(event);
    if (newValue == "AC") {
        displayValue = 0;
        updateDisplay(displayValue);
        firstNumber = ''
        secondNumber = ''
        operator = ''
    }
}

buttons.addEventListener('click', clearPreviousButtonValue)

function clearPreviousButtonValue(event) {
    let newValue = getValue(event)
    if (newValue == 'C' && firstNumber && !operator) {
        firstNumber = firstNumber.slice(0, -1)
        // console.log(firstNumber);
        // console.log(firstNumber.length);
    } else if (newValue == 'C' && firstNumber && operator && secondNumber) {
        secondNumber = secondNumber.slice(0, -1)
        // console.log(secondNumber);
    } else if (newValue == 'C' & firstNumber && operator && !secondNumber) {
        operator = ''
        // console.log(operator);
    }
}
    
