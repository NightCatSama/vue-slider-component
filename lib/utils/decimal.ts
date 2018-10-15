type Operator = '+' | '-' | '*' | '/' | '%'

export default class Decimal {
  num: number

  constructor(num: number) {
    this.num = num
  }

  decimal(num2: number, operator: Operator, isChain?: false): number
  decimal(num2: number, operator: Operator, isChain: true): this
  decimal(num2: number, operator: Operator, isChain?: boolean): number | this {
    const num1 = this.num
    const decimals1 = `${num1}`.split('.')[1] || ''
    const decimals2 = `${num2}`.split('.')[1] || ''
    const decimals = decimals1.length > decimals2.length ? decimals1 : decimals2
    let multiple = decimals ? Math.pow(10, decimals.length) : 1
    const n1 = Math.floor(num1 * multiple)
    const n2 = Math.floor(num2 * multiple)
    let n = 0
    switch (operator) {
      case '+':
        n = n1 + n2
        break
      case '-':
        n = n1 - n2
        break
      case '*':
        n = n1 * n2
        multiple *= multiple
        break
      case '/':
        n = n1 / n2
        multiple = 1
        break
      case '%':
        n = n1 % n2
        multiple = 1
        break
    }

    this.num = n / multiple
    if (isChain) {
      return this
    } else {
      return this.num
    }
  }

  plus(num2: number) {
    return this.decimal(num2, '+', false)
  }

  plusChain(num2: number) {
    return this.decimal(num2, '+', true)
  }

  minus(num2: number) {
    return this.decimal(num2, '-', false)
  }

  minusChain(num2: number) {
    return this.decimal(num2, '-', true)
  }

  multiply(num2: number) {
    return this.decimal(num2, '*', false)
  }

  multiplyChain(num2: number) {
    return this.decimal(num2, '*', true)
  }

  divide(num2: number) {
    return this.decimal(num2, '/', false)
  }

  divideChain(num2: number) {
    return this.decimal(num2, '/', true)
  }

  remainder(num2: number) {
    return this.decimal(num2, '%', false)
  }

  remainderChain(num2: number) {
    return this.decimal(num2, '%', true)
  }

  toNumber(): number {
    return this.num
  }
}
