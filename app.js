// Get references to the input field and buttons
const inputField = document.querySelector('.input input');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.opr');
const clearButton = document.querySelector('.black-font:nth-child(1)'); // AC
const clearEntryButton = document.querySelector('.black-font:nth-child(2)'); // C
const equalButton = document.querySelector('.opr.equal'); // =

let currentInput = '';
let operator = '';
let previousInput = '';

// Function to update the input field
function updateInput(value) {
    currentInput += value;
    inputField.value = currentInput;
}

// Function to handle operators
function handleOperator(op) {
    if (currentInput === '') return; // Do nothing if there's no input
    if (previousInput !== '') {
        calculate(); // If there's a previous input, calculate first
    }

    operator = op; // Set the operator
    previousInput = currentInput; // Store the current input as previous
    currentInput = ''; // Clear current input for the next number
}

// Function to perform calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return; // Check for valid numbers

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case 'X':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        case '%':
            // Percentage logic: prev * current / 100
            result = (prev * current) / 100;
            break;
        default:
            return;
    }

    currentInput = result.toString(); // Convert result to string for display
    operator = ''; // Reset operator
    previousInput = ''; // Reset previous input
    inputField.value = currentInput; // Update input field with result
}

// Function to clear the input field
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    inputField.value = '';
}

// Function to clear the last entry
function clearEntry() {
    // Remove the last character from the current input
    currentInput = currentInput.slice(0, -2);
    inputField.value = currentInput;
}

// Event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === '0' && currentInput === '0') return; // Prevent multiple leading zeros
        updateInput(button.innerText);
    });
});

// Event listeners for operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperator(button.innerText);
    });
});

// Event listener for equal button
equalButton.addEventListener('click', calculate);

// Event listener for Enter key
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default behavior
        calculate(); // Perform the calculation
    }
});

// Event listener for clear all button
clearButton.addEventListener('click', clearAll);

// Event listener for clear entry button
clearEntryButton.addEventListener('click', clearEntry);
