import { Component, Model, Prop, Watch, Vue } from 'vue-property-decorator'
import {
  TValue,
  Mark,
  MarksProp,
  Styles,
  DotOption,
  DotStyle,
  Dot,
  TDirection,
  ProcessProp,
} from './typings'
import VueSliderDot from './vue-slider-dot'
import VueSliderMark from './vue-slider-mark'

import { toPx, getPos, getKeyboardHandleFunc } from './utils'
import Decimal from './utils/decimal'
import Control, { ERROR_TYPE } from './utils/control'
import State, { StateMap } from './utils/state'

import './styles/slider.scss'

export const SliderState: StateMap = {
  None: 0,
  Drag: 1 << 0,
  FOCUS: 2 << 0,
}

const DEFAULT_SLIDER_SIZE = 4

@Component({
  data() {
    return {
      control: null,
    }
  },
  components: {
    VueSliderDot,
    VueSliderMark,
  },
  inheritAttrs: false,
})
export default class VueSlider extends Vue {
  private control!: Control // 滑块逻辑控制
  private states: State = new State(SliderState) // 组件状态
  private scale: number = 1 // 比例，1% = ${scale}px

  focusDotIndex: number = 0

  $refs!: {
    container: HTMLDivElement
  }

  // slider value
  @Model('change', { default: 0 })
  value!: TValue | TValue[]

  // display of the component
  @Prop({ type: Boolean, default: true })
  show!: boolean

  // component width
  @Prop(Number) width?: number

  // component height
  @Prop(Number) height?: number

  // the size of the slider, optional [width, height] | size
  @Prop({ default: 14 })
  dotSize!: [number, number] | number

  // the direction of the slider
  @Prop({ default: 'ltr', validator: dir => ['ltr', 'rtl', 'ttb', 'btt'].indexOf(dir) > -1 })
  direction!: TDirection

  // 最小值
  @Prop({ type: Number, default: 0 })
  min!: number

  // 最小值
  @Prop({ type: Number, default: 100 })
  max!: number

  // 间隔
  @Prop({ type: Number, default: 1 })
  interval!: number

  // 运动速度
  @Prop({ type: Number, default: 0.5 })
  speed!: number

  // 是否禁用滑块
  @Prop() disabled?: boolean

  // 自定义数据
  @Prop(Array) data!: TValue[] | null

  // 是否懒同步值
  @Prop({ type: Boolean, default: false })
  lazy!: boolean

  // 是否支持键盘控制
  @Prop({ type: Boolean, default: true })
  useKeyboard?: boolean

  // 每次触发键盘控制，值的变化量
  @Prop({
    type: Array,
    default: () => [(index: number) => index - 1, (index: number) => index + 1],
  })
  actionsKeyboard!: [(index: number) => number, (index: number) => number]

  // 是否允许滑块交叉，仅限 range 模式
  @Prop({ type: Boolean, default: true })
  enableCross!: boolean

  // 是否固定滑块见间隔，仅限 range 模式
  @Prop({ type: Boolean, default: false })
  fixed!: boolean

  // 是否排序值，仅限 range 模式，且当设置 minRange, fixed = true 或者 enableCross = false 后失效
  // e.g. 当 order = false 时，[50, 30] 不会自动排序成 [30, 50]
  @Prop({ type: Boolean, default: true })
  order!: boolean

  // 滑块之间的最小距离，仅限 range 模式
  @Prop(Number) minRange?: number

  // 滑块之间的最大距离，仅限 range 模式
  @Prop(Number) maxRange?: number

  // tail style
  @Prop() tailStyle?: Styles

  // process style
  @Prop() processStyle?: Styles

  // 滑块样式
  @Prop() dotStyle?: DotStyle

  // 滑块的配置
  @Prop() dotOptions?: DotOption | DotOption[]

  // 自定义process
  @Prop(Function) process?: ProcessProp

  // 显示标识
  @Prop([Boolean, Object, Array, Function])
  marks?: MarksProp

  // 仅限 marks 不为空时有效，控制滑块是否只在 step 上有效
  @Prop(Boolean) included?: boolean

  // 是否隐藏 label
  @Prop(Boolean) hideLabel?: boolean

  // step style
  @Prop() stepStyle?: Styles

  // step active style
  @Prop() stepActiveStyle?: Styles

  // label style
  @Prop() labelStyle?: Styles

  // label active style
  @Prop() labelActiveStyle?: Styles

  // 轨道尺寸
  get tailSize() {
    return (this.isHorizontal ? this.height : this.width) || DEFAULT_SLIDER_SIZE
  }

  // 容器类
  get containerClasses() {
    return [
      'vue-slider',
      [`vue-slider-${this.direction}`],
      {
        'vue-slider-disabled': this.disabled,
      },
    ]
  }

  // 容器样式
  get containerStyles() {
    const [dotWidth, dotHeight] = Array.isArray(this.dotSize)
      ? this.dotSize
      : [this.dotSize, this.dotSize]
    const containerWidth = this.width
      ? toPx(this.width)
      : this.isHorizontal
      ? 'auto'
      : toPx(DEFAULT_SLIDER_SIZE)
    const containerHeight = this.height
      ? toPx(this.height)
      : this.isHorizontal
      ? toPx(DEFAULT_SLIDER_SIZE)
      : 'auto'
    return {
      padding: `${dotHeight / 2}px ${dotWidth / 2}px`,
      width: containerWidth,
      height: containerHeight,
    }
  }

  // 进度条样式数组
  get processBaseStyleArray(): Styles[] {
    return this.control.processArray.map(([start, end, style]) => {
      if (start > end) {
        /* tslint:disable:semicolon */
        ;[start, end] = [end, start]
      }
      const sizeStyleKey = this.isHorizontal ? 'width' : 'height'
      return {
        [this.isHorizontal ? 'height' : 'width']: '100%',
        [this.isHorizontal ? 'top' : 'left']: 0,
        [this.mainDirection]: `${start}%`,
        [sizeStyleKey]: `${end - start}%`,
        transitionProperty: `${sizeStyleKey},${this.mainDirection}`,
        transitionDuration: `${this.animateTime}s`,
        ...style,
      }
    })
  }

  // dot style
  get dotBaseStyle() {
    const [dotWidth, dotHeight] = Array.isArray(this.dotSize)
      ? this.dotSize
      : [this.dotSize, this.dotSize]
    let dotPos: { [key: string]: string }
    if (this.isHorizontal) {
      dotPos = {
        marginTop: `-${(dotHeight - this.tailSize) / 2}px`,
        [this.direction === 'ltr' ? 'marginLeft' : 'marginRight']: `-${dotWidth / 2}px`,
        top: '0',
        [this.direction === 'ltr' ? 'left' : 'right']: '0',
      }
    } else {
      dotPos = {
        marginLeft: `-${(dotWidth - this.tailSize) / 2}px`,
        [this.direction === 'btt' ? 'marginBottom' : 'marginTop']: `-${dotHeight / 2}px`,
        left: '0',
        [this.direction === 'btt' ? 'bottom' : 'top']: '0',
      }
    }
    return {
      width: `${dotWidth}px`,
      height: `${dotHeight}px`,
      ...dotPos,
    }
  }

  // 滑块滑动的主方向
  get mainDirection(): string {
    switch (this.direction) {
      case 'ltr':
        return 'left'
      case 'rtl':
        return 'right'
      case 'btt':
        return 'bottom'
      case 'ttb':
        return 'top'
    }
  }

  // 是否水平方向组件
  get isHorizontal(): boolean {
    return this.direction === 'ltr' || this.direction === 'rtl'
  }

  // 是否反向
  get isReverse(): boolean {
    return this.direction === 'rtl' || this.direction === 'btt'
  }

  // 得到所有的滑块
  get dots(): Dot[] {
    return this.control.dotsPos.map((pos, index) => ({
      pos,
      value: this.control.dotsValue[index],
      focus: this.states.has(SliderState.FOCUS) && this.focusDotIndex === index,
      disabled: false,
      ...this.dotStyle,
      ...((Array.isArray(this.dotOptions) ? this.dotOptions[index] : this.dotOptions) || {}),
    }))
  }

  // 滑块动画过渡时间
  get animateTime(): number {
    if (this.states.has(SliderState.Drag)) {
      return 0
    }
    return this.speed
  }

  // 是否可以排序
  get canOrder(): boolean {
    return this.order && !this.minRange && !this.fixed && this.enableCross
  }

  @Watch('value')
  onValueChanged() {
    if (!this.states.has(SliderState.Drag) && this.isDiff) {
      this.control.setValue(this.value)
    }
  }

  created() {
    this.initControl()
  }

  mounted() {
    this.bindEvent()
  }

  beforeDestroy() {
    this.unbindEvent()
  }

  bindEvent() {
    document.addEventListener('touchmove', this.dragMove, { passive: false })
    document.addEventListener('touchend', this.dragEnd, { passive: false })
    document.addEventListener('mousedown', this.isBlurSlider)
    document.addEventListener('mousemove', this.dragMove)
    document.addEventListener('mouseup', this.dragEnd)
    document.addEventListener('mouseleave', this.dragEnd)
    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('keyup', this.handleKeyup)
  }

  unbindEvent() {
    document.removeEventListener('touchmove', this.dragMove)
    document.removeEventListener('touchend', this.dragEnd)
    document.removeEventListener('mousemove', this.dragMove)
    document.removeEventListener('mouseup', this.dragEnd)
    document.removeEventListener('mouseleave', this.dragEnd)
    document.removeEventListener('keydown', this.handleKeydown)
    document.removeEventListener('keyup', this.handleKeyup)
  }

  // 获取组件比例
  setScale() {
    this.scale = new Decimal(
      Math.floor(this.isHorizontal ? this.$el.offsetWidth : this.$el.offsetHeight),
    )
      .divide(100)
      .toNumber()
  }

  // 初始化
  initControl() {
    this.control = new Control({
      value: this.value,
      data: this.data,
      enableCross: this.enableCross,
      fixed: this.fixed,
      max: this.max,
      min: this.min,
      interval: this.interval,
      minRange: this.minRange,
      maxRange: this.maxRange,
      order: this.order,
      marks: this.marks,
      onError: this.emitError,
      process: this.process,
    })
  }

  // 判断滑块是否禁用状态
  isDisabledByDotIndex(index: number): boolean {
    return this.dots[index].disabled
  }

  // 同步值
  private syncValueByPos() {
    let values = this.control.dotsValue
    if (this.included && this.control.markList.length > 0) {
      const getRecentValue = (val: TValue) => {
        let curValue = val
        let dir = this.max - this.min
        this.control.markList.forEach(mark => {
          if (typeof mark.value === 'number' && typeof val === 'number') {
            const curDir = Math.abs(mark.value - val)
            if (curDir < dir) {
              dir = curDir
              curValue = mark.value
            }
          }
        })
        return curValue
      }
      values = values.map(val => getRecentValue(val))
    }
    if (this.isDiff) {
      this.$emit('change', values.length === 1 ? values[0] : values)
    }
  }

  // 判断当前值和组件内部值是否不一致
  private get isDiff() {
    const values = this.control.dotsValue
    return Array.isArray(this.value)
      ? this.value.some((val, index) => val !== values[index])
      : this.value !== values[0]
  }

  // 返回错误
  private emitError(type: ERROR_TYPE, message: string) {
    this.$emit('error', {
      type,
      message,
    })
  }

  /**
   * 得到滑块的拖拽范围
   *
   * @private
   * @param {number} index 滑块索引
   * @returns {[number, number]} 范围 [start, end]
   * @memberof VueSlider
   */
  private get dragRange(): [number, number] {
    const prevDot = this.dots[this.focusDotIndex - 1]
    const nextDot = this.dots[this.focusDotIndex + 1]
    return [prevDot ? prevDot.pos : -Infinity, nextDot ? nextDot.pos : Infinity]
  }

  // 拖拽开始
  private dragStart(index: number) {
    this.focusDotIndex = index
    this.setScale()
    this.states.add(SliderState.Drag)
    this.states.add(SliderState.FOCUS)
    this.$emit('dragStart')
  }

  // 拖拽中
  private dragMove(e: MouseEvent | TouchEvent) {
    if (!this.states.has(SliderState.Drag)) {
      return false
    }
    e.preventDefault()
    const pos = this.getPosByEvent(e)
    // 如果组件是排序的，那当滑块交叉时，切换当前选中的滑块索引
    if (this.canOrder) {
      const curIndex = this.focusDotIndex
      let curPos = pos
      if (curPos > this.dragRange[1]) {
        curPos = this.dragRange[1]
        this.focusDotIndex++
      } else if (curPos < this.dragRange[0]) {
        curPos = this.dragRange[0]
        this.focusDotIndex--
      }
      if (curIndex !== this.focusDotIndex) {
        this.control.setDotPos(curPos, curIndex)
      }
    }
    this.control.setDotPos(pos, this.focusDotIndex)
    if (!this.lazy) {
      this.syncValueByPos()
    }
    this.$emit('dragging')
  }

  // 拖拽结束
  private dragEnd() {
    if (this.canOrder) {
      this.control.sortDotsPos()
    }
    if (this.lazy) {
      this.syncValueByPos()
    }

    setTimeout(() => {
      // included = true 的情况下，拖拽完毕需强制更新组件内部值
      if (this.included && this.isDiff) {
        this.control.setValue(this.value)
      } else {
        // 拖拽完毕后同步滑块的位置
        this.control.syncDotsPos()
      }

      this.states.delete(SliderState.Drag)
      // 仅当支持键盘操作模式时，拖拽完毕后保留 FOCUS 状态
      if (!this.useKeyboard) {
        this.states.delete(SliderState.FOCUS)
      }
      this.$emit('dragEnd')
    })
  }

  // 判断组件是否失去焦点
  private isBlurSlider(e: MouseEvent) {
    if (
      !this.states.has(SliderState.FOCUS) ||
      !this.$refs.container ||
      this.$refs.container.contains(e.target as Node)
    ) {
      return false
    }
    this.states.delete(SliderState.FOCUS)
  }

  // 处理点击事件
  private clickHandle(e: MouseEvent | TouchEvent) {
    if (this.states.has(SliderState.Drag)) {
      return
    }
    this.setScale()
    const pos = this.getPosByEvent(e)
    const index = this.control.getRecentDot(pos)
    if (this.isDisabledByDotIndex(index)) {
      return false
    }
    this.focusDotIndex = index
    this.control.setDotPos(pos, index)
    this.syncValueByPos()

    if (this.useKeyboard) {
      this.states.add(SliderState.FOCUS)
    }

    setTimeout(() => {
      // 拖拽完毕后同步滑块的位置
      this.control.syncDotsPos()
    })
  }

  // TODO: 处理键盘按键按下
  handleKeydown(e: KeyboardEvent) {
    if (!this.useKeyboard || !this.states.has(SliderState.FOCUS)) {
      return false
    }
    const handleFunc = getKeyboardHandleFunc(e)
  }

  // 处理键盘按键弹起
  handleKeyup(e: KeyboardEvent) {
    if (!this.useKeyboard || !this.states.has(SliderState.FOCUS)) {
      return false
    }
  }

  // 获取鼠标的位置
  private getPosByEvent(e: MouseEvent | TouchEvent): number {
    return (
      getPos(e, this.$el as HTMLDivElement, this.isReverse)[this.isHorizontal ? 'x' : 'y'] /
      this.scale
    )
  }

  // 渲染 slot
  private renderSlot<T>(name: string, data: T, defaultSlot: any): any {
    return this.$scopedSlots[name] ? this.$scopedSlots[name](data) : defaultSlot
  }

  render() {
    return (
      <div
        v-show={this.show}
        ref="container"
        class={this.containerClasses}
        style={this.containerStyles}
        aria-hidden={true}
        onClick={this.clickHandle}
      >
        {/* rail */}
        <div class="vue-slider-rail" style={this.tailStyle}>
          {this.processBaseStyleArray.map((baseStyle, index) => (
            <div
              class="vue-slider-process"
              key={`process-${index}`}
              style={[baseStyle, this.processStyle]}
            />
          ))}
          {/* mark */}
          {this.marks ? (
            <div class="vue-slider-marks">
              {this.control.markList.map(mark =>
                this.renderSlot<Mark>(
                  'mark',
                  mark,
                  <vue-slider-mark
                    mark={mark}
                    hideLabel={this.hideLabel}
                    style={{
                      [this.isHorizontal ? 'height' : 'width']: '100%',
                      [this.isHorizontal ? 'width' : 'height']: `${this.tailSize}px`,
                      [this.mainDirection]: `${mark.pos}%`,
                    }}
                    stepStyle={this.stepStyle}
                    stepActiveStyle={this.stepActiveStyle}
                    labelStyle={this.labelStyle}
                    labelActiveStyle={this.labelActiveStyle}
                  >
                    {this.renderSlot<Mark>('step', mark, null)}
                    {this.renderSlot<Mark>('label', mark, null)}
                  </vue-slider-mark>,
                ),
              )}
            </div>
          ) : null}
          {/* dot */}
          {this.dots.map((dot, index) => (
            <vue-slider-dot
              ref={`dot-${index}`}
              key={`dot-${index}`}
              dotSize={this.dotSize}
              value={dot.pos}
              disabled={dot.disabled}
              focus={dot.focus}
              dot-style={[
                dot.style,
                dot.disabled ? dot.disabledStyle : null,
                dot.focus ? dot.focusStyle : null,
              ]}
              style={[
                this.dotBaseStyle,
                {
                  [this.mainDirection]: `${dot.pos}%`,
                  transition: `${this.mainDirection} ${this.animateTime}s`,
                },
              ]}
              onDragStart={() => this.dragStart(index)}
            >
              {this.renderSlot<Dot>('dot', dot, null)}
            </vue-slider-dot>
          ))}
        </div>
        {/* Support screen readers */}
        {this.dots.length === 1 && !this.data ? (
          <input
            class="vue-slider-sr-only"
            type="range"
            value={this.value}
            min={this.min}
            max={this.max}
          />
        ) : null}
      </div>
    )
  }
}
