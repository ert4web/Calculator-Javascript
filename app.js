let screen = document.querySelector(".screen");
let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let intBuffer = 0;

function dispalyTotal() {
  if (previousOperator === "+") {
    intBuffer += parseInt(buffer);
  } else if (previousOperator === "−") {
    intBuffer -= parseInt(buffer);
  } else if (previousOperator === "×") {
    intBuffer *= parseInt(buffer);
  } else if (previousOperator === "÷") {
    intBuffer /= parseInt(buffer);
  }
  runningTotal = intBuffer;
}

function mathOperation(mathSymbol) {
  if (buffer == "0") {
    return;
  }
  if (previousOperator == null) {
    intBuffer = parseInt(buffer);
  } else if (previousOperator != null) {
    dispalyTotal();
  }

  previousOperator = mathSymbol;

  buffer = "0";
}

function resolveSymbol(symbol) {
  // to do
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      intBuffer = 0;
      break;

    case "←":
      if (buffer.length > 1) {
        buffer = buffer.slice(0, buffer.length - 1);
      } else if (buffer.length === 1 && buffer != "0") {
        buffer = "0";
      }
      break;

    case "=":
      dispalyTotal();
      buffer = runningTotal;
      previousOperator = null;
      runningTotal = 0;
      intBuffer = 0;
      break;
    case "÷":
    case "×":
    case "−":
    case "+":
      mathOperation(symbol);
      break;
  }
}
function resolveNumber(number) {
  if (buffer == "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function handleClick(btnValue) {
  if (isNaN(btnValue)) {
    resolveSymbol(btnValue);
  } else {
    resolveNumber(btnValue);
  }
}

function init() {
  let keys = document.querySelector(".keypad");
  keys.addEventListener("click", event => {
    handleClick(event.target.innerText);
    screen.innerText = buffer;
  });
}
init();
