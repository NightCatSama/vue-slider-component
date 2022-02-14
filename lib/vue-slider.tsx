import { Model, Prop, Watch } from 'vue-property-decorator'
import { Options, Vue } from 'vue-class-component'
import {
  Value,
  DataObject,
  Mark,
  Marks,
  MarksProp,
  Styles,
  DotOption,
  DotStyle,
  Dot,
  Direction,
  Position,
  ProcessProp,
  Process,
  TooltipProp,
  TooltipFormatter,
} from './typings'
import VueSliderDot from './vue-slider-dot'
import VueSliderMark from './vue-slider-mark'

import { getSize, getPos, getKeyboardHandleFunc, HandleFunction } from './utils'
import Decimal from './utils/decimal'
import Control, { ERROR_TYPE } from './utils/control'
import State, { StateMap } from './utils/state'

import './styles/slider.scss'

export const SliderState: StateMap = {
  None: 0,
  Drag: 1 << 1,
  Focus: 1 << 2,
}

const DEFAULT_SLIDER_SIZE = 4

@Options({
  name: 'VueSlider',
  emits: [
    'change',
    'drag-start',
    'dragging',
    'drag-end',
    'error',
    'update:modelValue',
    'focus',
    'blur',
  ],
  data() {
    return {
      control: null,
    }
  },
  components: {
    VueSliderDot,
    VueSliderMark,
  },
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

  @Prop({ default: 0 })
  modelValue!: Value | Value[]

  @Prop({ type: Boolean, default: false })
  silent!: boolean

  @Prop({
    default: 'ltr',
    validator: (dir: string) => ['ltr', 'rtl', 'ttb', 'btt'].indexOf(dir) > -1,
  })
  direction!: Direction

  @Prop({ type: [Number, String] }) width?: number | string

  @Prop({ type: [Number, String] }) height?: number | string

  // The size of the slider, optional [width, height] | size
  @Prop({ default: 14 })
  dotSize!: [number, number] | number

  // whether or not the slider should be fully contained within its containing element
  @Prop({ default: false })
  contained!: boolean

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

  @Prop({ type: Boolean, default: false })
  dragOnClick!: boolean

  // The duration of the slider slide, Unit second
  @Prop({ type: Number, default: 0.5 })
  duration!: number

  @Prop({ type: [Array, Object] }) vData?: Value[] | object[] | DataObject

  @Prop({ type: String, default: 'value' }) dataValue!: string

  @Prop({ type: String, default: 'label' }) dataLabel!: string

  @Prop({ type: Boolean, default: false })
  lazy!: boolean

  @Prop({
    type: String,
    validator: (val: string) => ['none', 'always', 'focus', 'hover', 'active'].indexOf(val) > -1,
    default: 'active',
  })
  tooltip!: TooltipProp

  @Prop({
    type: [String, Array],
    validator: (data: string | string[]) =>
      (Array.isArray(data) ? data : [data]).every(
        val => ['top', 'right', 'bottom', 'left'].indexOf(val) > -1,
      ),
  })
  tooltipPlacement?: Position | Position[]

  @Prop({ type: [String, Array, Function] })
  tooltipFormatter?: TooltipFormatter | TooltipFormatter[]

  // Keyboard control
  @Prop({ type: Boolean, default: true })
  useKeyboard?: boolean

  // Keyboard controlled hook function
  @Prop(Function)
  keydownHook!: (e: KeyboardEvent) => HandleFunction | boolean

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

  // If the value is true , dot will automatically adsorb to the nearest value
  @Prop(Boolean) adsorb?: boolean

  @Prop(Boolean) hideLabel?: boolean

  @Prop() dotOptions?: DotOption | DotOption[]

  @Prop() dotAttrs?: object

  @Prop() railStyle?: Styles

  @Prop() processStyle?: Styles

  @Prop() dotStyle?: Styles

  @Prop() tooltipStyle?: Styles

  @Prop() stepStyle?: Styles

  @Prop() stepActiveStyle?: Styles

  @Prop() labelStyle?: Styles

  @Prop() labelActiveStyle?: Styles

  get tailSize() {
    return getSize((this.isHorizontal ? this.height : this.width) || DEFAULT_SLIDER_SIZE)
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
      ? getSize(this.width)
      : this.isHorizontal
      ? 'auto'
      : getSize(DEFAULT_SLIDER_SIZE)
    const containerHeight = this.height
      ? getSize(this.height)
      : this.isHorizontal
      ? getSize(DEFAULT_SLIDER_SIZE)
      : 'auto'
    return {
      padding: this.contained
        ? `${dotHeight / 2}px ${dotWidth / 2}px`
        : this.isHorizontal
        ? `${dotHeight / 2}px 0`
        : `0 ${dotWidth / 2}px`,
      width: containerWidth,
      height: containerHeight,
    }
  }

  get processArray(): Process[] {
    return this.control.processArray.map(([start, end, style], index) => {
      if (start > end) {
        ;[start, end] = [end, start]
      }
      const sizeStyleKey = this.isHorizontal ? 'width' : 'height'
      return {
        start,
        end,
        index,
        style: {
          [this.isHorizontal ? 'height' : 'width']: '100%',
          [this.isHorizontal ? 'top' : 'left']: 0,
          [this.mainDirection]: `${start}%`,
          [sizeStyleKey]: `${end - start}%`,
          transitionProperty: `${sizeStyleKey},${this.mainDirection}`,
          transitionDuration: `${this.animateTime}s`,
          ...this.processStyle,
          ...style,
        },
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
        transform: `translate(${this.isReverse ? '50%' : '-50%'}, -50%)`,
        WebkitTransform: `translate(${this.isReverse ? '50%' : '-50%'}, -50%)`,
        top: '50%',
        [this.direction === 'ltr' ? 'left' : 'right']: '0',
      }
    } else {
      dotPos = {
        transform: `translate(-50%, ${this.isReverse ? '50%' : '-50%'})`,
        WebkitTransform: `translate(-50%, ${this.isReverse ? '50%' : '-50%'})`,
        left: '50%',
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
      return this.dots.map(() => dir)
    }
  }

  get dots(): Dot[] {
    return this.control.dotsPos.map((pos, index) => ({
      pos,
      index,
      value: this.control.dotsValue[index],
      focus: this.states.has(SliderState.Focus) && this.focusDotIndex === index,
      disabled: this.disabled,
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

  isObjectData(data?: Value[] | object[] | DataObject): data is DataObject {
    return !!data && Object.prototype.toString.call(data) === '[object Object]'
  }

  isObjectArrayData(data?: Value[] | object[] | DataObject): data is object[] {
    return !!data && Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
  }

  get sliderData(): undefined | Value[] {
    if (this.isObjectArrayData(this.vData)) {
      return (this.vData as any[]).map(obj => obj[this.dataValue])
    } else if (this.isObjectData(this.vData)) {
      return Object.keys(this.vData)
    } else {
      return this.vData as Value[]
    }
  }

  get sliderMarks(): undefined | MarksProp {
    if (this.marks) {
      return this.marks
    } else if (this.isObjectArrayData(this.vData)) {
      return val => {
        const mark = { label: val }
        ;(this.vData as any[]).some(obj => {
          if (obj[this.dataValue] === val) {
            mark.label = obj[this.dataLabel]
            return true
          }
          return false
        })
        return mark
      }
    } else if (this.isObjectData(this.vData)) {
      return this.vData
    }
  }

  get sliderTooltipFormatter(): undefined | TooltipFormatter | TooltipFormatter[] {
    if (this.tooltipFormatter) {
      return this.tooltipFormatter
    } else if (this.isObjectArrayData(this.vData)) {
      return val => {
        let tooltipText = '' + val
        ;(this.vData as any[]).some(obj => {
          if (obj[this.dataValue] === val) {
            tooltipText = obj[this.dataLabel]
            return true
          }
          return false
        })
        return tooltipText
      }
    } else if (this.isObjectData(this.vData)) {
      const data = this.vData
      return val => data[val]
    }
  }

  @Watch('modelValue')
  onValueChanged() {
    if (this.control && !this.states.has(SliderState.Drag) && this.isNotSync) {
      this.control.setValue(this.modelValue)
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
    document.removeEventListener('mousedown', this.blurHandle)
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
      value: this.modelValue,
      data: this.sliderData,
      enableCross: this.enableCross,
      fixed: this.fixed,
      max: this.max,
      min: this.min,
      interval: this.interval,
      minRange: this.minRange,
      maxRange: this.maxRange,
      order: this.order,
      marks: this.sliderMarks,
      included: this.included,
      process: this.process,
      adsorb: this.adsorb,
      dotOptions: this.dotOptions,
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
      'adsorb',
      'included',
      'dotOptions',
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
        switch (name) {
          case 'data':
          case 'dataLabel':
          case 'dataValue':
            this.control.data = this.sliderData
            break
          case 'mark':
            this.control.marks = this.sliderMarks
            break
          default:
            ;(this.control as any)[name] = val
        }
        if (['data', 'max', 'min', 'interval'].indexOf(name) > -1) {
          this.control.syncDotsPos()
        }
      })
    })
  }

  private syncValueByPos() {
    const values = this.control.dotsValue
    if (this.isDiff(values, Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue])) {
      const newValue = values.length === 1 ? values[0] : [...values]
      this.$emit('change', newValue, this.focusDotIndex)
      this.$emit('update:modelValue', newValue)
    }
  }

  // Slider value and component internal value are inconsistent
  private get isNotSync() {
    const values = this.control.dotsValue
    return Array.isArray(this.modelValue)
      ? this.modelValue.length !== values.length ||
          this.modelValue.some((val, index) => val !== values[index])
      : this.modelValue !== values[0]
  }

  private isDiff(value1: Value[], value2: Value[]) {
    return value1.length !== value2.length || value1.some((val, index) => val !== value2[index])
  }

  private emitError(type: ERROR_TYPE, message: string) {
    if (!this.silent) {
      console.error(`[VueSlider error]: ${message}`)
    }
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

  private dragStartOnProcess(e: MouseEvent | TouchEvent) {
    if (this.dragOnClick) {
      this.setScale()
      const pos = this.getPosByEvent(e)
      const index = this.control.getRecentDot(pos)
      if (this.dots[index].disabled) {
        return
      }
      this.dragStart(index)
      this.control.setDotPos(pos, this.focusDotIndex)
      if (!this.lazy) {
        this.syncValueByPos()
      }
    }
  }

  private dragStart(index: number) {
    this.focusDotIndex = index
    this.setScale()
    this.states.add(SliderState.Drag)
    this.states.add(SliderState.Focus)
    this.$emit('drag-start', this.focusDotIndex)
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
    this.$emit('dragging', value.length === 1 ? value[0] : [...value], this.focusDotIndex)
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
        const dotVm = (this.$refs as any)[`dot-${this.focusDotIndex}`]
        if (dotVm && dotVm.$el) {
          dotVm.$el.focus()
        }
        this.control.setDotPos(curPos, curIndex)
      }
    }
  }

  private dragEnd(e: MouseEvent | TouchEvent) {
    if (!this.states.has(SliderState.Drag)) {
      return false
    }

    setTimeout(() => {
      if (this.lazy) {
        this.syncValueByPos()
      }
      if (this.included && this.isNotSync) {
        this.control.setValue(this.modelValue)
      } else {
        // Sync slider position
        this.control.syncDotsPos()
      }
      this.states.delete(SliderState.Drag)
      // If useKeyboard is true, keep focus status after dragging
      if (!this.useKeyboard || 'targetTouches' in e) {
        this.states.delete(SliderState.Focus)
      }
      this.$emit('drag-end', this.focusDotIndex)
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
    this.$emit('blur')
  }

  private clickHandle(e: MouseEvent | TouchEvent) {
    if (!this.clickable || this.disabled) {
      return false
    }
    if (this.states.has(SliderState.Drag)) {
      return
    }
    this.setScale()
    const pos = this.getPosByEvent(e)
    this.setValueByPos(pos)
  }

  focus(dot: Dot, index: number = 0) {
    if (dot.disabled) return
    this.states.add(SliderState.Focus)
    this.focusDotIndex = index
    this.$emit('focus')
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

  setValue(value: Value | Value[]) {
    this.control.setValue(Array.isArray(value) ? [...value] : [value])
    this.syncValueByPos()
  }

  setIndex(index: number | number[]) {
    const value = Array.isArray(index)
      ? index.map(n => this.control.getValueByIndex(n))
      : this.control.getValueByIndex(index)
    this.setValue(value)
  }

  setValueByPos(pos: number) {
    const index = this.control.getRecentDot(pos)
    if (this.disabled || this.dots[index].disabled) {
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
        this.control.setValue(this.modelValue)
      } else {
        this.control.syncDotsPos()
      }
    })
  }

  keydownHandle(e: KeyboardEvent) {
    if (!this.useKeyboard || !this.states.has(SliderState.Focus)) {
      return false
    }

    const isInclude = this.included && this.marks
    const handleFunc = getKeyboardHandleFunc(e, {
      direction: this.direction,
      max: isInclude ? this.control.markList.length - 1 : this.control.total,
      min: 0,
      hook: this.keydownHook,
    })

    if (handleFunc) {
      e.preventDefault()
      let newIndex = -1
      let pos = 0
      if (isInclude) {
        this.control.markList.some((mark, index) => {
          if (mark.value === this.control.dotsValue[this.focusDotIndex]) {
            newIndex = handleFunc(index)
            return true
          }
          return false
        })
        if (newIndex < 0) {
          newIndex = 0
        } else if (newIndex > this.control.markList.length - 1) {
          newIndex = this.control.markList.length - 1
        }
        pos = this.control.markList[newIndex].pos
      } else {
        newIndex = handleFunc(
          this.control.getIndexByValue(this.control.dotsValue[this.focusDotIndex]),
        )
        pos = this.control.parseValue(this.control.getValueByIndex(newIndex))
      }
      this.isCrossDot(pos)
      this.control.setDotPos(pos, this.focusDotIndex)
      this.syncValueByPos()
    }
  }

  private getPosByEvent(e: MouseEvent | TouchEvent): number {
    return getPos(e, this.$el, this.isReverse)[this.isHorizontal ? 'x' : 'y'] / this.scale
  }

  private renderSlot<T>(name: string, data: T, defaultSlot: any): any {
    const scopedSlot = this.$slots[name]
    return scopedSlot ? scopedSlot(data) : defaultSlot
  }

  render() {
    return (
      <div
        ref="container"
        class={this.containerClasses}
        style={this.containerStyles}
        onClick={this.clickHandle}
        onTouchstart={this.dragStartOnProcess}
        onMousedown={this.dragStartOnProcess}
        {...this.$attrs}
      >
        {/* rail */}
        <div class="vue-slider-rail" style={this.railStyle}>
          {this.processArray.map((item, index) =>
            this.renderSlot<Process>(
              'process',
              item,
              <div class="vue-slider-process" key={`process-${index}`} style={item.style} />,
            ),
          )}
          {/* mark */}
          {this.sliderMarks ? (
            <div class="vue-slider-marks">
              {this.control.markList.map((mark, index) => {
                const stepSlot = this.renderSlot<Mark>('step', mark, null)
                const labelSlot = this.renderSlot<Mark>('label', mark, null)
                return this.renderSlot<Mark>(
                  'mark',
                  mark,
                  <vue-slider-mark
                    key={`mark-${index}`}
                    mark={mark}
                    hideLabel={this.hideLabel}
                    style={{
                      [this.isHorizontal ? 'height' : 'width']: '100%',
                      [this.isHorizontal ? 'width' : 'height']: this.tailSize,
                      [this.mainDirection]: `${mark.pos}%`,
                    }}
                    stepStyle={this.stepStyle}
                    stepActiveStyle={this.stepActiveStyle}
                    labelStyle={this.labelStyle}
                    labelActiveStyle={this.labelActiveStyle}
                    onPressLabel={(pos: number) => this.clickable && this.setValueByPos(pos)}
                    stepSlot={stepSlot}
                    labelSlot={labelSlot}
                  />,
                )
              })}
            </div>
          ) : null}
          {/* dot */}
          {this.dots.map((dot, index) => {
            const dotSlot = this.renderSlot<Dot>('dot', dot, null)
            const tooltipSlot = this.renderSlot<Dot>('tooltip', dot, null)
            return (
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
                tooltip-formatter={
                  Array.isArray(this.sliderTooltipFormatter)
                    ? this.sliderTooltipFormatter[index]
                    : this.sliderTooltipFormatter
                }
                tooltip-placement={this.tooltipDirections[index]}
                style={[
                  this.dotBaseStyle,
                  {
                    [this.mainDirection]: `${dot.pos}%`,
                    transition: `${this.mainDirection} ${this.animateTime}s`,
                  },
                ]}
                onDragStart={() => this.dragStart(index)}
                role="slider"
                aria-valuenow={dot.value}
                aria-valuemin={this.min}
                aria-valuemax={this.max}
                aria-orientation={this.isHorizontal ? 'horizontal' : 'vertical'}
                tabindex="0"
                onFocus={() => this.focus(dot, index)}
                onBlur={() => this.blur()}
                {...{ attrs: this.dotAttrs }}
                dotSlot={dotSlot}
                tooltipSlot={tooltipSlot}
              />
            )
          })}
          {this.renderSlot<any>('default', { value: this.getValue() }, null)}
        </div>
      </div>
    )
  }
}
