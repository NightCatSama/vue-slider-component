<template>
  <div
    ref="container"
    :class="containerClasses"
    :style="containerStyles"
    @click="clickHandle"
    @touchstart.passive="dragStartOnProcess"
    @mousedown.passive="dragStartOnProcess"
    v-bind="$attrs"
  >
    <!-- rail -->
    <div class="vue-slider-rail" :style="railStyle">
      <!-- process -->
      <slot
        name="process"
        v-for="(item, index) in processArray"
        v-bind="item"
      >
        <div
          class="vue-slider-process"
          :key="`process-${index}`"
          :style="item.style"
        />
      </slot>
      <!-- mark -->
      <div v-if="sliderMarks && control" class="vue-slider-marks">
        <slot
          name="mark"
          v-for="(mark, index) in control.markList"
          v-bind="mark"
        >
          <vue-slider-mark
            :key="`mark-${index}`"
            :mark="mark"
            :hideLabel="hideLabel"
            :style="{
              [isHorizontal ? 'height' : 'width']: '100%',
              [isHorizontal ? 'width' : 'height']: tailSize,
              [mainDirection]: `${mark.pos}%`,
            }"
            :stepStyle="stepStyle"
            :stepActiveStyle="stepActiveStyle"
            :labelStyle="labelStyle"
            :labelActiveStyle="labelActiveStyle"
            @press-label="(pos: number) => clickable && setValueByPos(pos)"
          >
            <template v-slot:step><slot name="step" v-bind="mark"></slot></template>
            <template v-slot:label><slot name="label" v-bind="mark"></slot></template>
          </vue-slider-mark>
        </slot>
      </div>
      <!-- dot -->
      <vue-slider-dot
        v-for="(dot, index) in dots"
        :ref="`dot-${index}`"
        :key="`dot-${index}`"
        :value="dot.value"
        :disabled="dot.disabled"
        :focus="dot.focus"
        :dot-style="[
          dot.style,
          dot.disabled ? dot.disabledStyle : null,
          dot.focus ? dot.focusStyle : null,
        ]"
        :tooltip="dot.tooltip || tooltip"
        :tooltip-style="[
          tooltipStyle,
          dot.tooltipStyle,
          dot.disabled ? dot.tooltipDisabledStyle : null,
          dot.focus ? dot.tooltipFocusStyle : null,
        ]"
        :tooltip-formatter="
          Array.isArray(sliderTooltipFormatter)
            ? sliderTooltipFormatter[index]
            : sliderTooltipFormatter
        "
        :tooltip-placement="tooltipDirections[index]"
        :style="[
          dotBaseStyle,
          {
            [mainDirection]: `${dot.pos}%`,
            transition: `${mainDirection} ${animateTime}s`,
          },
        ]"
        @drag-start="() => dragStart(index)"
        role="slider"
        :aria-valuenow="dot.value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-orientation="isHorizontal ? 'horizontal' : 'vertical'"
        tabindex="0"
        @focus="() => focus(dot, index)"
        @blur="() => blur()"
        v-bind="dotAttrs"
      >
        <template v-slot:dot><slot name="dot" v-bind="dot"></slot></template>
        <template v-slot:tooltip><slot name="tooltip" v-bind="dot"></slot></template>
      </vue-slider-dot>
    </div>
    <slot :value="getValue()"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import VueSliderDot from './vue-slider-dot.vue'
import VueSliderMark from './vue-slider-mark.vue'
import {
  Value,
  DataObject,
  MarksProp,
  Styles,
  DotOption,
  Dot,
  Direction,
  Position,
  ProcessProp,
  Process,
  TooltipProp,
  TooltipFormatter,
} from './typings'
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

export default defineComponent({
  name: 'VueSlider',
  components: {
    VueSliderDot,
    VueSliderMark,
  },
  emits: ['change', 'drag-start', 'dragging', 'drag-end', 'error', 'update:modelValue'],
  data() {
    return {
      control: null as (Control | null),
      states: new State(SliderState),
      // The width of the component is divided into one hundred, the width of each one.
      scale: 1,
      // Currently dragged slider index
      focusDotIndex: 0,
    }
  },
  props: {
    modelValue: {
      type: [Number, String, Array] as PropType<Value | Value[]>,
      default: 0 as Value,
    },

    silent: { type: Boolean, default: false },

    direction: {
      type: String as PropType<Direction>,
      default: 'ltr',
      validator: (dir: Direction) => ['ltr', 'rtl', 'ttb', 'btt'].indexOf(dir) > -1,
    },

    width: { type: [Number, String] },

    height: { type: [Number, String] },

    // The size of the slider, optional [width, height] | size
    dotSize: {
      type: [Number, Array] as PropType<number | [number, number]>,
      default: 14 as number
    },

    // whether or not the slider should be fully contained within its containing element
    contained: { type: Boolean, default: false },

    min: { type: Number, default: 0 },

    max: { type: Number, default: 100 },

    interval: { type: Number, default: 1 },

    disabled: { type: Boolean, default: false },

    clickable: { type: Boolean, default: true },

    dragOnClick: { type: Boolean, default: false },

    duration: { type: Number, default: 0.5 },

    data: {
      type: [Object, Array] as PropType<Value[] | object[] | DataObject>,
    },

    dataValue: { type: String, default: 'value' },

    dataLabel: { type: String, default: 'label' },

    lazy: { type: Boolean, default: false },

    tooltip: {
      type: String as PropType<TooltipProp>,
      default: 'active' as TooltipProp,
      validator: (val: string) => ['none', 'always', 'focus', 'hover', 'active'].indexOf(val) > -1,
    },

    tooltipPlacement: {
      type: [String, Array] as PropType<Position | Position[]>,
      validator: (val: string | string[]) => (Array.isArray(val) ? val : [val]).every(
        val => ['top', 'right', 'bottom', 'left'].indexOf(val) > -1,
      ),
    },

    tooltipFormatter: {
      type: [String, Array, Function] as PropType<TooltipFormatter | TooltipFormatter[]>,
    },

    // Keyboard control
    useKeyboard: { type: Boolean, default: true },

    // Keyboard controlled hook function
    keydownHook: {
      // eslint-disable-next-line no-unused-vars
      type: Function as PropType<(e: KeyboardEvent) => HandleFunction | boolean>,
    },

    // Whether to allow sliders to cross, only in range mode
    enableCross: { type: Boolean, default: true },

    // Whether to fix the slider interval, only in range mode
    fixed: { type: Boolean, default: false },

    // Whether to sort values, only in range mode
    // When order is false, the parameters [minRange, maxRange, fixed, enableCross] are invalid
    // e.g. When order = false, [50, 30] will not be automatically sorted into [30, 50]
    order: { type: Boolean, default: true },

    // Minimum distance between sliders, only in range mode
    minRange: { type: Number },

    // Maximum distance between sliders, only in range mode
    maxRange: { type: Number },

    marks: {
      type: [Boolean, Object, Array, Function] as PropType<MarksProp>,
      default: false as MarksProp,
    },

    process: {
      type: [Boolean, Function] as PropType<ProcessProp>,
      default: true as ProcessProp,
    },

    zoom: { type: Number },

    // If the value is true , mark will be an independent value
    included: { type: Boolean },

    // If the value is true , dot will automatically adsorb to the nearest value
    adsorb: { type: Boolean },

    hideLabel: { type: Boolean },

    // Slider settings, multiple sliders can be distinguished by array type.
    dotOptions: {
      type: [Object, Array] as PropType<DotOption | DotOption[]>,
    },

    // Set custom attributes on the slider.
    dotAttrs: { type: Object },

    railStyle: { type: Object as PropType<Styles> },

    processStyle: { type: Object as PropType<Styles> },

    dotStyle: { type: Object as PropType<Styles> },

    tooltipStyle: { type: Object as PropType<Styles> },

    stepStyle: { type: Object as PropType<Styles> },

    stepActiveStyle: { type: Object as PropType<Styles> },

    labelStyle: { type: Object as PropType<Styles> },

    labelActiveStyle: { type: Object as PropType<Styles> },
  },
  computed: {
    isHorizontal(): boolean {
      return this.direction === 'ltr' || this.direction === 'rtl'
    },
    isReverse(): boolean {
      return this.direction === 'rtl' || this.direction === 'btt'
    },
    tailSize() {
      return getSize((this.isHorizontal ? this.height : this.width) || DEFAULT_SLIDER_SIZE)
    },
    containerClasses() {
      return [
        'vue-slider',
        [`vue-slider-${this.direction}`],
        {
          'vue-slider-disabled': this.disabled,
        },
      ]
    },
    containerStyles() {
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
    },
    processArray(): Process[] {
      return this.control!!.processArray.map(([start, end, style], index) => {
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
    },
    dotBaseStyle() {
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
    },
    mainDirection(): string {
      switch (this.direction) {
        case 'ltr':
          return 'left'
        case 'rtl':
          return 'right'
        case 'btt':
          return 'bottom'
        case 'ttb':
          return 'top'
        default:
          return 'left'
      }
    },
    tooltipDirections(): Position[] {
      const dir = this.tooltipPlacement || (this.isHorizontal ? 'top' : 'left')
      if (Array.isArray(dir)) {
        return dir
      } else {
        return this.dots.map(() => dir)
      }
    },
    dots(): Dot[] {
      return this.control!!.dotsPos.map((pos, index) => ({
        pos,
        index,
        value: this.control!!.dotsValue[index],
        focus: this.states.has(SliderState.Focus) && this.focusDotIndex === index,
        disabled: this.disabled,
        style: this.dotStyle,
        ...((Array.isArray(this.dotOptions) ? this.dotOptions[index] : this.dotOptions) || {}),
      }))
    },
    animateTime(): number {
      if (this.states.has(SliderState.Drag)) {
        return 0
      }
      return this.duration
    },
    canSort(): boolean {
      return this.order && !this.minRange && !this.maxRange && !this.fixed && this.enableCross
    },
    sliderData(): undefined | Value[] {
      if (this.isObjectArrayData(this.data)) {
        return (this.data as any[]).map(obj => obj[this.dataValue])
      } else if (this.isObjectData(this.data)) {
        return Object.keys(this.data)
      } else {
        return this.data as Value[]
      }
    },
    sliderMarks(): MarksProp | undefined {
      if (this.marks) {
        return this.marks
      } else if (this.isObjectArrayData(this.data)) {
        return val => {
          const mark = { label: val }
          ;(this.data as any[]).some(obj => {
            if (obj[this.dataValue] === val) {
              mark.label = obj[this.dataLabel]
              return true
            }
            return false
          })
          return mark
        }
      } else if (this.isObjectData(this.data)) {
        return this.data
      } else {
        return void 0;
      }
    },
    sliderTooltipFormatter(): TooltipFormatter | TooltipFormatter[] | undefined {
      if (this.tooltipFormatter) {
        return this.tooltipFormatter
      } else if (this.isObjectArrayData(this.data)) {
        return val => {
          let tooltipText = '' + val
          ;(this.data as any[]).some(obj => {
            if (obj[this.dataValue] === val) {
              tooltipText = obj[this.dataLabel]
              return true
            }
            return false
          })
          return tooltipText
        }
      } else if (this.isObjectData(this.data)) {
        const data = this.data
        return val => data[val]
      } else {
        return void 0;
      }
    },
    // Slider value and component internal value are inconsistent
    isNotSync() {
      const values = this.control!!.dotsValue
      return Array.isArray(this.modelValue)
        ? this.modelValue.length !== values.length ||
            this.modelValue.some((val, index) => val !== values[index])
        : this.modelValue !== values[0]
    },
    /**
     * Get the drag range of the slider
     *
     * @private
     * @param {number} index slider index
     * @returns {[number, number]} range [start, end]
     * @memberof VueSlider
     */
    dragRange(): [number, number] {
      const prevDot = this.dots[this.focusDotIndex - 1]
      const nextDot = this.dots[this.focusDotIndex + 1]
      return [prevDot ? prevDot.pos : -Infinity, nextDot ? nextDot.pos : Infinity]
    }
  },
  watch: {
    modelValue() {
      if (this.control! && !this.states.has(SliderState.Drag) && this.isNotSync) {
        this.control!.setValue(this.modelValue)
      }
    }
  },
  methods: {
    isObjectData(data?: Value[] | object[] | DataObject): data is DataObject {
      return !!data && Object.prototype.toString.call(data) === '[object Object]'
    },
    isObjectArrayData(data?: Value[] | object[] | DataObject): data is object[] {
      return !!data && Array.isArray(data) && data.length > 0 && typeof data[0] === 'object'
    },
    bindEvent() {
      document.addEventListener('touchmove', this.dragMove, { passive: false })
      document.addEventListener('touchend', this.dragEnd, { passive: false })
      document.addEventListener('mousedown', this.blurHandle)
      document.addEventListener('mousemove', this.dragMove)
      document.addEventListener('mouseup', this.dragEnd)
      document.addEventListener('mouseleave', this.dragEnd)
      document.addEventListener('keydown', this.keydownHandle)
    },
    unbindEvent() {
      document.removeEventListener('touchmove', this.dragMove)
      document.removeEventListener('touchend', this.dragEnd)
      document.removeEventListener('mousedown', this.blurHandle)
      document.removeEventListener('mousemove', this.dragMove)
      document.removeEventListener('mouseup', this.dragEnd)
      document.removeEventListener('mouseleave', this.dragEnd)
      document.removeEventListener('keydown', this.keydownHandle)
    },
    setScale() {
      this.scale = new Decimal(
        Math.floor(this.isHorizontal ? this.$el.offsetWidth : this.$el.offsetHeight),
      )
        .multiply(this.zoom || 1)
        .divide(100)
        .toNumber()
    },
    initControl() {
      this.control! = new Control({
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
            Array.isArray(this.control!.data) &&
            Array.isArray(val) &&
            this.control!.data.length === val.length &&
            val.every((item, index) => item === (this.control!.data as Value[])[index])
          ) {
            return false
          }
          switch (name) {
            case 'data':
            case 'dataLabel':
            case 'dataValue':
              this.control!.data = this.sliderData
              break
            case 'mark':
              this.control!.marks = this.sliderMarks
              break
            default:
              ;(this.control! as any)[name] = val
          }
          if (['data', 'max', 'min', 'interval'].indexOf(name) > -1) {
            this.control!.syncDotsPos()
          }
        })
      })
    },
    syncValueByPos() {
      const values = this.control!.dotsValue
      if (this.isDiff(values, Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue])) {
        const newValue = values.length === 1 ? values[0] : [...values]
        this.$emit('change', newValue, this.focusDotIndex)
        this.$emit('update:modelValue', newValue)
      }
    },
    isDiff(value1: Value[], value2: Value[]) {
      return value1.length !== value2.length || value1.some((val, index) => val !== value2[index])
    },
    emitError(type: ERROR_TYPE, message: string) {
      if (!this.silent) {
        console.error(`[VueSlider error]: ${message}`)
      }
      this.$emit('error', type, message)
    },
    dragStartOnProcess(e: MouseEvent | TouchEvent) {
      if (this.dragOnClick) {
        this.setScale()
        const pos = this.getPosByEvent(e)
        const index = this.control!.getRecentDot(pos)
        if (this.dots[index].disabled) {
          return
        }
        this.dragStart(index)
        this.control!.setDotPos(pos, this.focusDotIndex)
        if (!this.lazy) {
          this.syncValueByPos()
        }
      }
    },
    dragStart(index: number) {
      this.focusDotIndex = index
      this.setScale()
      this.states.add(SliderState.Drag)
      this.states.add(SliderState.Focus)
      this.$emit('drag-start', this.focusDotIndex)
    },
    dragMove(e: MouseEvent | TouchEvent) {
      if (!this.states.has(SliderState.Drag)) {
        return false
      }
      e.preventDefault()
      const pos = this.getPosByEvent(e)
      this.isCrossDot(pos)
      this.control!.setDotPos(pos, this.focusDotIndex)
      if (!this.lazy) {
        this.syncValueByPos()
      }
      const value = this.control!.dotsValue
      this.$emit('dragging', value.length === 1 ? value[0] : [...value], this.focusDotIndex)
    },
    // If the component is sorted, then when the slider crosses, toggle the currently selected slider index
    isCrossDot(pos: number) {
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
          this.control!.setDotPos(curPos, curIndex)
        }
      }
    },
    dragEnd(e: MouseEvent | TouchEvent) {
      if (!this.states.has(SliderState.Drag)) {
        return false
      }

      setTimeout(() => {
        if (this.lazy) {
          this.syncValueByPos()
        }
        if (this.included && this.isNotSync) {
          this.control!.setValue(this.modelValue)
        } else {
          // Sync slider position
          this.control!.syncDotsPos()
        }
        this.states.delete(SliderState.Drag)
        // If useKeyboard is true, keep focus status after dragging
        if (!this.useKeyboard || 'targetTouches' in e) {
          this.states.delete(SliderState.Focus)
        }
        this.$emit('drag-end', this.focusDotIndex)
      })
    },
    blurHandle(e: MouseEvent) {
      if (
        !this.states.has(SliderState.Focus) ||
        !this.$refs.container ||
        (this.$refs.container as HTMLDivElement).contains(e.target as Node)
      ) {
        return false
      }
      this.states.delete(SliderState.Focus)
    },
    clickHandle(e: MouseEvent | TouchEvent) {
      if (!this.clickable || this.disabled) {
        return false
      }
      if (this.states.has(SliderState.Drag)) {
        return
      }
      this.setScale()
      const pos = this.getPosByEvent(e)
      this.setValueByPos(pos)
    },
    focus(dot: Dot, index: number = 0) {
      if (dot.disabled) return
      this.states.add(SliderState.Focus)
      this.focusDotIndex = index
    },
    blur() {
      this.states.delete(SliderState.Focus)
    },
    getValue() {
      const values = this.control!.dotsValue
      return values.length === 1 ? values[0] : values
    },
    getIndex() {
      const indexes = this.control!.dotsIndex
      return indexes.length === 1 ? indexes[0] : indexes
    },
    setValue(value: Value | Value[]) {
      this.control!.setValue(Array.isArray(value) ? [...value] : [value])
      this.syncValueByPos()
    },
    setIndex(index: number | number[]) {
      const value = Array.isArray(index)
        ? index.map(n => this.control!.getValueByIndex(n))
        : this.control!.getValueByIndex(index)
      this.setValue(value)
    },
    setValueByPos(pos: number) {
      const index = this.control!.getRecentDot(pos)
      if (this.disabled || this.dots[index].disabled) {
        return false
      }
      this.focusDotIndex = index
      this.control!.setDotPos(pos, index)
      this.syncValueByPos()

      if (this.useKeyboard) {
        this.states.add(SliderState.Focus)
      }

      setTimeout(() => {
        if (this.included && this.isNotSync) {
          this.control!.setValue(this.modelValue)
        } else {
          this.control!.syncDotsPos()
        }
      })
    },
    keydownHandle(e: KeyboardEvent) {
      if (!this.useKeyboard || !this.states.has(SliderState.Focus)) {
        return false
      }

      const isInclude = this.included && this.marks
      const handleFunc = getKeyboardHandleFunc(e, {
        direction: this.direction,
        max: isInclude ? this.control!.markList.length - 1 : this.control!.total,
        min: 0,
        hook: this.keydownHook,
      })

      if (handleFunc) {
        e.preventDefault()
        let newIndex = -1
        let pos = 0
        if (isInclude) {
          this.control!.markList.some((mark, index) => {
            if (mark.value === this.control!.dotsValue[this.focusDotIndex]) {
              newIndex = handleFunc(index)
              return true
            }
            return false
          })
          if (newIndex < 0) {
            newIndex = 0
          } else if (newIndex > this.control!.markList.length - 1) {
            newIndex = this.control!.markList.length - 1
          }
          pos = this.control!.markList[newIndex].pos
        } else {
          newIndex = handleFunc(
            this.control!.getIndexByValue(this.control!.dotsValue[this.focusDotIndex]),
          )
          pos = this.control!.parseValue(this.control!.getValueByIndex(newIndex))
        }
        this.isCrossDot(pos)
        this.control!.setDotPos(pos, this.focusDotIndex)
        this.syncValueByPos()
      }
    },
    getPosByEvent(e: MouseEvent | TouchEvent): number {
      return getPos(e, this.$el, this.isReverse, this.zoom)[this.isHorizontal ? 'x' : 'y'] / this.scale
    },
    renderSlot<T>(name: string, data: T, defaultSlot: any): any {
      const scopedSlot = this.$slots[name]
      return scopedSlot ? scopedSlot(data) : defaultSlot
    }
  },
  created() {
    this.initControl()
  },
  mounted() {
    this.bindEvent()
  },
  beforeUnmount() {
    this.unbindEvent()
  },
})
</script>
