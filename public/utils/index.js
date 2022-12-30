class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement
    this.clear();
  }

  clear() {
    this.previousOperandTextElement.textContent = '';
    this.currentOperandTextElement.textContent = '';
  }

  delete() {
    this.currentOperandTextElement.textContent = this.currentOperandTextElement.textContent.toString().slice(0, -1);
  }

  appendNumber(number){
    if(this.currentOperandTextElement === ''){
      this.currentOperandTextElement.textContent = number.toString();
    } else {
      this.currentOperandTextElement.textContent = this.currentOperandTextElement.textContent.toString() + number.toString();
    }
  }

  chooseOperation(operator){
    switch(operator){
      case '+':
        this.previousOperandTextElement.textContent = `${this.currentOperandTextElement.textContent.toString()} +`;
        operand = '+';
        break;

      case '-':
        this.previousOperandTextElement.textContent = `${this.currentOperandTextElement.textContent.toString()} -`;
        operand = '-';
        break;

      case 'x':
        this.previousOperandTextElement.textContent = `${this.currentOperandTextElement.textContent.toString()} x`;
        operand = 'x';
        break;

      case '÷':
        this.previousOperandTextElement.textContent = `${this.currentOperandTextElement.textContent.toString()} ÷`;
        operand = '÷';
        break;
      default:
        return;
    }
    this.currentOperandTextElement.textContent = '';
  }

  compute(operator){
    switch(operator){
      case '+':
        this.currentOperandTextElement.textContent = parseFloat(this.currentOperandTextElement.textContent) + parseFloat(this.previousOperandTextElement.textContent);
        this.previousOperandTextElement.textContent = '';

      case '-':

        this.currentOperandTextElement.textContent = parseFloat(this.currentOperandTextElement.textContent) - parseFloat(this.previousOperandTextElement.textContent);
        this.previousOperandTextElement.textContent = '';

      case 'x':
        this.currentOperandTextElement.textContent = parseFloat(this.currentOperandTextElement.textContent) * parseFloat(this.previousOperandTextElement.textContent);
        this.previousOperandTextElement.textContent = '';
        
      case '÷':
        this.currentOperandTextElement.textContent = parseFloat(this.currentOperandTextElement.textContent) / parseFloat(this.previousOperandTextElement.textContent);
        this.previousOperandTextElement.textContent = '';
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

let operand;

numberButtons.forEach(button =>{
  button.addEventListener('click',()=>{
    calculator.appendNumber(button.textContent);
  })
});

allClearButton.addEventListener('click',()=>{
  calculator.clear();
});

deleteButton.addEventListener('click',()=>{
  calculator.delete();
});

operationButtons.forEach(button =>{
  button.addEventListener('click',()=>{
    calculator.chooseOperation(button.textContent.toString());
  })
})

equalsButton.addEventListener('click',()=>{
  calculator.compute(operand);
})