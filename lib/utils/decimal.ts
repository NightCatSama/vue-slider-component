type Operator = '+' | '-' | '*' | '/' | '%'

/**
 * For any precise floating point calculation
 *
 * @export
 * @class Decimal
 */
export default class Decimal {
  num: number

  constructor(num: number) {
    this.num = num
  }

  decimal(num2: number, operator: Operator, isChain?: boolean): this {
    const num1 = this.num
    const decimals1 = `${num1}`.split('.')[1] || ''
    const decimals2 = `${num2}`.split('.')[1] || ''
    const decimals = decimals1.length > decimals2.length ? decimals1 : decimals2
    let multiple = decimals ? Math.pow(10, decimals.length) : 1
    const n1 = Math.round(num1 * multiple)
    const n2 = Math.round(num2 * multiple)
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
    return this
  }

  plus(num2: number) {
    return this.decimal(num2, '+')
  }

  minus(num2: number) {
    return this.decimal(num2, '-')
  }

  multiply(num2: number) {
    return this.decimal(num2, '*')
  }

  divide(num2: number) {
    return this.decimal(num2, '/')
  }

  remainder(num2: number) {
    return this.decimal(num2, '%')
  }

  toNumber(): number {
    return this.num
  }
}
