import { Value, Mark, MarksProp, ProcessProp, ProcessOption } from '../typings'
export const enum ERROR_TYPE {
  VALUE = 1,
  INTERVAL = 2,
  MIN = 3,
  MAX = 4,
  ORDER = 5,
}
declare type ERROR_MESSAGE = { [key in ERROR_TYPE]: string }
export declare const ERROR_MSG: ERROR_MESSAGE
/**
 * Slider logic control center
 *
 * @export
 * @class Control
 */
export default class Control {
  dotsPos: number[]
  dotsValue: Value[]
  data?: Value[]
  enableCross: boolean
  fixed: boolean
  max: number
  min: number
  interval: number
  minRange: number
  maxRange: number
  order: boolean
  marks?: MarksProp
  process?: ProcessProp
  onError?: (type: ERROR_TYPE, message: string) => void
  constructor(options: {
    value: Value | Value[]
    data?: Value[]
    enableCross: boolean
    fixed: boolean
    max: number
    min: number
    interval: number
    order: boolean
    minRange?: number
    maxRange?: number
    marks?: MarksProp
    process?: ProcessProp
    onError?: (type: ERROR_TYPE, message: string) => void
  })
  setValue(value: Value | Value[]): void
  setDotsPos(dotsPos: number[]): void
  syncDotsPos(): void
  /**
   * Get all the marks
   *
   * @readonly
   * @type {Mark[]}
   * @memberof Control
   */
  readonly markList: Mark[]
  /**
   * Get the most recent slider index by position
   *
   * @param {number} pos
   * @returns {number}
   * @memberof Control
   */
  getRecentDot(pos: number): number
  /**
   * Get index by value
   *
   * @param {Value} value
   * @returns {number}
   * @memberof Control
   */
  getIndexByValue(value: Value): number
  /**
   * Get value by index
   *
   * @param {index} number
   * @returns {Value}
   * @memberof Control
   */
  getValueByIndex(index: number): Value
  /**
   * Set the position of a single slider
   *
   * @param {number} pos
   * @param {number} index
   */
  setDotPos(pos: number, index: number): void
  /**
   * In fixed mode, get the position of all slider changes
   *
   * @param {number} changePos Change distance of a single slider
   * @param {number} index slider index
   * @returns {DotsPosChangeArray}
   * @memberof Control
   */
  private getFixedChangePosArr
  /**
   * In minRange/maxRange mode, get the position of all slider changes
   *
   * @param {number} pos position of a single slider
   * @param {number} changePos Change distance of a single slider
   * @param {number} index slider index
   * @returns {DotsPosChangeArray}
   * @memberof Control
   */
  private getLimitRangeChangePosArr
  private isPos
  /**
   * Get a valid position by pos
   *
   * @param {number} pos
   * @param {number} index
   * @returns {{ pos: number, inRange: boolean }}
   */
  getValidPos(
    pos: number,
    index: number,
  ): {
    pos: number
    inRange: boolean
  }
  /**
   * Calculate the position of the slider by value
   *
   * @param {Value} val
   * @returns {number}
   */
  parseValue(val: Value): number
  /**
   * Calculate the value by position
   *
   * @param {number} pos
   * @returns {Value}
   * @memberof Control
   */
  parsePos(pos: number): Value
  /**
   * Determine if the location is active
   *
   * @param {number} pos
   * @returns {boolean}
   * @memberof Control
   */
  isActiveByPos(pos: number): boolean
  /**
   * Get each value
   *
   * @returns {Value[]}
   * @memberof Control
   */
  getValues(): Value[]
  private emitError
  readonly processArray: ProcessOption
  /**
   * The total number of values
   *
   * @type {number}
   * @memberof Control
   */
  readonly total: number
  readonly gap: number
  readonly minRangeDir: number
  readonly maxRangeDir: number
  /**
   * Sliding range of each slider
   *
   * @type {Array<[number, number]>}
   * @memberof Control
   */
  readonly valuePosRange: Array<[number, number]>
}
export {}
