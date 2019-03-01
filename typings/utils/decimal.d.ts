declare type Operator = '+' | '-' | '*' | '/' | '%'
/**
 * For any precise floating point calculation
 *
 * @export
 * @class Decimal
 */
export default class Decimal {
  num: number
  constructor(num: number)
  decimal(num2: number, operator: Operator, isChain?: boolean): this
  plus(num2: number): this
  minus(num2: number): this
  multiply(num2: number): this
  divide(num2: number): this
  remainder(num2: number): this
  toNumber(): number
}
export {}
