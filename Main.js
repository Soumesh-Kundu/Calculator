class Calculator {
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement
    this.previousOperandTextElement = previousOperandTextElement
    this.clear()
  }
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operator = undefined
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  append(number) {
    if (this.currentOperand.includes('.') && number === '.') return;
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperation(operator) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operator = operator
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const curr = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(curr)) return
    switch (this.operator) {
      case '+':
        computation = prev + curr
        break
      case '-':
        computation = prev - curr
        break
      case '*':
        computation = prev * curr
        break
      case '/':
        if(curr!=0)
        {
          computation = prev / curr
        }
        else{
          computation="infinte"
        }
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operator = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    let intergerdisplay
    if(number==="infinte")return "infinte, press All clear"
    let stringnumber = number.toString()
    const integerdigits = parseFloat(stringnumber.split('.')[0])
    const decimeldigits = stringnumber.split('.')[1]
    if (isNaN(integerdigits)) {
      intergerdisplay = ''
    }
    else {
      intergerdisplay = integerdigits.toLocaleString('en')
    }
    if (decimeldigits != null) {
      if (isNaN(integerdigits)) {
        intergerdisplay = '0'
      }
      return `${intergerdisplay}.${decimeldigits}`
    }
    else {
      return intergerdisplay  
    }
  }

  updatedisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operator !== undefined) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`
    }
    else{
      this.previousOperandTextElement.innerText=''
    }
  }
}
const numberbuttons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement)
numberbuttons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.updatedisplay()
  })
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updatedisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updatedisplay()
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updatedisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updatedisplay()
})