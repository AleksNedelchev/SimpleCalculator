class Calctulator {
  constructor(previousOperand, currentOperand) {
    this.previousOperandTextElement = previousOperand;
    this.currentOperandTextElement = currentOperand;
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  allClear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  calculate() {
    let calculation;
    let prevNum = parseFloat(this.previousOperand);
    let currNum = parseFloat(this.currentOperand);

    if (isNaN(prevNum) || isNaN(currNum)) return;

    switch (this.operation) {
      case "+":
        calculation = prevNum + currNum;
        break;
      case "-":
        calculation = prevNum - currNum;
        break;
      case "*":
        calculation = prevNum * currNum;
        break;
      case "/":
        calculation = prevNum / currNum;
        break;
      case "%":
        calculation = currNum * (prevNum / 100);
        break;
      default:
        break;
    }

    this.currentOperand = calculation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  modifyNumber(number) {
    var numberToString = number.toString();
    var firstHalf = parseFloat(numberToString.split(".")[0]);
    var secondHalf = numberToString.split(".")[1];
    var numberToReturn;

    if (isNaN(firstHalf)) {
      numberToReturn = "";
    } else {
      numberToReturn = firstHalf.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (secondHalf != null) {
      return numberToReturn + "." + secondHalf;
    } else {
      return numberToReturn;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.modifyNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        this.modifyNumber(this.previousOperand) + " " + this.operation;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearAllButton = document.querySelector("[data-all-delete]");
const clearButton = document.querySelector("[data-delete]");
const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");

var calculator = new Calctulator(previousOperand, currentOperand);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.chooseOperation(operation.innerText);
    calculator.updateDisplay();
  });
});

clearAllButton.addEventListener("click", (button) => {
  calculator.allClear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", (button) => {
  calculator.calculate();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
