class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement
    this.clear();
   }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.'))return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  negation(){
    if(this.currentOperand !== 0){
      this.currentOperand = this.currentOperand * (-1);
    }
  }

  delete() {
    this.currentOperand = parseFloat(this.currentOperand.toString().slice(0, -1));
    if(isNaN(this.currentOperand)){
      this.currentOperand = '';
    }
  }

  chooseOperation(operation){
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    switch(this.operation){
      case '+':
        this.currentOperand = parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
        this.previousOperand = '';
        this.operation ='';
        break;

      case '-':

      this.currentOperand = parseFloat(this.previousOperand) - parseFloat(this.currentOperand);
      this.previousOperand = '';
      this.operation ='';
      break;

      case 'x':
        this.currentOperand = parseFloat(this.previousOperand) * parseFloat(this.currentOperand);
        this.previousOperand = '';
        this.operation ='';
        break;

      case '÷':
        this.currentOperand = parseFloat(this.previousOperand) / parseFloat(this.currentOperand);
        this.previousOperand = '';
        this.operation ='';
        break;

      default:
        return;
    }
  }

  updateDisplay(){
    if(this.operation === undefined){
      this.previousOperandTextElement.innerText = this.previousOperand.toString();
      this.currentOperandTextElement.innerText = this.currentOperand.toString();
    } else {
      this.previousOperandTextElement.innerText = `${this.previousOperand.toString()} ${this.operation}`;
      this.currentOperandTextElement.innerText = `${this.currentOperand.toString()}`;
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]');
const negationButton = document.querySelector('[data-negation]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button =>{
  button.addEventListener('click',()=>{
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  })
});

allClearButton.addEventListener('click',()=>{
  calculator.clear();
  calculator.updateDisplay();
});

negationButton.addEventListener('click',()=>{
  calculator.negation();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click',()=>{
  calculator.delete();
  calculator.updateDisplay();
});

operationButtons.forEach(button =>{
  button.addEventListener('click',()=>{
    calculator.chooseOperation(button.textContent.toString());
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click',()=>{
  calculator.compute();
  calculator.updateDisplay();
})