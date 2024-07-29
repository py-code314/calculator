// Global variables.
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

/* Event listeners */
// Event listener for on-screen buttons.
buttons.addEventListener("click", (event) => {
    let newValue = getInputValue(event);

    firstNumber = assignFirstNumber(newValue);
    updateDisplayValue(firstNumber);

    // Assign second number only if firstNumber is true.
    if (firstNumber && operator && numbers.includes(newValue)) {
        secondNumber = assignSecondNumber(newValue);
        updateDisplayValue(secondNumber);
    }

    assignOperator(newValue);
    handleInvalidInput(newValue);
    displaySolution(newValue);
    clearPreviousButtonValue(newValue);
    updatePreview(newValue);
    resetDisplay(newValue);
});

// Event listener for computer keyboard buttons.
document.addEventListener("keydown", (event) => {
    let newValue = getInputValue(event);

    firstNumber = assignFirstNumber(newValue);
    updateDisplayValue(firstNumber);

    // Assign second Number only if firstNumber is assigned.
    if (firstNumber && operator && numbers.includes(newValue)) {
        secondNumber = assignSecondNumber(newValue);
        updateDisplayValue(secondNumber);
    }

    assignOperator(newValue);
    handleInvalidInput(newValue);
    displaySolution(newValue);
    clearPreviousButtonValue(newValue);
    updatePreview(newValue);
    resetDisplay(newValue);
});

/* Functions */
// Get input value when user clicks a button.
function getInputValue(event) {
    let inputValue;
    // Check if event is click or keydown.
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

// Assign first number.
function assignFirstNumber(inputValue) {
    if (!operator && !secondNumber && numbers.includes(inputValue)) {
        firstNumber = formatNumber(firstNumber, inputValue);
        // Disable dot button if there's already a decimal in the number.
        disableDotButton(firstNumber);
    } else if (firstNumber && !operator && inputValue === "%") {
        firstNumber = calculatePercentage(firstNumber);
    } else if (firstNumber && !operator && inputValue === "+/-") {
        // Change the sign of the number to positive or negative.
        firstNumber = toggleSign(firstNumber);
    }

    return firstNumber;
}

// Update display.
function updateDisplayValue(displayValue) {
    // Change display color if there's an invalid input or zeroDivisionError.
    if (displayValue === "error") {
        display.style.color = "#7a0d18";
    } else if (displayValue === "Please!") {
        display.style.color = "#125c0e";
    } else {
        display.style.color = "#074462";
    }
    display.textContent = displayValue;
}

// Assign second number after firstNumber is assigned.
function assignSecondNumber(inputValue) {
    if (firstNumber && operator && numbers.includes(inputValue)) {
        secondNumber = formatNumber(secondNumber, inputValue);
        // Disable dot button if there's already a decimal in the number.
        disableDotButton(secondNumber);
    } else if (firstNumber && operator && secondNumber && inputValue === "%") {
        secondNumber = calculatePercentage(Number(secondNumber));
    } else if (
        firstNumber &&
        operator &&
        secondNumber &&
        inputValue === "+/-"
    ) {
        // Change the sign of the number to positive or negative.
        secondNumber = toggleSign(Number(secondNumber));
    }

    return secondNumber;
}

// Assign operator.
function assignOperator(operatorValue) {
    if (
        firstNumber &&
        !operator &&
        !secondNumber &&
        operators.includes(operatorValue)
    ) {
        // Enable dot button when operator is selected.
        enableDotButton();
        operator = operatorValue;
    } else if (
        firstNumber &&
        operator &&
        secondNumber &&
        operators.includes(operatorValue)
    ) {
        // Enable dot button when the next operator is selected in a series of calculations.
        enableDotButton();
        // Reset operator to new operator.
        resetOperator(operatorValue);
    }
}

// Handle invalid operator input and display error when there's no firstNumber.
function handleInvalidInput(operatorValue) {
    const invalidOperators = ["=", "%", "+/-", "/", "*", "+", "-"];
    if (!firstNumber && invalidOperators.includes(operatorValue)) {
        updateDisplayValue("error");
    }
}

// Update preview text based on firstNumber, operator and secondNumber.
function updatePreview() {
    previewText = firstNumber + operator + secondNumber;
    // Show preview text from right to left.
    const textLength = previewText.length;
    const maxIndent = 350;
    const textIndent = maxIndent - textLength * 10;

    preview.textContent = previewText;
    preview.style.textIndent = `${textIndent}px`;
}

// Delete previous button value if user makes a wrong choice.
function clearPreviousButtonValue(newValue) {
    if (newValue === "C" && firstNumber && !operator) {
        // Remove last character from firstNumber.
        // If last digit is removed, default to 0.
        firstNumber = convertToString(firstNumber).slice(0, -1) || "0";
        // Enable dot button if user deletes '.' character in firstNumber.
        enableDotButton();
        updateDisplayValue(firstNumber);
    } else if (newValue === "C" && firstNumber && operator && secondNumber) {
        // Remove last character from secondNumber.
        // If last digit is removed, default to 0.
        secondNumber = convertToString(secondNumber).slice(0, -1) || "0";

        enableDotButton();
        updateDisplayValue(secondNumber);
    } else if (newValue === "C" && firstNumber && operator && !secondNumber) {
        // Reset operator to default.
        operator = "";
    }
}

// Display solution when user presses '='.
function displaySolution(newValue) {
    if (firstNumber && secondNumber && operator && newValue === "=") {
        // Enable dot button after the solution is displayed.
        enableDotButton();
        let result = calculate(firstNumber, secondNumber, operator);
        let solution = formatResult(result);
        updateDisplayValue(solution);
        // Reset values of firstNumber, secondNumber and operator to default.
        resetCalculator();
    }
}

// Reset display after user clicks 'AC'.
function resetDisplay(newValue) {
    if (newValue === "AC") {
        enableDotButton();
        // Reset values of firstNumber, secondNumber and operator to default.
        resetCalculator();
        updateDisplayValue("0");

        display.style.fontSize = "3.5rem";
        display.style.color = "#074462";
    }
}

// Format number.
function formatNumber(number, inputValue) {
    // Limit number length to 8 characters.
    number = limitNumberLength(number, inputValue);
    // Remove leading zero.
    number = removeLeadingZero(number);
    // Add leading zero if first digit is a decimal.
    number = addLeadingZero(number);
    return number;
}

// Calculate percentage.
function calculatePercentage(number) {
    return number / 100;
}

// Change the sign of the number to positive or negative.
function toggleSign(number) {
    if (number === 0) {
        return 0;
    }

    return number * -1;
}

// Enable dot button.
function enableDotButton() {
    dotButton.disabled = false;
}

// Reset operator to new operator when user makes a series of calculations.
function resetOperator(operatorValue) {
    let result = calculate(firstNumber, secondNumber, operator);
    let solution = formatResult(result);
    firstNumber = solution.toString();
    updateDisplayValue(firstNumber);
    secondNumber = "";
    operator = operatorValue;
    display.style.fontSize = "3.5rem";
}

// Convert number to string.
function convertToString(number) {
    let str;
    if (typeof number == "number") {
        str = String(number);
    } else {
        str = number;
    }

    return str;
}

// Calculate result from user input.
function calculate(num1, num2, operator) {
    // Convert numbers to numbers first.
    let firstNumber = convertToNumber(num1);
    let secondNumber = convertToNumber(num2);

    let result;
    // Calculate result based on operator.
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

// Format result based on length.
function formatResult(result) {
    let formattedResult = result;
    // Sarcastic message if result is Infinity.
    if (result === Infinity) {
        formattedResult = "Please!";
    }
    // Round result to 2 decimal places.
    if (result.toString().includes(".")) {
        formattedResult = Math.round(result * 100) / 100;
        display.style.fontSize = "3.5rem";
    }

    // Set font size based on length of result.
    if (formattedResult.toString().length <= 8) {
        display.style.fontSize = "3.5rem";
    } else if (
        formattedResult.toString().length >= 9 &&
        formattedResult.toString().length <= 12
    ) {
        display.style.fontSize = "2.4rem";
    } else {
        display.style.fontSize = "1.8rem";
    }

    return formattedResult;
}

// Reset values of firstNumber, secondNumber and operator to default.
function resetCalculator() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    preview.textContent = "";
}

// Disable dot button if there's already a decimal in the number.
function disableDotButton(number) {
    if (number.includes(".")) {
        dotButton.disabled = true;
    }
}

// Limit number length to 8 characters.
function limitNumberLength(number, inputValue) {
    if (number.length < 8) {
        number += inputValue;
    }
    return number;
}

// Remove leading zero.
function removeLeadingZero(number) {
    if (number.startsWith("0") && number.length > 1) {
        number = number.slice(1);
    }

    return number;
}

// Add leading zero if first digit is a decimal.
function addLeadingZero(number) {
    if (number.startsWith(".")) {
        number = "0" + number;
    }

    return number;
}

// Convert input to number.
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

// Add numbers.
function addNumbers(num1, num2) {
    return num1 + num2;
}

// Subtract numbers.
function subtractNumbers(num1, num2) {
    return num1 - num2;
}

// Divide numbers.
function divideNumbers(num1, num2) {
    return num1 / num2;
}

// Multiply numbers.
function multiplyNumbers(num1, num2) {
    return num1 * num2;
}
