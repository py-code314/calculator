let firstNumber = ''
let secondNumber = ''
let operator = ''

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
const operators = ['+', '-', '*', '/']

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
    console.log(result);
    if (result == Infinity) {
        solution = "please!";
        return solution;
    }
    let product = result.toString()
    if (product.length > 8 && product.includes('.')) {
        let solution = Math.round(result * 100) / 100;
        // console.log(solution);
        return solution;
        
    } else if (product.length >= 4 && product.length <= 6) {
        let solution = product.slice(0, -3) + ',' + product.slice(-3)
        return solution
    } else if (product.length >= 7 && product.length <= 9) {
        display.style.fontSize = "2.5rem";
        let solution = product.slice(0, -6) + ',' + product.slice(-6, -3) + ',' + product.slice(-3)
        return solution
    } else if (product.length >= 10 && product.length <= 12) {
        display.style.fontSize = "2rem"
        let solution = product.slice(0, -9) + ',' +
            product.slice(-9, -6) + "," + product.slice(-6, -3) + "," + product.slice(-3);
        return solution;
    }
    
    
    
    
}



const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");



function getValue(event) {
    // console.log(event.target.textContent);
    return event.target.textContent
}

function updateDisplay(newValue) {
    display.textContent = newValue;
}

let displayValue;
const dotButton = document.querySelector(".dot-btn");
const allNumberButtons = document.querySelectorAll(".number-btn");


buttons.addEventListener('click', assignFirstNumber)
function assignFirstNumber(event) {
    let newValue = getValue(event);
    
    
    if (!operator && numbers.includes(newValue)) {
       if (firstNumber.length < 8) {
           firstNumber += newValue;
       }
        
        if (firstNumber.includes('.')) {
            dotButton.disabled = true
        }
        
        
        displayValue = firstNumber;
        updateDisplay(displayValue);
    } else if (firstNumber && !operator && newValue == "%") {
        
        firstNumber = percentage(firstNumber).toString();
        displayValue = firstNumber;
        updateDisplay(displayValue);
    } else if (firstNumber && !operator && newValue == "+/-") {
        
        firstNumber = changeSign(firstNumber).toString();
        displayValue = firstNumber;
        updateDisplay(displayValue);
    }
}   



buttons.addEventListener('click', assignSecondNumber)
function assignSecondNumber(event) {
    let newValue = getValue(event);
    if (operator && numbers.includes(newValue)) {
        if (secondNumber.length < 8) {
            secondNumber += newValue;
        }
        // console.log(secondNumber);
        if (secondNumber.includes(".")) {
            dotButton.disabled = true;
        }

        
        displayValue = secondNumber;
        updateDisplay(displayValue);
    } else if (operator && secondNumber && newValue == "%") {
        secondNumber = percentage(secondNumber).toString();
        displayValue = secondNumber;
        updateDisplay(displayValue);
    } else if (operator && secondNumber && newValue == "+/-") {
        secondNumber = changeSign(secondNumber).toString();
        // console.log(typeof secondNumber);
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
        dotButton.disabled = false;
        operator = newValue;
        // console.log(operator);
    } else if (secondNumber && operators.includes(newValue)) {
        dotButton.disabled = false;
        let solution = operate(firstNumber, secondNumber, operator);
        firstNumber = solution
        secondNumber = ""
        operator = newValue
        // console.log(firstNumber);
        updateDisplay(firstNumber)
    }
}
    



buttons.addEventListener("click", displaySolution)
function displaySolution(event) {
    let newValue = getValue(event);
    if (newValue == "=" && firstNumber && secondNumber && operator) {
        dotButton.disabled = false
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
        display.style.fontSize = "3.5rem"
    }
}

buttons.addEventListener('click', clearPreviousButtonValue)

function clearPreviousButtonValue(event) {
    let newValue = getValue(event)
    if (newValue == 'C' && firstNumber && !operator) {
        firstNumber = firstNumber.slice(0, -1)
        console.log(firstNumber.length);
        
        displayValue = firstNumber
        updateDisplay(displayValue)
    } else if (newValue == 'C' && firstNumber && operator && secondNumber) {
        secondNumber = secondNumber.slice(0, -1)
        
        displayValue = secondNumber;
        updateDisplay(displayValue);
    } else if (newValue == 'C' & firstNumber && operator && !secondNumber) {
        operator = ''
        // console.log(operator);
    }
}
    
