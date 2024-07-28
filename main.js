let firstNumber = "";
let secondNumber = "";
let operator = "";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["+", "-", "*", "/"];
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const preview = document.querySelector(".preview");
const dotButton = document.querySelector(".dot-btn");

function addNums(num1, num2) {
    return num1 + num2;
}

function subtractNums(num1, num2) {
    return num1 - num2;
}

function multiplyNums(num1, num2) {
    return num1 * num2;
}

function divideNums(num1, num2) {
    return num1 / num2;
}

function calcPercentage(number) {
    return number / 100;
}

function changeSign(number) {
    if (number === 0) {
        return 0;
    }

    return number * -1;
}

function convertToNumber(input) {
    let number;
    const hasDecimal = input.includes(".");

    if (typeof input === "string") {
        number = hasDecimal ? parseFloat(input) : parseInt(input);
    } else if (typeof input === "number") {
        number = input;
    }

    return number;
}

function calculate(num1, num2, operator) {
    let firstNumber = convertToNumber(num1);
    let secondNumber = convertToNumber(num2);

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "/":
            result = firstNumber / secondNumber;
            break;
        default:
            result = firstNumber * secondNumber;
            break;
    }
    // console.log(result);
    return result;
}

function updateResult(result) {
    // let result = calculate(num1, num2, operator);
    let updatedResult = result;
    const displayFontSize = display.style.fontSize;

    if (result === Infinity) {
        updatedResult = "Please!";
    }

    if (result.toString().includes(".")) {
        updatedResult = Math.round(result * 100) / 100;
    }

    if (result.toString().length <= 8) {
        display.style.fontSize = displayFontSize;
    } else if (
        result.toString().length >= 9 &&
        result.toString().length <= 12
    ) {
        display.style.fontSize = "2.4rem";
    } else {
        display.style.fontSize = "1.8rem";
    }
    // console.log( typeof updatedResult);
    return updatedResult;
}

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

function updateDisplay(displayValue) {
    display.textContent = displayValue;
}

// let displayValue;

// const allNumberButtons = document.querySelectorAll(".number-btn");

document.addEventListener("keydown", assignFirstNumber);
buttons.addEventListener("click", (event) => {
    let newValue = getInputValue(event);
    firstNumber = assignFirstNumber(newValue);
    updateDisplay(firstNumber);
    if (firstNumber && operator && numbers.includes(newValue)) {
        secondNumber = assignSecondNumber(newValue);
        console.log(secondNumber);
        updateDisplay(secondNumber);
    }
    operator = assignOperator(newValue);
    handleInvalidInput(newValue);
});
function assignFirstNumber(inputValue) {
    if (!operator && !secondNumber && numbers.includes(inputValue)) {
        firstNumber = limitNumberLength(firstNumber, inputValue);
        firstNumber = removeLeadingZero(firstNumber);
        firstNumber = addLeadingZero(firstNumber);
        disableDotButton(firstNumber);
    } else if (firstNumber && !operator && inputValue === "%") {
        firstNumber = calcPercentage(Number(firstNumber));
    } else if (firstNumber && !operator && inputValue === "+/-") {
        firstNumber = changeSign(Number(firstNumber));
    }

    return firstNumber;
}

document.addEventListener("keydown", assignSecondNumber);
// buttons.addEventListener("click", (event) => {
//     let newValue = getInputValue(event);
//     if (firstNumber && operator && numbers.includes(newValue)) {
//         secondNumber = assignSecondNumber(newValue);
//         console.log(secondNumber);
//         updateDisplay(secondNumber);
//     }

//     // secondNumber = assignSecondNumber(newValue);
//     // console.log(secondNumber);
//     // updateDisplay(secondNumber);
// });
function assignSecondNumber(inputValue) {
    if (firstNumber && operator && numbers.includes(inputValue)) {
        secondNumber = limitNumberLength(secondNumber, inputValue);
        secondNumber = removeLeadingZero(secondNumber);
        secondNumber = addLeadingZero(secondNumber);
        disableDotButton(secondNumber);
    } else if (operator && secondNumber && inputValue === "%") {
        secondNumber = calcPercentage(Number(secondNumber));
    } else if (operator && secondNumber && inputValue === "+/-") {
        secondNumber = changeSign(Number(secondNumber));
    }

    return secondNumber;
}

function limitNumberLength(number, inputValue) {
    if (number.length < 8) {
        number += inputValue;
    }
    return number;
}

function disableDotButton(number) {
    if (number.includes(".")) {
        dotButton.disabled = true;
    }
}

function addLeadingZero(number) {
    if (number.startsWith(".")) {
        number = "0" + number;
    }

    return number;
}

function removeLeadingZero(number) {
    if (number.startsWith("0") && number.length > 1) {
        number = number.slice(1);
    }

    return number;
}

document.addEventListener("keydown", assignOperator);
// buttons.addEventListener("click", assignOperator);
function assignOperator(operatorValue) {
    if (firstNumber && !secondNumber && operators.includes(operatorValue)) {
        enableDotButton();
        operator = operatorValue;
        console.log(operator);
    } else if (
        firstNumber &&
        operator &&
        secondNumber &&
        operators.includes(operatorValue)
    ) {
        enableDotButton();
        resetOperator(operatorValue)
    }

    return operator;
}

function resetOperator(operatorValue) {
    let result = calculate(firstNumber, secondNumber, operator);
    firstNumber = result.toString();
    updateDisplay(firstNumber);
    secondNumber = "";
    operator = operatorValue;
    display.style.fontSize = "3.5rem";
    
}

function enableDotButton() {
    dotButton.disabled = false;
}

function handleInvalidInput(operator) {
    const invalidOperators = ["=", "%", "+/-", "/", "*", "+"];
    if (!firstNumber && invalidOperators.includes(operator)) {
        updateDisplay("error");
        display.style.color = "red";
    }
}

document.addEventListener("keydown", displaySolution);
buttons.addEventListener("click", displaySolution);
function displaySolution(event) {
    let newValue = getInputValue(event);
    if (newValue == "=" && firstNumber && secondNumber && operator) {
        dotButton.disabled = false;
        let result = calculate(firstNumber, secondNumber, operator);
        let solution = updateResult(result);
        console.log(solution);
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
        preview.textContent = "";
        display.style.color = "#074462";
    }
}

document.addEventListener("keydown", clearPreviousButtonValue);
buttons.addEventListener("click", clearPreviousButtonValue);

function clearPreviousButtonValue(event) {
    let newValue = getInputValue(event);
    if (newValue == "C" && firstNumber && !operator) {
        firstNumber = firstNumber.slice(0, -1);
        // console.log(firstNumber);
        if (!firstNumber.includes(".")) {
            dotButton.disabled = false;
        }
        // console.log(firstNumber);
        displayValue = firstNumber;
        // console.log(displayValue);
        updateDisplay(displayValue);
    } else if (newValue == "C" && firstNumber && operator && secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        if (!secondNumber.includes(".")) {
            dotButton.disabled = false;
        }
        displayValue = secondNumber;
        updateDisplay(displayValue);
    } else if ((newValue == "C") & firstNumber && operator && !secondNumber) {
        operator = "";
        // console.log(operator);
    }
}

// const preview = document.querySelector(".preview");
let previewText = preview.textContent;

buttons.addEventListener("click", showPreview);
function showPreview() {
    // let newValue = getInputValue(event)
    // if (numbers.includes(newValue)) {
    //     previewText += newValue;
    // }

    // preview.textContent = previewText

    preview.textContent = firstNumber + operator + secondNumber;

    const textLength = preview.textContent.length;

    const maxIndent = 350;

    const currentIndent = maxIndent - textLength * 10;

    preview.style.textIndent = `${currentIndent}px`;
}
