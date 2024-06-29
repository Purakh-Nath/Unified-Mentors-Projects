document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let expression = '';
    let isResultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.getAttribute('data-digit');
            const operation = button.getAttribute('data-operator');
            const isFunction = button.classList.contains('function');

            if (digit !== null) {
                handleDigit(digit);
            } else if (operation !== null) {
                handleOperator(operation);
            } else if (isFunction) {
                handleFunction(button.id);
            } else if (button.id === 'clear') {
                clearDisplay();
            } else if (button.id === 'delete') {
                deleteLastDigit();
            } else if (button.id === 'equals') {
                calculateResult();
            }
        });
    });

    function handleDigit(digit) {
        if (isResultDisplayed) {
            expression = '';
            isResultDisplayed = false;
        }
        currentInput += digit;
        expression += digit;
        updateDisplay(expression);
    }

    function handleOperator(operation) {
        if (isResultDisplayed) {
            expression = display.textContent;
            isResultDisplayed = false;
        }
        if (currentInput === '' && operation !== '-') return;
        if (currentInput === '' && operation === '-') {
            currentInput = '-';
            expression += '-';
            updateDisplay(expression);
            return;
        }
        expression += ` ${operation} `;
        currentInput = '';
        updateDisplay(expression);
    }

    function handleFunction(func) {
        let result;
        switch (func) {
            case 'sqrt':
                result = Math.sqrt(parseFloat(currentInput));
                break;
            case 'percent':
                result = parseFloat(currentInput) / 100;
                break;
        }
        currentInput = result.toString();
        expression = currentInput;
        updateDisplay(currentInput);
    }

    function clearDisplay() {
        currentInput = '';
        expression = '';
        updateDisplay('0');
    }

    function deleteLastDigit() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            expression = expression.slice(0, -1);
            updateDisplay(expression || '0');
        }
    }

    function calculateResult() {
        try {
            const result = eval(expression);
            updateDisplay(result);
            currentInput = result.toString();
            expression = result.toString();
            isResultDisplayed = true;
        } catch (e) {
            updateDisplay('Error');
            currentInput = '';
            expression = '';
        }
    }

    function updateDisplay(value) {
        display.textContent = value;
    }

    // Handle keyboard input
    window.addEventListener('keydown', (event) => {
        if (event.key >= '0' && event.key <= '9') {
            handleDigit(event.key);
        } else if (event.key === '.') {
            handleDigit('.');
        } else if (event.key === 'Backspace') {
            deleteLastDigit();
        } else if (event.key === 'Enter' || event.key === '=') {
            calculateResult();
        } else if (event.key === 'Escape') {
            clearDisplay();
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            handleOperator(event.key);
        }
    });
});
