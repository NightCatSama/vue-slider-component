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

// 每个滑块变化的距离
type DotsPosChangeArray = number[]

// 错误类型
export const enum ERROR_TYPE {
  VALUE = 1, // 值的类型不正确
  INTERVAL, // interval 不合法
  MIN, // 超过最小值
  MAX,
  ORDER, // 当 order 为 false 时，minRange, maxRange, enableCross, fixed 失效
}

// 错误消息
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
 * 组件的逻辑控制中心
 *
 * @export
 * @class Control
 */
export default class Control {
  dotsPos: number[] = [] // 每个滑块的位置
  dotsValue: Value[] = [] // 每个滑块的值

  private data: Value[] | null
  private enableCross: boolean
  private fixed: boolean
  private max: number
  private min: number
  private interval: number
  private minRange: number
  private maxRange: number
  private order: boolean
  private marks?: MarksProp
  private process?: ProcessProp
  private onError?: (type: ERROR_TYPE, message: string) => void

  constructor(options: {
    value: Value | Value[]
    data: Value[] | null
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
      this.fixed = true
    }
    this.setValue(options.value)
  }

  /**
   * 设置滑块的值
   *
   * @param {(Value | Value[])} value
   * @memberof Control
   */
  setValue(value: Value | Value[]) {
    this.dotsValue = Array.isArray(value) ? value : [value]
    this.syncDotsPos()
  }

  /**
   * 设置滑块位置
   * @param {number[]} dotsPos 滑块位置的数组
   */
  setDotsPos(dotsPos: number[]) {
    // 只排序值不排序位置，在拖拽完成后再调用[syncDotsPos]排序位置
    const list = this.order ? [...dotsPos].sort((a, b) => a - b) : dotsPos
    this.dotsPos = list
    this.dotsValue = list.map(dotPos => this.parsePos(dotPos))
  }

  /**
   * 排序滑块位置
   *
   * @memberof Control
   */
  sortDotsPos() {
    this.dotsPos = [...this.dotsPos].sort((a, b) => a - b)
  }

  /**
   * 同步滑块位置
   *
   * @memberof Control
   */
  syncDotsPos() {
    this.dotsPos = this.dotsValue.map(v => this.parseValue(v))
  }

  /**
   * 得到所有标志
   *
   * @readonly
   * @type {Mark[]}
   * @memberof Control
   */
  get markList(): Mark[] {
    if (!this.marks) {
      return []
    }

    // 通过值获取 Mark
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
   * 通过位置得到最近的一个滑块索引
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
   * 通过值得到索引
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
   * 通过索引得到值
   *
   * @param {index} number
   * @returns {Value}
   * @memberof Control
   */
  getValueByIndex(index: number): Value {
    return this.data
      ? this.data[index]
      : new Decimal(index)
          .multiply(this.interval)
          .plus(this.min)
          .toNumber()
  }

  /**
   * 设置单个滑块的位置
   *
   * @param {number} pos 滑块在组件中的位置
   * @param {number} index 滑块的索引
   */
  setDotPos(pos: number, index: number) {
    // 滑块变化的距离
    pos = this.getValidPos(pos, index).pos
    const changePos = pos - this.dotsPos[index]

    // 没有变化则不更新位置
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
   * 在 fixed 模式下，得到全部滑块变化的位置
   *
   * @param {number} changePos 单个滑块的变化距离
   * @param {number} index 滑块的索引
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
   * 在 minRange/maxRange 模式下，得到全部滑块变化的位置
   *
   * @param {number} pos 单个滑块的位置
   * @param {number} changePos 单个滑块的变化距离
   * @param {number} index 滑块的索引
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
      // 是否在限制的范围中
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
      const changeDot = changeDots.find(dot => dot.index === i)
      return changeDot ? changeDot.changePos : 0
    })
  }

  private isPos(pos: any): boolean {
    return typeof pos === 'number'
  }

  /**
   * 得到最后滑块位置
   *
   * @param {number} newPos 新的滑块位置
   * @param {number} index 滑块索引
   * @returns {{ pos: number, inRange: boolean }}
   */
  getValidPos(newPos: number, index: number): { pos: number; inRange: boolean } {
    const range = this.valuePosRange[index]
    let pos = newPos
    let inRange = true
    if (newPos < range[0]) {
      pos = range[0]
      inRange = false
    } else if (newPos > range[1]) {
      pos = range[1]
      inRange = false
    }
    return {
      pos,
      inRange,
    }
  }

  /**
   * 根据值计算出滑块的位置
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
      val = new Decimal(val)
        .minus(this.min)
        .divide(this.interval)
        .toNumber()
    }

    if (typeof val !== 'number') {
      this.emitError(ERROR_TYPE.VALUE)
      return 0
    }

    const pos = new Decimal(val).multiply(this.gap).toNumber()
    return pos < 0 ? 0 : pos > 100 ? 100 : pos
  }

  /**
   * 通过位置计算出值
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
   * 判断该位置是否激活状态
   *
   * @param {number} pos
   * @returns {boolean}
   * @memberof Control
   */
  isActiveByPos(pos: number): boolean {
    return this.processArray.some(([start, end]) => pos >= start && pos <= end)
  }

  /**
   * 获得每个值
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

  /**
   * 获得每个值的位置
   *
   * @private
   * @returns {number[]}
   * @memberof Control
   */
  private geValuePos(): number[] {
    const gap = this.gap
    return Array.from(new Array(this.total), (_, index) => {
      return new Decimal(index).multiply(gap).toNumber()
    }).concat([100])
  }

  /**
   * 返回错误
   *
   * @private
   * @param {ERROR_TYPE} type 错误类型
   * @memberof Control
   */
  private emitError(type: ERROR_TYPE) {
    if (this.onError) {
      this.onError(type, ERROR_MSG[type])
    }
  }

  /**
   * 进度条数组
   *
   * @readonly
   * @type {ProcessOption}
   * @memberof Control
   */
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
   * 值的总个数
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

  /**
   * 每个可用值之间的距离
   *
   * @type {number}
   * @memberof Control
   */
  get gap(): number {
    return 100 / this.total
  }

  /**
   * 两个滑块最小的距离
   *
   * @type {number}
   * @memberof Control
   */
  get minRangeDir(): number {
    return this.minRange ? this.minRange * this.gap : 0
  }

  /**
   * 两个滑块最大的距离
   *
   * @type {number}
   * @memberof Control
   */
  get maxRangeDir(): number {
    return this.maxRange ? this.maxRange * this.gap : 100
  }

  /**
   * 每个滑块的滑动范围
   *
   * @type {Array<[number, number]>}
   * @memberof Control
   */
  get valuePosRange(): Array<[number, number]> {
    const dotsPos = this.dotsPos
    const valuePosRange: Array<[number, number]> = []

    dotsPos.forEach((pos, i) => {
      valuePosRange.push([
        this.minRange ? this.minRangeDir * i : !this.enableCross ? dotsPos[i - 1] || 0 : 0,
        this.minRange
          ? 100 - this.minRangeDir * (dotsPos.length - 1 - i)
          : !this.enableCross
          ? dotsPos[i + 1] || 100
          : 100,
      ])
    })

    return valuePosRange
  }
}
