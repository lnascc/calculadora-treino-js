const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ""
  }

  // adicionando digitos na tela

  addDigit(digit) {
  // checando se tem um ponto
  if(digit === "." && this.currentOperationText.innerText.includes('.')) {
    return
  }

    this.currentOperation = digit
    this.updateScreen()
  }

  // procassando os operadores
  processOperation(operation) {
    // valor de baixo esta vazio
    if(this.currentOperationText.innerText === '' && operation !== 'C') {
      //mudar operação
      if(this.previousOperationText.innerText !== '') {
        this.changeOperation(operation)
      }
      return
    }

    let operationValue
    const previous = +this.previousOperationText.innerText.split(' ')[0]
    const current = +this.currentOperationText.innerText

    switch (operation) {
      case '+':
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case '-':
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case '/':
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case '*':
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break;  
      case 'DEL':
        this.processDelOperator()
        break; 
      case 'CE':
        this.processClearCurrentOperator()
        break;
      case 'C':
        this.processClearOperator()
        break;
      case '=':
        this.processEqualOperator()
        break;
      default:
        return
    }
  }

  //mudando digitos na tela
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {

    if(operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      // checar se o valor é zero, se for adicione currentValue
      if(previous === 0) {
        operationValue = current
      }
      // adicionar current value no previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ''
    }
  }


// mudando operação matematica
changeOperation(operation) {
  const mathOperations = ['*', '/', '+', '-']

  if(!mathOperations.includes(operation)) {
    return
  }

  this.previousOperationText.innerText = 
  this.previousOperationText.innerText.slice(0, -1) + operation

}

// deletar ultimo digito
processDelOperator() {
  this.currentOperationText.innerText = 
    this.currentOperationText.innerText.slice(0, -1)
}

// limpar operação atual
processClearCurrentOperator() {
  this.currentOperationText.innerText = ''
}

// limpa todas as operações
processClearOperator() {
  this.currentOperationText.innerText = ''
  this.previousOperationText.innerText = ''
}

//processando a operação
processEqualOperator() {
  const operation = previousOperationText.innerText.split(' ')[1]

  this.processOperation(operation)
}

}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const value = e.target.innerText

    if(+value >= 0 || value === '.') {
      calc.addDigit(value)
    } else {
     calc.processOperation(value)
    }
  })
})