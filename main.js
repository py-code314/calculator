let firstNumber = "";
let secondNumber = "";
let operator = "";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["+", "-", "*", "/"];

function add(num1, num2) {
    // console.log(num1 + num2);
    return num1 + num2;
}
// add(5, -6)
function subtract(num1, num2) {
    // console.log(num1 - num2);
    return num1 - num2;
}
// subtract(17, 7)
function multiply(num1, num2) {
    // console.log(num1 * num2);
    return num1 * num2;
}
// multiply(-5, 5)
function divide(num1, num2) {
    // console.log(num1 / num2);
    return num1 / num2;
}
// divide(45, -5)

function percentage(num) {
    // console.log(num / 100);
    return num / 100;
}
// percentage(6)

function changeSign(num) {
    let number;
    if (Math.sign(num) == 1) {
        number = num * -1;
    } else if (Math.sign(num) == -1) {
        number = num * -1;
    } else if (Math.sign(num) == 0) {
        number = 0;
    }
    // console.log(number);
    return number;
}
// changeSign(0)

function convertToNumber(str) {
    let number;
    if (str.includes(".")) {
        number = parseFloat(str);
    } else {
        number = parseInt(str);
    }
    return number;
}

function operate(firstNumber, secondNumber, operator) {
    firstNumber = convertToNumber(firstNumber);
    // console.log(firstNumber);

    secondNumber = convertToNumber(secondNumber);
    let result;

    if (operator == "+") {
        result = add(firstNumber, secondNumber);
    } else if (operator == "-") {
        result = subtract(firstNumber, secondNumber);
    } else if (operator == "/") {
        result = divide(firstNumber, secondNumber);
    } else {
        result = multiply(firstNumber, secondNumber);
    }
    console.log(result);
    let solution;
    if (result == Infinity) {
        solution = "please!";
    }
    
    
    if (result.toString().includes(".")) {
        result = Math.round(result * 100) / 100;
        console.log(result);
        
    }
    if (result.toString().length > 8 && result.toString().length <= 12) {
        display.style.fontSize = "2.5rem";
        solution = result;
    }
    if (result.toString().length > 12) {
        display.style.fontSize = "1.9rem";
        solution = result;
    }
    return solution;
    
}

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

function getInputValue(event) {
    let inputValue;

    if (event.type === "click") {
        inputValue = event.target.textContent;
    } else if (event.type === "keydown") {
        if (numbers.includes(event.key)) {
            inputValue = event.key;
        } else if (operators.includes(event.key)) {
            inputValue = event.key;
        } else if (event.shiftKey && event.key === "%") {
            inputValue = "%";
        } else if (event.shiftKey && event.key === "*") {
            inputValue = "*";
        } else if (event.shiftKey && event.key === "+") {
            inputValue = "+";
        } else if (event.key === "Backspace" || event.key === "Delete") {
            inputValue = "C";
        } else if (event.key === "Enter" || event.key === "=") {
            inputValue = "=";
        } else if (event.key === "Escape") {
            inputValue = "AC";
        }
    }

    return inputValue;
}

function updateDisplay(newValue) {
    display.textContent = newValue;
}

let displayValue;
const dotButton = document.querySelector(".dot-btn");
const allNumberButtons = document.querySelectorAll(".number-btn");

document.addEventListener("keydown", assignFirstNumber);

buttons.addEventListener("click", assignFirstNumber);
function assignFirstNumber(event) {
    let newValue = getInputValue(event);

    if (!operator && numbers.includes(newValue)) {
        if (firstNumber.length < 8) {
            firstNumber += newValue;
        }
        if (firstNumber[0] == "0" && firstNumber.length > 1) {
            firstNumber = firstNumber.slice(1);
        }
        if (firstNumber[0] == ".") {
            firstNumber = "0" + firstNumber;
        }

        if (firstNumber.includes(".")) {
            dotButton.disabled = true;
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

document.addEventListener("keydown", assignSecondNumber);
buttons.addEventListener("click", assignSecondNumber);
function assignSecondNumber(event) {
    let newValue = getInputValue(event);
    if (operator && numbers.includes(newValue)) {
        if (secondNumber.length < 8) {
            secondNumber += newValue;
        }
        if (secondNumber[0] == "0" && secondNumber.length > 1) {
            secondNumber = secondNumber.slice(1);
        }
        if (secondNumber[0] == ".") {
            secondNumber = "0" + secondNumber;
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
//         let newValue = getInputValue(event)
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
document.addEventListener("keydown", assignOperator);
buttons.addEventListener("click", assignOperator);
function assignOperator(event) {
    let newValue = getInputValue(event);
    console.log(newValue);

    if (firstNumber && !secondNumber && operators.includes(newValue)) {
        dotButton.disabled = false;
        operator = newValue;
        console.log(operator);
        dotButton.disabled = false;
    } else if (secondNumber && operators.includes(newValue)) {
        dotButton.disabled = false;
        let solution = operate(firstNumber, secondNumber, operator);
        firstNumber = solution;
        secondNumber = "";
        operator = newValue;

        // console.log(firstNumber);
        updateDisplay(firstNumber);
    }
}

document.addEventListener("keydown", showAlert);
buttons.addEventListener("click", showAlert);
function showAlert(event) {
    let newValue = getInputValue(event);
    if (
        (!firstNumber && operators.includes(newValue)) ||
        (!firstNumber && newValue == "=") ||
        (!firstNumber && newValue == "%") ||
        newValue == "+/-"
    ) {
        alert("Invalid button.");
    }
}

document.addEventListener("keydown", displaySolution);
buttons.addEventListener("click", displaySolution);
function displaySolution(event) {
    let newValue = getInputValue(event);
    if (newValue == "=" && firstNumber && secondNumber && operator) {
        dotButton.disabled = false;
        let solution = operate(firstNumber, secondNumber, operator);
        // console.log(solution);
        updateDisplay(solution);
        firstNumber = "";
        secondNumber = "";
        operator = "";
    }
}

document.addEventListener("keydown", resetDisplay);
buttons.addEventListener("click", resetDisplay);
function resetDisplay(event) {
    let newValue = getInputValue(event);
    if (newValue == "AC") {
        dotButton.disabled = false;
        displayValue = 0;
        updateDisplay(displayValue);
        firstNumber = "";
        secondNumber = "";
        operator = "";
        display.style.fontSize = "3.5rem";
    }
}

document.addEventListener("keydown", clearPreviousButtonValue);
buttons.addEventListener("click", clearPreviousButtonValue);

function clearPreviousButtonValue(event) {
    let newValue = getInputValue(event);
    if (newValue == "C" && firstNumber && !operator) {
        firstNumber = firstNumber.slice(0, -1);
        // console.log(firstNumber.length);
        if (!numbers.includes(firstNumber)) {
            dotButton.disabled = false;
        }
        displayValue = firstNumber;
        updateDisplay(displayValue);
    } else if (newValue == "C" && firstNumber && operator && secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        if (!numbers.includes(secondNumber)) {
            dotButton.disabled = false;
        }
        displayValue = secondNumber;
        updateDisplay(displayValue);
    } else if ((newValue == "C") & firstNumber && operator && !secondNumber) {
        operator = "";
        // console.log(operator);
    }
}
