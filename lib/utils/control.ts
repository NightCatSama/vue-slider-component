import Decimal from './decimal'
import {
  Value,
  Mark,
  MarkOption,
  Marks,
  MarksProp,
  ProcessProp,
  ProcessOption,
  MarksFunction,
} from '../typings'

// The distance each slider changes
type DotsPosChangeArray = number[]

export const enum ERROR_TYPE {
  VALUE = 1,
  INTERVAL,
  MIN,
  MAX,
  ORDER,
}

type ERROR_MESSAGE = { [key in ERROR_TYPE]: string }
export const ERROR_MSG: ERROR_MESSAGE = {
  [ERROR_TYPE.VALUE]: 'The type of the "value" is illegal',
  [ERROR_TYPE.INTERVAL]:
    'The prop "interval" is invalid, "(max - min)" cannot be divisible by "interval"',
  [ERROR_TYPE.MIN]: 'The "value" cannot be less than the minimum.',
  [ERROR_TYPE.MAX]: 'The "value" cannot be greater than the maximum.',
  [ERROR_TYPE.ORDER]:
    'When "order" is false, the parameters "minRange", "maxRange", "fixed", "enabled" are invalid.',
}

/**
 * Slider logic control center
 *
 * @export
 * @class Control
 */
export default class Control {
  dotsPos: number[] = [] // The position of each slider
  dotsValue: Value[] = [] // The value of each slider

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
  }) {
    this.data = options.data
    this.max = options.max
    this.min = options.min
    this.interval = options.interval
    this.order = options.order
    this.marks = options.marks
    this.process = options.process
    this.onError = options.onError
    if (this.order) {
      this.minRange = options.minRange || 0
      this.maxRange = options.maxRange || 0
      this.enableCross = options.enableCross
      this.fixed = options.fixed
    } else {
      if (options.minRange || options.maxRange || !options.enableCross || options.fixed) {
        this.emitError(ERROR_TYPE.ORDER)
      }
      this.minRange = 0
      this.maxRange = 0
      this.enableCross = true
      this.fixed = false
    }
    this.setValue(options.value)
  }

  setValue(value: Value | Value[]) {
    this.dotsValue = Array.isArray(value) ? [...value] : [value]
    this.syncDotsPos()
  }

  // Set the slider position
  setDotsPos(dotsPos: number[]) {
    const list = this.order ? [...dotsPos].sort((a, b) => a - b) : dotsPos
    this.dotsPos = list
    this.dotsValue = list.map(dotPos => this.parsePos(dotPos))
  }

  // Sync slider position
  syncDotsPos() {
    this.dotsPos = this.dotsValue.map(v => this.parseValue(v))
  }

  /**
   * Get all the marks
   *
   * @readonly
   * @type {Mark[]}
   * @memberof Control
   */
  get markList(): Mark[] {
    if (!this.marks) {
      return []
    }

    const getMarkByValue = (value: Value, mark?: MarkOption): Mark => {
      const pos = this.parseValue(value)
      return {
        pos,
        value: typeof value === 'string' ? parseFloat(value) : value,
        label: value,
        active: this.isActiveByPos(pos),
        ...mark,
      }
    }

    if (this.marks === true) {
      return this.getValues().map(value => getMarkByValue(value))
    } else if (Object.prototype.toString.call(this.marks) === '[object Object]') {
      return Object.keys(this.marks)
        .sort((a, b) => +a - +b)
        .map(value => {
          const item = (this.marks as Marks)[value]
          return getMarkByValue(value, typeof item !== 'string' ? item : { label: item })
        })
    } else if (Array.isArray(this.marks)) {
      return this.marks.map(value => getMarkByValue(value))
    } else if (typeof this.marks === 'function') {
      return this.getValues()
        .map(value => ({ value, result: (this.marks as MarksFunction)(value) }))
        .filter(({ result }) => !!result)
        .map(({ value, result }) => getMarkByValue(value, result as Mark))
    } else {
      return []
    }
  }

  /**
   * Get the most recent slider index by position
   *
   * @param {number} pos
   * @returns {number}
   * @memberof Control
   */
  getRecentDot(pos: number): number {
    const arr = this.dotsPos.map(dotPos => Math.abs(dotPos - pos))
    return arr.indexOf(Math.min(...arr))
  }

  /**
   * Get index by value
   *
   * @param {Value} value
   * @returns {number}
   * @memberof Control
   */
  getIndexByValue(value: Value): number {
    if (this.data) {
      return this.data.indexOf(value)
    }
    return new Decimal(+value)
      .minus(this.min)
      .divide(this.interval)
      .toNumber()
  }

  /**
   * Get value by index
   *
   * @param {index} number
   * @returns {Value}
   * @memberof Control
   */
  getValueByIndex(index: number): Value {
    if (index < 0) {
      index = 0
    } else if (index > this.total) {
      index = this.total
    }
    return this.data
      ? this.data[index]
      : new Decimal(index)
          .multiply(this.interval)
          .plus(this.min)
          .toNumber()
  }

  /**
   * Set the position of a single slider
   *
   * @param {number} pos
   * @param {number} index
   */
  setDotPos(pos: number, index: number) {
    pos = this.getValidPos(pos, index).pos
    const changePos = pos - this.dotsPos[index]

    if (!changePos) {
      return
    }

    let changePosArr: DotsPosChangeArray = new Array(this.dotsPos.length)
    if (this.fixed) {
      changePosArr = this.getFixedChangePosArr(changePos, index)
    } else if (this.minRange || this.maxRange) {
      changePosArr = this.getLimitRangeChangePosArr(pos, changePos, index)
    } else {
      changePosArr[index] = changePos
    }

    this.setDotsPos(this.dotsPos.map((curPos, i) => curPos + (changePosArr[i] || 0)))
  }

  /**
   * In fixed mode, get the position of all slider changes
   *
   * @param {number} changePos Change distance of a single slider
   * @param {number} index slider index
   * @returns {DotsPosChangeArray}
   * @memberof Control
   */
  private getFixedChangePosArr(changePos: number, index: number): DotsPosChangeArray {
    this.dotsPos.forEach((originPos, i) => {
      if (i !== index) {
        const { pos: lastPos, inRange } = this.getValidPos(originPos + changePos, i)
        if (!inRange) {
          changePos =
            Math.min(Math.abs(lastPos - originPos), Math.abs(changePos)) * (changePos < 0 ? -1 : 1)
        }
      }
    })
    return this.dotsPos.map(_ => changePos)
  }

  /**
   * In minRange/maxRange mode, get the position of all slider changes
   *
   * @param {number} pos position of a single slider
   * @param {number} changePos Change distance of a single slider
   * @param {number} index slider index
   * @returns {DotsPosChangeArray}
   * @memberof Control
   */
  private getLimitRangeChangePosArr(
    pos: number,
    changePos: number,
    index: number,
  ): DotsPosChangeArray {
    const changeDots = [{ index, changePos }]
    const newChangePos = changePos
    ;[this.minRange, this.maxRange].forEach((isLimitRange?: number, rangeIndex?: number) => {
      if (!isLimitRange) {
        return false
      }
      const isMinRange = rangeIndex === 0
      const isForward = changePos > 0
      let next = 0
      if (isMinRange) {
        next = isForward ? 1 : -1
      } else {
        next = isForward ? -1 : 1
      }

      // Determine if the two positions are within the legal interval
      const inLimitRange = (pos2: number, pos1: number): boolean => {
        const diff = Math.abs(pos2 - pos1)
        return isMinRange ? diff < this.minRangeDir : diff > this.maxRangeDir
      }

      let i = index + next
      let nextPos = this.dotsPos[i]
      let curPos = pos
      while (this.isPos(nextPos) && inLimitRange(nextPos, curPos)) {
        const { pos: lastPos } = this.getValidPos(nextPos + newChangePos, i)
        changeDots.push({
          index: i,
          changePos: lastPos - nextPos,
        })
        i = i + next
        curPos = lastPos
        nextPos = this.dotsPos[i]
      }
    })

    return this.dotsPos.map((_, i) => {
      const changeDot = changeDots.filter(dot => dot.index === i)
      return changeDot.length ? changeDot[0].changePos : 0
    })
  }

  private isPos(pos: any): boolean {
    return typeof pos === 'number'
  }

  /**
   * Get a valid position by pos
   *
   * @param {number} pos
   * @param {number} index
   * @returns {{ pos: number, inRange: boolean }}
   */
  getValidPos(pos: number, index: number): { pos: number; inRange: boolean } {
    const range = this.valuePosRange[index]
    let inRange = true
    if (pos < range[0]) {
      pos = range[0]
      inRange = false
    } else if (pos > range[1]) {
      pos = range[1]
      inRange = false
    }
    return {
      pos,
      inRange,
    }
  }

  /**
   * Calculate the position of the slider by value
   *
   * @param {Value} val
   * @returns {number}
   */
  parseValue(val: Value): number {
    if (this.data) {
      val = this.data.indexOf(val)
    } else if (typeof val === 'number' || typeof val === 'string') {
      val = +val
      if (val < this.min) {
        this.emitError(ERROR_TYPE.MIN)
        return 0
      }
      if (val > this.max) {
        this.emitError(ERROR_TYPE.MAX)
        return 0
      }
      if (typeof val !== 'number' || val !== val) {
        this.emitError(ERROR_TYPE.VALUE)
        return 0
      }
      val = new Decimal(val)
        .minus(this.min)
        .divide(this.interval)
        .toNumber()
    }

    const pos = new Decimal(val).multiply(this.gap).toNumber()
    return pos < 0 ? 0 : pos > 100 ? 100 : pos
  }

  /**
   * Calculate the value by position
   *
   * @param {number} pos
   * @returns {Value}
   * @memberof Control
   */
  parsePos(pos: number): Value {
    const index = Math.round(pos / this.gap)
    return this.getValueByIndex(index)
  }

  /**
   * Determine if the location is active
   *
   * @param {number} pos
   * @returns {boolean}
   * @memberof Control
   */
  isActiveByPos(pos: number): boolean {
    return this.processArray.some(([start, end]) => pos >= start && pos <= end)
  }

  /**
   * Get each value
   *
   * @returns {Value[]}
   * @memberof Control
   */
  getValues(): Value[] {
    if (this.data) {
      return this.data
    } else {
      return Array.from(new Array(this.total), (_, index) => {
        return new Decimal(index)
          .multiply(this.interval)
          .plus(this.min)
          .toNumber()
      }).concat([this.max])
    }
  }

  private emitError(type: ERROR_TYPE) {
    if (this.onError) {
      this.onError(type, ERROR_MSG[type])
    }
  }

  get processArray(): ProcessOption {
    if (this.process) {
      if (typeof this.process === 'function') {
        return this.process(this.dotsPos)
      } else if (this.dotsPos.length === 1) {
        return [[0, this.dotsPos[0]]]
      } else if (this.dotsPos.length > 1) {
        return [[Math.min(...this.dotsPos), Math.max(...this.dotsPos)]]
      }
    }

    return []
  }

  /**
   * The total number of values
   *
   * @type {number}
   * @memberof Control
   */
  get total(): number {
    let total = 0
    if (this.data) {
      total = this.data.length - 1
    } else {
      total = new Decimal(this.max)
        .minus(this.min)
        .divide(this.interval)
        .toNumber()
    }
    if (total - Math.floor(total) !== 0) {
      this.emitError(ERROR_TYPE.INTERVAL)
      return 0
    }
    return total
  }

  // Distance between each value
  get gap(): number {
    return 100 / this.total
  }

  // The minimum distance between the two sliders
  get minRangeDir(): number {
    return this.minRange ? this.minRange * this.gap : 0
  }

  // Maximum distance between the two sliders
  get maxRangeDir(): number {
    return this.maxRange ? this.maxRange * this.gap : 100
  }

  /**
   * Sliding range of each slider
   *
   * @type {Array<[number, number]>}
   * @memberof Control
   */
  get valuePosRange(): Array<[number, number]> {
    const dotsPos = this.dotsPos
    const valuePosRange: Array<[number, number]> = []

    dotsPos.forEach((pos, i) => {
      valuePosRange.push([
        Math.max(
          this.minRange ? this.minRangeDir * i : 0,
          !this.enableCross ? dotsPos[i - 1] || 0 : 0,
        ),
        Math.min(
          this.minRange ? 100 - this.minRangeDir * (dotsPos.length - 1 - i) : 100,
          !this.enableCross ? dotsPos[i + 1] || 100 : 100,
        ),
      ])
    })

    return valuePosRange
  }

  get dotsIndex(): number[] {
    return this.dotsValue.map(val => this.getIndexByValue(val))
  }
}
