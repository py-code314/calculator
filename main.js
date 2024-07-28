let firstNumber = "";
let secondNumber = "";
let operator = "";
let previewText = "";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["+", "-", "*", "/"];
const specialOperators = ["%", "+/-"];

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const preview = document.querySelector(".preview");
const dotButton = document.querySelector(".dot-btn");

buttons.addEventListener("click", (event) => {
    let newValue = getInputValue(event);

    firstNumber = assignFirstNumber(newValue);
    updateDisplayValue(firstNumber);
    if (firstNumber && operator) {
        secondNumber = assignSecondNumber(newValue);
        updateDisplayValue(secondNumber);
    }

    operator = assignOperator(newValue);
    handleInvalidInput(newValue);
    updatePreview(newValue);
    clearPreviousButtonValue(newValue);
    displaySolution(newValue);
    resetDisplay(newValue);
});

document.addEventListener("keydown", (event) => {
    let newValue = getInputValue(event);

    firstNumber = assignFirstNumber(newValue);
    updateDisplayValue(firstNumber);
    if (firstNumber && operator) {
        secondNumber = assignSecondNumber(newValue);
        updateDisplayValue(secondNumber);
    }

    operator = assignOperator(newValue);
    handleInvalidInput(newValue);
    updatePreview(newValue);
    clearPreviousButtonValue(newValue);
    displaySolution(newValue);
    resetDisplay(newValue);
});

function getInputValue(event) {
    let inputValue;

    if (event.type === "click") {
        inputValue = event.target.value;
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

function assignFirstNumber(inputValue) {
    if (!operator && !secondNumber && numbers.includes(inputValue)) {
        firstNumber = updateNumber(firstNumber, inputValue);
        disableDotButton(firstNumber);
    } else if (firstNumber && !operator && inputValue === "%") {
        firstNumber = calculatePercentage(firstNumber);
    } else if (firstNumber && !operator && inputValue === "+/-") {
        firstNumber = toggleSign(firstNumber);
    }

    return firstNumber;
}

function updateDisplayValue(displayValue) {
    display.textContent = displayValue;
}

function assignSecondNumber(inputValue) {
    if (firstNumber && operator && numbers.includes(inputValue)) {
        secondNumber = updateNumber(secondNumber, inputValue);
        disableDotButton(secondNumber);
    } else if (firstNumber && operator && secondNumber && inputValue === "%") {
        secondNumber = calculatePercentage(Number(secondNumber));
    } else if (
        firstNumber &&
        operator &&
        secondNumber &&
        inputValue === "+/-"
    ) {
        secondNumber = toggleSign(Number(secondNumber));
    }

    return secondNumber;
}

function assignOperator(operatorValue) {
    if (firstNumber && !secondNumber && operators.includes(operatorValue)) {
        enableDotButton();
        operator = operatorValue;
    } else if (
        firstNumber &&
        operator &&
        secondNumber &&
        operators.includes(operatorValue)
    ) {
        enableDotButton();
        resetOperator(operatorValue);
    }

    return operator;
}

function handleInvalidInput(operatorValue) {
    const invalidOperators = ["=", "%", "+/-", "/", "*", "+", "-"];
    if (!firstNumber && invalidOperators.includes(operatorValue)) {
        updateDisplayValue("error");
        display.style.color = "#7a0d18";
    }
}

function updatePreview() {
    previewText = firstNumber + operator + secondNumber;

    const textLength = previewText.length;
    const maxIndent = 350;
    const textIndent = maxIndent - textLength * 10;

    preview.textContent = previewText;
    preview.style.textIndent = `${textIndent}px`;
}

function clearPreviousButtonValue(newValue) {
    if (newValue === "C" && firstNumber && !operator) {
        firstNumber = convertToString(firstNumber).slice(0, -1) || "0";
        enableDotButton();
        updateDisplayValue(firstNumber);
    } else if (newValue === "C" && firstNumber && operator && secondNumber) {
        secondNumber = convertToString(secondNumber).slice(0, -1) || "0";
        enableDotButton();
        updateDisplayValue(secondNumber);
    } else if (newValue === "C" && firstNumber && operator && !secondNumber) {
        operator = "";
    }
}

function displaySolution(newValue) {
    if (newValue === "=" && firstNumber && secondNumber && operator) {
        enableDotButton();
        let result = calculate(firstNumber, secondNumber, operator);
        let solution = formatResult(result);
        updateDisplayValue(solution);
        resetCalculator();
    }
}

function resetDisplay(newValue) {
    if (newValue === "AC") {
        disableDotButton;
        updateDisplayValue("0");
        resetCalculator();
        display.style.fontSize = "3.5rem";
        display.style.color = "#074462";
    }
}

function updateNumber(number, inputValue) {
    number = limitNumberLength(number, inputValue);
    number = removeLeadingZero(number);
    number = addLeadingZero(number);
    return number;
}

function calculatePercentage(number) {
    return number / 100;
}

function toggleSign(number) {
    if (number === 0) {
        return 0;
    }

    return number * -1;
}

function enableDotButton() {
    dotButton.disabled = false;
}

function resetOperator(operatorValue) {
    let result = calculate(firstNumber, secondNumber, operator);
    let solution = formatResult(result);
    firstNumber = solution.toString();
    updateDisplayValue(firstNumber);
    secondNumber = "";
    operator = operatorValue;
    display.style.fontSize = "3.5rem";
}

function convertToString(number) {
    let str;
    if (typeof number == "number") {
        str = String(number);
    } else {
        str = number;
    }

    return str;
}

function calculate(num1, num2, operator) {
    let firstNumber = convertToNumber(num1);
    let secondNumber = convertToNumber(num2);

    let result;

    switch (operator) {
        case "+":
            result = addNumbers(firstNumber, secondNumber);
            break;
        case "-":
            result = subtractNumbers(firstNumber, secondNumber);
            break;
        case "/":
            result = divideNumbers(firstNumber, secondNumber);
            break;
        default:
            result = multiplyNumbers(firstNumber, secondNumber);
            break;
    }

    return result;
}

function formatResult(result) {
    let formattedResult = result;

    if (result === Infinity) {
        formattedResult = "Please!";
    }

    if (result.toString().includes(".")) {
        formattedResult = Math.round(result * 100) / 100;
    }

    if (result.toString().length <= 8) {
        display.style.fontSize = "3.5rem";
    } else if (
        result.toString().length >= 9 &&
        result.toString().length <= 12
    ) {
        display.style.fontSize = "2.4rem";
    } else {
        display.style.fontSize = "1.8rem";
    }

    return formattedResult;
}

function resetCalculator() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function disableDotButton(number) {
    if (number.includes(".")) {
        dotButton.disabled = true;
    }
}

function limitNumberLength(number, inputValue) {
    if (number.length < 8) {
        number += inputValue;
    }
    return number;
}

function removeLeadingZero(number) {
    if (number.startsWith("0") && number.length > 1) {
        number = number.slice(1);
    }

    return number;
}

function addLeadingZero(number) {
    if (number.startsWith(".")) {
        number = "0" + number;
    }

    return number;
}

function convertToNumber(input) {
    let number;

    if (typeof input === "string") {
        const hasDecimal = input.includes(".");
        number = hasDecimal ? parseFloat(input) : parseInt(input);
    } else if (typeof input === "number") {
        number = input;
    }

    return number;
}

function addNumbers(num1, num2) {
    return num1 + num2;
}

function subtractNumbers(num1, num2) {
    return num1 - num2;
}

function divideNumbers(num1, num2) {
    return num1 / num2;
}

function multiplyNumbers(num1, num2) {
    return num1 * num2;
}
