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

  decimal(num2: number, operator: Operator): this {
    const num1 = this.num
    const len1 = this.getDecimalLen(num1)
    const len2 = this.getDecimalLen(num2)
    let base = 0
    switch (operator) {
      case '+':
        base = this.getExponent(len1, len2)
        this.num = (this.safeRoundUp(num1, base) + this.safeRoundUp(num2, base)) / base
        break
      case '-':
        base = this.getExponent(len1, len2)
        this.num = (this.safeRoundUp(num1, base) - this.safeRoundUp(num2, base)) / base
        break
      case '*':
        this.num =
          this.safeRoundUp(
            this.safeRoundUp(num1, this.getExponent(len1)),
            this.safeRoundUp(num2, this.getExponent(len2)),
          ) / this.getExponent(len1 + len2)
        break
      case '/':
        base = this.getExponent(len1, len2)
        this.num = this.safeRoundUp(num1, base) / this.safeRoundUp(num2, base)
        break
      case '%':
        base = this.getExponent(len1, len2)
        this.num = (this.safeRoundUp(num1, base) % this.safeRoundUp(num2, base)) / base
        break
    }
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

  private getDecimalLen(num: number): number {
    const strArr = `${num}`.split('e')
    return (`${strArr[0]}`.split('.')[1] || '').length - (strArr[1] ? +strArr[1] : 0)
  }

  private getExponent(num1: number, num2?: number): number {
    return Math.pow(10, num2 !== void 0 ? Math.max(num1, num2) : num1)
  }

  // fix: 9999999.99995 * 100000 = 999999999994.9999
  private safeRoundUp(num: number, exponent: number): number {
    return Math.round(num * exponent)
  }
}
