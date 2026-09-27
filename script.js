let mainDisplay = document.getElementById('main-display');
let historyDisplay = document.getElementById('history-display');
let themeToggle = document.getElementById('theme-toggle');

let currentInput = '0';
let historyInput = '';
let shouldResetDisplay = false;

// Append Numbers
function appendNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
  }
  updateDisplay();
}

// Append Operators
function appendOperator(operator) {
  if (shouldResetDisplay) shouldResetDisplay = false;
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/', '%'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

// Clear All
function clearAll() {
  currentInput = '0';
  historyInput = '';
  updateDisplay();
}

// Delete Last Character
function deleteLast() {
  if (currentInput.length === 1 || shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

// Calculate Result
function calculate() {
  try {
    historyInput = currentInput;
    let formattedInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
    let result = eval(formattedInput);

    if (result === Infinity || isNaN(result)) {
      currentInput = 'Error';
    } else {
      currentInput = Number(result.toFixed(8)).toString();
    }
    shouldResetDisplay = true;
  } catch (error) {
    currentInput = 'Error';
    shouldResetDisplay = true;
  }
  updateDisplay();
}

// Update Screen
function updateDisplay() {
  mainDisplay.innerText = currentInput;
  historyDisplay.innerText = historyInput;
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  if (e.key === '.') appendNumber('.');
  if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
  if (e.key === '%') appendOperator('%');
  if (e.key === 'Enter' || e.key === '=') calculate();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearAll();
});

// Theme Toggle (Dark / Light)
themeToggle.addEventListener('click', () => {
  const body = document.body;
  if (body.getAttribute('data-theme') === 'light') {
    body.removeAttribute('data-theme');
    themeToggle.innerText = '🌙';
  } else {
    body.setAttribute('data-theme', 'light');
    themeToggle.innerText = '☀️';
  }
});