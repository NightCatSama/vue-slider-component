import { Component, Model, Prop, Watch, Vue } from 'vue-property-decorator'
import {
  Value,
  Mark,
  MarksProp,
  Styles,
  DotOption,
  DotStyle,
  Dot,
  Direction,
  Position,
  ProcessProp,
  TooltipProp,
  TooltipFormatter,
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
  Focus: 2 << 0,
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
  control!: Control
  states: State = new State(SliderState)
  // The width of the component is divided into one hundred, the width of each one.
  scale: number = 1
  // Currently dragged slider index
  focusDotIndex: number = 0

  $refs!: {
    container: HTMLDivElement
  }

  $el!: HTMLDivElement

  @Model('change', { default: 0 })
  value!: Value | Value[]

  @Prop({
    default: 'ltr',
    validator: dir => ['ltr', 'rtl', 'ttb', 'btt'].indexOf(dir) > -1,
  })
  direction!: Direction

  @Prop(Number) width?: number

  @Prop(Number) height?: number

  // The size of the slider, optional [width, height] | size
  @Prop({ default: 14 })
  dotSize!: [number, number] | number

  @Prop({ type: Number, default: 0 })
  min!: number

  @Prop({ type: Number, default: 100 })
  max!: number

  @Prop({ type: Number, default: 1 })
  interval!: number

  @Prop({ type: Boolean, default: false })
  disabled!: boolean

  @Prop({ type: Boolean, default: true })
  clickable!: boolean

  // The duration of the slider slide, Unit second
  @Prop({ type: Number, default: 0.5 })
  duration!: number

  @Prop(Array) data?: Value[]

  @Prop({ type: Boolean, default: false })
  lazy!: boolean

  @Prop({
    type: String,
    validator: val => ['none', 'always', 'focus'].includes(val),
    default: 'focus',
  })
  tooltip!: TooltipProp

  @Prop({
    type: String,
    validator: val => ['top', 'right', 'bottom', 'left'].includes(val),
  })
  tooltipPlacement?: Position

  @Prop({ type: [String, Function] })
  tooltipFormatter?: TooltipFormatter

  // Keyboard control
  @Prop({ type: Boolean, default: false })
  useKeyboard?: boolean

  // Whether to allow sliders to cross, only in range mode
  @Prop({ type: Boolean, default: true })
  enableCross!: boolean

  // Whether to fix the slider interval, only in range mode
  @Prop({ type: Boolean, default: false })
  fixed!: boolean

  // Whether to sort values, only in range mode
  // When order is false, the parameters [minRange, maxRange, fixed, enableCross] are invalid
  // e.g. When order = false, [50, 30] will not be automatically sorted into [30, 50]
  @Prop({ type: Boolean, default: true })
  order!: boolean

  // Minimum distance between sliders, only in range mode
  @Prop(Number) minRange?: number

  // Maximum distance between sliders, only in range mode
  @Prop(Number) maxRange?: number

  @Prop({ type: [Boolean, Object, Array, Function], default: false })
  marks?: MarksProp

  @Prop({ type: [Boolean, Function], default: true })
  process?: ProcessProp

  // If the value is true , mark will be an independent value
  @Prop(Boolean) included?: boolean

  @Prop(Boolean) hideLabel?: boolean

  @Prop() dotOptions?: DotOption | DotOption[]

  @Prop() railStyle?: Styles

  @Prop() processStyle?: Styles

  @Prop() dotStyle?: Styles

  @Prop() tooltipStyle?: Styles

  @Prop() stepStyle?: Styles

  @Prop() stepActiveStyle?: Styles

  @Prop() labelStyle?: Styles

  @Prop() labelActiveStyle?: Styles

  get tailSize() {
    return (this.isHorizontal ? this.height : this.width) || DEFAULT_SLIDER_SIZE
  }

  get containerClasses() {
    return [
      'vue-slider',
      [`vue-slider-${this.direction}`],
      {
        'vue-slider-disabled': this.disabled,
      },
    ]
  }

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

  get isHorizontal(): boolean {
    return this.direction === 'ltr' || this.direction === 'rtl'
  }

  get isReverse(): boolean {
    return this.direction === 'rtl' || this.direction === 'btt'
  }

  get tooltipDirections(): Position[] {
    const dir = this.tooltipPlacement || (this.isHorizontal ? 'top' : 'left')
    if (Array.isArray(dir)) {
      return dir
    } else {
      return Array.from(new Array(this.dots.length), () => dir)
    }
  }

  get dots(): Dot[] {
    return this.control.dotsPos.map((pos, index) => ({
      pos,
      index,
      value: this.control.dotsValue[index],
      focus: this.states.has(SliderState.Focus) && this.focusDotIndex === index,
      disabled: false,
      style: this.dotStyle,
      ...((Array.isArray(this.dotOptions) ? this.dotOptions[index] : this.dotOptions) || {}),
    }))
  }

  get animateTime(): number {
    if (this.states.has(SliderState.Drag)) {
      return 0
    }
    return this.duration
  }

  get canSort(): boolean {
    return this.order && !this.minRange && !this.maxRange && !this.fixed && this.enableCross
  }

  @Watch('value')
  onValueChanged() {
    if (!this.states.has(SliderState.Drag) && this.isNotSync) {
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
    document.addEventListener('mousedown', this.blurHandle)
    document.addEventListener('mousemove', this.dragMove)
    document.addEventListener('mouseup', this.dragEnd)
    document.addEventListener('mouseleave', this.dragEnd)
    document.addEventListener('keydown', this.keydownHandle)
  }

  unbindEvent() {
    document.removeEventListener('touchmove', this.dragMove)
    document.removeEventListener('touchend', this.dragEnd)
    document.removeEventListener('mousemove', this.dragMove)
    document.removeEventListener('mouseup', this.dragEnd)
    document.removeEventListener('mouseleave', this.dragEnd)
    document.removeEventListener('keydown', this.keydownHandle)
  }

  setScale() {
    this.scale = new Decimal(
      Math.floor(this.isHorizontal ? this.$el.offsetWidth : this.$el.offsetHeight),
    )
      .divide(100)
      .toNumber()
  }

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
      process: this.process,
      onError: this.emitError,
    })
    ;[
      'data',
      'enableCross',
      'fixed',
      'max',
      'min',
      'interval',
      'minRange',
      'maxRange',
      'order',
      'marks',
      'process',
    ].forEach(name => {
      this.$watch(name, (val: any) => {
        if (
          name === 'data' &&
          Array.isArray(this.control.data) &&
          Array.isArray(val) &&
          this.control.data.length === val.length &&
          val.every((item, index) => item === (this.control.data as Value[])[index])
        ) {
          return false
        }
        ;(this.control as any)[name] = val
        if (['data', 'max', 'min', 'interval'].includes(name)) {
          this.control.syncDotsPos()
        }
      })
    })
  }

  isDisabledByDotIndex(index: number): boolean {
    return this.dots[index].disabled
  }

  private syncValueByPos() {
    let values = this.control.dotsValue
    // When included is true, the return value is the value of the nearest mark
    if (this.included && this.control.markList.length > 0) {
      const getRecentValue = (val: Value) => {
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
    if (this.isDiff(values, Array.isArray(this.value) ? this.value : [this.value])) {
      this.$emit('change', values.length === 1 ? values[0] : [...values])
    }
  }

  // Slider value and component internal value are inconsistent
  private get isNotSync() {
    const values = this.control.dotsValue
    return Array.isArray(this.value)
      ? this.value.length !== values.length ||
          this.value.some((val, index) => val !== values[index])
      : this.value !== values[0]
  }

  private isDiff(value1: Value[], value2: Value[]) {
    return value1.length !== value2.length || value1.some((val, index) => val !== value2[index])
  }

  private emitError(type: ERROR_TYPE, message: string) {
    this.$emit('error', type, message)
  }

  /**
   * Get the drag range of the slider
   *
   * @private
   * @param {number} index slider index
   * @returns {[number, number]} range [start, end]
   * @memberof VueSlider
   */
  private get dragRange(): [number, number] {
    const prevDot = this.dots[this.focusDotIndex - 1]
    const nextDot = this.dots[this.focusDotIndex + 1]
    return [prevDot ? prevDot.pos : -Infinity, nextDot ? nextDot.pos : Infinity]
  }

  private dragStart(index: number) {
    this.focusDotIndex = index
    this.setScale()
    this.states.add(SliderState.Drag)
    this.states.add(SliderState.Focus)
    this.$emit('drag-start')
  }

  private dragMove(e: MouseEvent | TouchEvent) {
    if (!this.states.has(SliderState.Drag)) {
      return false
    }
    e.preventDefault()
    const pos = this.getPosByEvent(e)
    this.isCrossDot(pos)
    this.control.setDotPos(pos, this.focusDotIndex)
    if (!this.lazy) {
      this.syncValueByPos()
    }
    const value = this.control.dotsValue
    this.$emit('dragging', value.length === 1 ? value[0] : [...value])
  }

  // If the component is sorted, then when the slider crosses, toggle the currently selected slider index
  private isCrossDot(pos: number) {
    if (this.canSort) {
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
  }

  private dragEnd() {
    if (!this.states.has(SliderState.Drag)) {
      return false
    }
    if (this.lazy) {
      this.syncValueByPos()
    }

    setTimeout(() => {
      if (this.included && this.isNotSync) {
        this.control.setValue(this.value)
      } else {
        // Sync slider position
        this.control.syncDotsPos()
      }

      this.states.delete(SliderState.Drag)
      // If useKeyboard is true, keep focus status after dragging
      if (!this.useKeyboard) {
        this.states.delete(SliderState.Focus)
      }
      this.$emit('drag-end')
    })
  }

  private blurHandle(e: MouseEvent) {
    if (
      !this.states.has(SliderState.Focus) ||
      !this.$refs.container ||
      this.$refs.container.contains(e.target as Node)
    ) {
      return false
    }
    this.states.delete(SliderState.Focus)
  }

  private clickHandle(e: MouseEvent | TouchEvent) {
    if (!this.clickable) {
      return false
    }
    if (this.states.has(SliderState.Drag)) {
      return
    }
    this.setScale()
    const pos = this.getPosByEvent(e)
    this.setValueByPos(pos)
  }

  focus(index: number = 0) {
    this.states.add(SliderState.Focus)
    this.focusDotIndex = index
  }

  blur() {
    this.states.delete(SliderState.Focus)
  }

  getValue() {
    const values = this.control.dotsValue
    return values.length === 1 ? values[0] : values
  }

  getIndex() {
    const indexes = this.control.dotsIndex
    return indexes.length === 1 ? indexes[0] : indexes
  }

  setValueByPos(pos: number) {
    const index = this.control.getRecentDot(pos)
    if (this.isDisabledByDotIndex(index)) {
      return false
    }
    this.focusDotIndex = index
    this.control.setDotPos(pos, index)
    this.syncValueByPos()

    if (this.useKeyboard) {
      this.states.add(SliderState.Focus)
    }

    setTimeout(() => {
      if (this.included && this.isNotSync) {
        this.control.setValue(this.value)
      } else {
        this.control.syncDotsPos()
      }
    })
  }

  keydownHandle(e: KeyboardEvent) {
    if (!this.useKeyboard || !this.states.has(SliderState.Focus)) {
      return false
    }

    const handleFunc = getKeyboardHandleFunc(e, {
      direction: this.direction,
      max: this.control.total,
      min: 0,
    })

    if (handleFunc) {
      e.preventDefault()
      const index = this.control.getIndexByValue(this.control.dotsValue[this.focusDotIndex])
      const newIndex = handleFunc(index)
      const pos = this.control.parseValue(this.control.getValueByIndex(newIndex))
      this.isCrossDot(pos)
      this.control.setDotPos(pos, this.focusDotIndex)
      this.syncValueByPos()
    }
  }

  private getPosByEvent(e: MouseEvent | TouchEvent): number {
    return getPos(e, this.$el, this.isReverse)[this.isHorizontal ? 'x' : 'y'] / this.scale
  }

  private renderSlot<T>(name: string, data: T, defaultSlot: any, isDefault?: boolean): any {
    const scopedSlot = this.$scopedSlots[name]
    return scopedSlot ? (
      isDefault ? (
        scopedSlot(data)
      ) : (
        <template slot={name}>{scopedSlot(data)}</template>
      )
    ) : (
      defaultSlot
    )
  }

  render() {
    return (
      <div
        ref="container"
        class={this.containerClasses}
        style={this.containerStyles}
        aria-hidden={true}
        onClick={this.clickHandle}
      >
        {/* rail */}
        <div class="vue-slider-rail" style={this.railStyle}>
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
                    onPressLabel={(pos: number) => this.setValueByPos(pos)}
                  >
                    {this.renderSlot<Mark>('step', mark, null)}
                    {this.renderSlot<Mark>('label', mark, null)}
                  </vue-slider-mark>,
                  true,
                ),
              )}
            </div>
          ) : null}
          {/* dot */}
          {this.dots.map((dot, index) => (
            <vue-slider-dot
              ref={`dot-${index}`}
              key={`dot-${index}`}
              value={dot.value}
              disabled={dot.disabled}
              focus={dot.focus}
              dot-style={[
                dot.style,
                dot.disabled ? dot.disabledStyle : null,
                dot.focus ? dot.focusStyle : null,
              ]}
              tooltip={dot.tooltip || this.tooltip}
              tooltip-style={[
                this.tooltipStyle,
                dot.tooltipStyle,
                dot.disabled ? dot.tooltipDisabledStyle : null,
                dot.focus ? dot.tooltipFocusStyle : null,
              ]}
              tooltip-formatter={this.tooltipFormatter}
              tooltip-placement={this.tooltipDirections[index]}
              style={[
                this.dotBaseStyle,
                {
                  [this.mainDirection]: `${dot.pos}%`,
                  transition: `${this.mainDirection} ${this.animateTime}s`,
                },
              ]}
              onDrag-start={() => this.dragStart(index)}
            >
              {this.renderSlot<Dot>('dot', dot, null)}
              {this.renderSlot<Dot>('tooltip', dot, null)}
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
