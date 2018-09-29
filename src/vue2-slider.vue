<template>
  <div
    ref="wrap"
    :class="['vue-slider-component', flowDirection, disabledClass, stateClass, { 'vue-slider-has-label': piecewiseLabel }]"
    v-show="show"
    :style="[wrapStyles, boolDisabled ? disabledStyle : null]"
    @click="wrapClick"
  >
    <div ref="elem" aria-hidden="true" class="vue-slider" :style="[elemStyles, bgStyle]">
      <template v-if="isRange">
        <div
          ref="dot0"
          key="dot0"
          :class="[
            tooltipStatus,
            'vue-slider-dot',
            {
              'vue-slider-dot-focus': focusFlag && focusSlider === 0,
              'vue-slider-dot-dragging': flag && currentSlider === 0,
              'vue-slider-dot-disabled': !boolDisabled && disabledArray[0]
            }
          ]"
          :style="[
            dotStyles,
            (!boolDisabled && disabledArray[0]) ? disabledDotStyles[0] : null,
            sliderStyles[0], focusFlag && focusSlider === 0 ? focusStyles[0]
          : null]"
          @mousedown="moveStart($event, 0)"
          @touchstart="moveStart($event, 0)"
        >
          <div ref="tooltip0" :class="['vue-slider-tooltip-' + tooltipDirection[0], 'vue-slider-tooltip-wrap']">
            <slot name="tooltip" :value="val[0]" :index="0" :disabled="!boolDisabled && disabledArray[0]">
              <span class="vue-slider-tooltip" :style="tooltipStyles[0]">{{ formatter ? formatting(val[0]) : val[0] }}</span>
            </slot>
          </div>
        </div>
        <div
          ref="dot1"
          key="dot1"
          :class="[
            tooltipStatus,
            'vue-slider-dot',
            {
              'vue-slider-dot-focus': focusFlag && focusSlider === 1,
              'vue-slider-dot-dragging': flag && currentSlider === 1,
              'vue-slider-dot-disabled': !boolDisabled && disabledArray[1]
            }
          ]"
          :style="[
            dotStyles,
            (!boolDisabled && disabledArray[1]) ? disabledDotStyles[1] : null,
            sliderStyles[1], focusFlag && focusSlider === 1 ? focusStyles[1]
          : null]"
          @mousedown="moveStart($event, 1)"
          @touchstart="moveStart($event, 1)"
        >
          <div ref="tooltip1" :class="['vue-slider-tooltip-' + tooltipDirection[1], 'vue-slider-tooltip-wrap']">
            <slot name="tooltip" :value="val[1]" :index="1" :disabled="!boolDisabled && disabledArray[1]">
              <span class="vue-slider-tooltip" :style="tooltipStyles[1]">{{ formatter ? formatting(val[1]) : val[1] }}</span>
            </slot>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          ref="dot"
          key="dot"
          :class="[
            tooltipStatus,
            'vue-slider-dot',
            {
              'vue-slider-dot-focus': focusFlag && focusSlider === 0,
              'vue-slider-dot-dragging': flag && currentSlider === 0
            }
          ]"
          :style="[
            dotStyles,
            sliderStyles,
            focusFlag && focusSlider === 0 ? focusStyles : null
          ]"
          @mousedown="moveStart"
          @touchstart="moveStart"
        >
          <div :class="['vue-slider-tooltip-' + tooltipDirection, 'vue-slider-tooltip-wrap']">
            <slot name="tooltip" :value="val">
              <span class="vue-slider-tooltip" :style="tooltipStyles">{{ formatter ? formatting(val) : val }}</span>
            </slot>
          </div>
        </div>
      </template>
      <ul class="vue-slider-piecewise">
        <li v-for="(piecewiseObj, index) in piecewiseDotWrap" class="vue-slider-piecewise-item" :style="[piecewiseDotStyle, piecewiseObj.style]" :key="index">
          <slot
            name="piecewise"
            :label="piecewiseObj.label"
            :index="index"
            :first="index === 0"
            :last="index === piecewiseDotWrap.length - 1"
            :active="piecewiseObj.inRange"
          >
            <span
              v-if="piecewise"
              class="vue-slider-piecewise-dot"
              :style="[ piecewiseStyle, piecewiseObj.inRange ? piecewiseActiveStyle : null ]"
            ></span>
          </slot>

          <slot
            name="label"
            :label="piecewiseObj.label"
            :index="index"
            :first="index === 0"
            :last="index === piecewiseDotWrap.length - 1"
            :active="piecewiseObj.inRange"
          >
            <span
              v-if="piecewiseLabel"
              class="vue-slider-piecewise-label"
              :style="[ labelStyle, piecewiseObj.inRange ? labelActiveStyle : null ]"
            >
              {{ piecewiseObj.label }}
            </span>
          </slot>
        </li>
      </ul>
      <div
        ref="process"
        :class="['vue-slider-process', { 'vue-slider-process-dragable': isRange && processDragable }]"
        :style="processStyle"
        @click="processClick"
        @mousedown="moveStart($event, 0, true)"
        @touchstart="moveStart($event, 0, true)"
      >
      <div
        ref="mergedTooltip"
        :class="['vue-merged-tooltip', 'vue-slider-tooltip-' + tooltipDirection[0], 'vue-slider-tooltip-wrap']"
        :style="tooltipMergedPosition"
      >
          <slot name="tooltip" :value="val" :merge="true">
            <span class="vue-slider-tooltip" :style="tooltipStyles">
              {{ mergeFormatter ? mergeFormatting(val[0], val[1]) : (formatter ? (val[0] === val[1] ? formatting(val[0]) : `${formatting(val[0])} - ${formatting(val[1])}`) : (val[0] === val[1] ? val[0] : `${val[0]} - ${val[1]}`)) }}
            </span>
          </slot>
      </div>
    </div>
    <input v-if="!isRange && !data" class="vue-slider-sr-only" type="range" v-model="val" :min="min" :max="max" />
    </div>
  </div>
</template>
<script>
  // Unsharp text [#166](https://github.com/NightCatSama/vue-slider-component/issues/166)
  const roundToDPR = (function () {
    const r = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    return value => Math.round(value * r) / r
  })()

  export default {
    name: 'VueSliderComponent',
    props: {
      width: {
        type: [Number, String],
        default: 'auto'
      },
      height: {
        type: [Number, String],
        default: 6
      },
      data: {
        type: Array,
        default: null
      },
      dotSize: {
        type: Number,
        default: 16
      },
      dotWidth: {
        type: Number,
        required: false
      },
      dotHeight: {
        type: Number,
        required: false
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      interval: {
        type: Number,
        default: 1
      },
      show: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: [Boolean, Array],
        default: false
      },
      piecewise: {
        type: Boolean,
        default: false
      },
      tooltip: {
        type: [String, Boolean],
        default: 'always'
      },
      eventType: {
        type: String,
        default: 'auto'
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      reverse: {
        type: Boolean,
        default: false
      },
      lazy: {
        type: Boolean,
        default: false
      },
      clickable: {
        type: Boolean,
        default: true
      },
      speed: {
        type: Number,
        default: 0.5
      },
      realTime: {
        type: Boolean,
        default: false
      },
      stopPropagation: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number, Array, Object],
        default: 0
      },
      piecewiseLabel: {
        type: Boolean,
        default: false
      },
      debug: {
        type: Boolean,
        default: true
      },
      fixed: {
        type: Boolean,
        default: false
      },
      processDragable: {
        type: Boolean,
        default: false
      },
      useKeyboard: {
        type: Boolean,
        default: false
      },
      actionsKeyboard: {
        type: Array,
        default () {
          return [(i) => i - 1, (i) => i + 1]
        }
      },
      tooltipMerge: {
        type: Boolean,
        default: true
      },
      startAnimation: {
        type: Boolean,
        default: false
      },
      sliderStyle: [Array, Object, Function],
      focusStyle: [Array, Object, Function],
      tooltipDir: [Array, String],
      formatter: [String, Function],
      mergeFormatter: [String, Function],
      piecewiseStyle: Object,
      disabledStyle: Object,
      piecewiseActiveStyle: Object,
      processStyle: Object,
      bgStyle: Object,
      tooltipStyle: [Array, Object, Function],
      disabledDotStyle: [Array, Object, Function],
      labelStyle: Object,
      labelActiveStyle: Object
    },
    data () {
      return {
        flag: false,
        keydownFlag: null,
        focusFlag: false,
        processFlag: false,
        processSign: null,
        size: 0,
        fixedValue: 0,
        focusSlider: 0,
        currentValue: 0,
        currentSlider: 0,
        isComponentExists: true,
        isMounted: false
      }
    },
    computed: {
      dotWidthVal () {
        return typeof this.dotWidth === 'number' ? this.dotWidth : this.dotSize
      },
      dotHeightVal () {
        return typeof this.dotHeight === 'number' ? this.dotHeight : this.dotSize
      },
      flowDirection () {
        return `vue-slider-${this.direction + (this.reverse ? '-reverse' : '')}`
      },
      tooltipMergedPosition () {
        if (!this.isMounted) return {}

        const tooltipDirection = this.tooltipDirection[0]
        const dot0 = this.$refs.dot0

        if (dot0) {
          if (this.direction === 'vertical') {
            const style = {}
            style[tooltipDirection] = `-${(this.dotHeightVal / 2) - (this.width / 2) + 9}px`
            return style
          } else {
            const style = {}
            style[tooltipDirection] = `-${(this.dotWidthVal / 2) - (this.height / 2) + 9}px`
            style['left'] = `50%`
            return style
          }
        }
      },
      tooltipDirection () {
        let dir = this.tooltipDir || (this.direction === 'vertical' ? 'left' : 'top')
        if (Array.isArray(dir)) {
          return this.isRange ? dir : dir[1]
        } else {
          return this.isRange ? [dir, dir] : dir
        }
      },
      tooltipStatus () {
        return this.tooltip === 'hover' && this.flag ? 'vue-slider-always' : this.tooltip ? `vue-slider-${this.tooltip}` : ''
      },
      tooltipClass () {
        return [`vue-slider-tooltip-${this.tooltipDirection}`, 'vue-slider-tooltip']
      },
      disabledArray () {
        return Array.isArray(this.disabled) ? this.disabled : [this.disabled, this.disabled]
      },
      boolDisabled () {
        return this.disabledArray.every(b => b === true)
      },
      isDisabled () {
        return this.eventType === 'none' ? true : this.boolDisabled
      },
      disabledClass () {
        return this.boolDisabled ? 'vue-slider-disabled' : ''
      },
      stateClass () {
        return {
          'vue-slider-state-process-drag': this.processFlag,
          'vue-slider-state-drag': this.flag && !this.processFlag && !this.keydownFlag,
          'vue-slider-state-focus': this.focusFlag
        }
      },
      isRange () {
        return Array.isArray(this.value)
      },
      slider () {
        return this.isRange ? [this.$refs.dot0, this.$refs.dot1] : this.$refs.dot
      },
      minimum () {
        return this.data ? 0 : this.min
      },
      val: {
        get () {
          return this.data ? (this.isRange ? [this.data[this.currentValue[0]], this.data[this.currentValue[1]]] : this.data[this.currentValue]) : this.currentValue
        },
        set (val) {
          if (this.data) {
            if (this.isRange) {
              let index0 = this.data.indexOf(val[0])
              let index1 = this.data.indexOf(val[1])
              if (index0 > -1 && index1 > -1) {
                this.currentValue = [index0, index1]
              }
            } else {
              let index = this.data.indexOf(val)
              if (index > -1) {
                this.currentValue = index
              }
            }
          } else {
            this.currentValue = val
          }
        }
      },
      currentIndex () {
        if (this.isRange) {
          return this.data ? this.currentValue : [this.getIndexByValue(this.currentValue[0]), this.getIndexByValue(this.currentValue[1])]
        } else {
          return this.getIndexByValue(this.currentValue)
        }
      },
      indexRange () {
        if (this.isRange) {
          return this.currentIndex
        } else {
          return [0, this.currentIndex]
        }
      },
      maximum () {
        return this.data ? (this.data.length - 1) : this.max
      },
      multiple () {
        let decimals = `${this.interval}`.split('.')[1]
        return decimals ? Math.pow(10, decimals.length) : 1
      },
      spacing () {
        return this.data ? 1 : this.interval
      },
      total () {
        if (this.data) {
          return this.data.length - 1
        } else if (Math.floor((this.maximum - this.minimum) * this.multiple) % (this.interval * this.multiple) !== 0) {
          this.printError('Prop[interval] is illegal, Please make sure that the interval can be divisible')
        }
        return (this.maximum - this.minimum) / this.interval
      },
      gap () {
        return this.size / this.total
      },
      position () {
        return this.isRange ? [(this.currentValue[0] - this.minimum) / this.spacing * this.gap, (this.currentValue[1] - this.minimum) / this.spacing * this.gap] : ((this.currentValue - this.minimum) / this.spacing * this.gap)
      },
      limit () {
        return this.isRange ? this.fixed ? [[0, (this.total - this.fixedValue) * this.gap], [this.fixedValue * this.gap, this.size]] : [[0, this.position[1]], [this.position[0], this.size]] : [0, this.size]
      },
      valueLimit () {
        return this.isRange ? this.fixed ? [[this.minimum, this.maximum - (this.fixedValue * (this.spacing * this.multiple)) / this.multiple], [this.minimum + (this.fixedValue * (this.spacing * this.multiple)) / this.multiple, this.maximum]] : [[this.minimum, this.currentValue[1]], [this.currentValue[0], this.maximum]] : [this.minimum, this.maximum]
      },
      idleSlider () {
        return this.currentSlider === 0 ? 1 : 0
      },
      wrapStyles () {
        return this.direction === 'vertical' ? {
          height: typeof this.height === 'number' ? `${this.height}px` : this.height,
          padding: `${this.dotHeightVal / 2}px ${this.dotWidthVal / 2}px`
        } : {
          width: typeof this.width === 'number' ? `${this.width}px` : this.width,
          padding: `${this.dotHeightVal / 2}px ${this.dotWidthVal / 2}px`
        }
      },
      sliderStyles () {
        if (Array.isArray(this.sliderStyle)) {
          return this.isRange ? this.sliderStyle : this.sliderStyle[1]
        } else if (typeof this.sliderStyle === 'function') {
          return this.sliderStyle(this.val, this.currentIndex)
        } else {
          return this.isRange ? [this.sliderStyle, this.sliderStyle] : this.sliderStyle
        }
      },
      focusStyles () {
        if (Array.isArray(this.focusStyle)) {
          return this.isRange ? this.focusStyle : this.focusStyle[1]
        } else if (typeof this.focusStyle === 'function') {
          return this.focusStyle(this.val, this.currentIndex)
        } else {
          return this.isRange ? [this.focusStyle, this.focusStyle] : this.focusStyle
        }
      },
      disabledDotStyles () {
        const disabledStyle = this.disabledDotStyle
        if (Array.isArray(disabledStyle)) {
          return disabledStyle
        } else if (typeof disabledStyle === 'function') {
          const style = disabledStyle(this.val, this.currentIndex)
          return Array.isArray(style) ? style : [style, style]
        } else if (disabledStyle) {
          return [disabledStyle, disabledStyle]
        } else {
          return [{
            backgroundColor: '#ccc'
          }, {
            backgroundColor: '#ccc'
          }]
        }
      },
      tooltipStyles () {
        if (Array.isArray(this.tooltipStyle)) {
          return this.isRange ? this.tooltipStyle : this.tooltipStyle[1]
        } else if (typeof this.tooltipStyle === 'function') {
          return this.tooltipStyle(this.val, this.currentIndex)
        } else {
          return this.isRange ? [this.tooltipStyle, this.tooltipStyle] : this.tooltipStyle
        }
      },
      elemStyles () {
        return this.direction === 'vertical' ? {
          width: `${this.width}px`,
          height: '100%'
        } : {
          height: `${this.height}px`
        }
      },
      dotStyles () {
        return this.direction === 'vertical' ? {
          width: `${this.dotWidthVal}px`,
          height: `${this.dotHeightVal}px`,
          left: `${(-(this.dotWidthVal - this.width) / 2)}px`
        } : {
          width: `${this.dotWidthVal}px`,
          height: `${this.dotHeightVal}px`,
          top: `${(-(this.dotHeightVal - this.height) / 2)}px`
        }
      },
      piecewiseDotStyle () {
        return this.direction === 'vertical' ? {
          width: `${this.width}px`,
          height: `${this.width}px`
        } : {
          width: `${this.height}px`,
          height: `${this.height}px`
        }
      },
      piecewiseDotWrap () {
        if (!this.piecewise && !this.piecewiseLabel) {
          return false
        }

        let arr = []
        for (let i = 0; i <= this.total; i++) {
          let style = this.direction === 'vertical' ? {
            bottom: `${this.gap * i - this.width / 2}px`,
            left: 0
          } : {
            left: `${this.gap * i - this.height / 2}px`,
            top: 0
          }
          let index = this.reverse ? (this.total - i) : i
          let label = this.data ? this.data[index] : (this.spacing * index) + this.min
          arr.push({
            style,
            label: this.formatter ? this.formatting(label) : label,
            inRange: index >= this.indexRange[0] && index <= this.indexRange[1]
          })
        }
        return arr
      }
    },
    watch: {
      value (val) {
        this.flag || this.setValue(val, true)
      },
      max (val) {
        if (val < this.min) {
          return this.printError('The maximum value can not be less than the minimum value.')
        }

        let resetVal = this.limitValue(this.val)
        this.setValue(resetVal)
        this.refresh()
      },
      min (val) {
        if (val > this.max) {
          return this.printError('The minimum value can not be greater than the maximum value.')
        }

        let resetVal = this.limitValue(this.val)
        this.setValue(resetVal)
        this.refresh()
      },
      show (bool) {
        if (bool && !this.size) {
          this.$nextTick(() => {
            this.refresh()
          })
        }
      },
      fixed () {
        this.computedFixedValue()
      }
    },
    methods: {
      bindEvents () {
        document.addEventListener('touchmove', this.moving, {passive: false})
        document.addEventListener('touchend', this.moveEnd, {passive: false})
        document.addEventListener('mousedown', this.blurSlider)
        document.addEventListener('mousemove', this.moving)
        document.addEventListener('mouseup', this.moveEnd)
        document.addEventListener('mouseleave', this.moveEnd)
        document.addEventListener('keydown', this.handleKeydown)
        document.addEventListener('keyup', this.handleKeyup)
        window.addEventListener('resize', this.refresh)

        if (this.isRange && this.tooltipMerge) {
          this.$refs.dot0.addEventListener('transitionend', this.handleOverlapTooltip)
          this.$refs.dot1.addEventListener('transitionend', this.handleOverlapTooltip)
        }
      },
      unbindEvents () {
        document.removeEventListener('touchmove', this.moving)
        document.removeEventListener('touchend', this.moveEnd)
        document.removeEventListener('mousedown', this.blurSlider)
        document.removeEventListener('mousemove', this.moving)
        document.removeEventListener('mouseup', this.moveEnd)
        document.removeEventListener('mouseleave', this.moveEnd)
        document.removeEventListener('keydown', this.handleKeydown)
        document.removeEventListener('keyup', this.handleKeyup)
        window.removeEventListener('resize', this.refresh)

        if (this.isRange && this.tooltipMerge) {
          this.$refs.dot0.removeEventListener('transitionend', this.handleOverlapTooltip)
          this.$refs.dot1.removeEventListener('transitionend', this.handleOverlapTooltip)
        }
      },
      handleKeydown (e) {
        if (!this.useKeyboard || !this.focusFlag) {
          return false
        }
        switch (e.keyCode) {
        case 37:
        case 40:
          e.preventDefault()
          this.keydownFlag = true
          this.flag = true
          this.changeFocusSlider(this.actionsKeyboard[0])
          break
        case 38:
        case 39:
          e.preventDefault()
          this.keydownFlag = true
          this.flag = true
          this.changeFocusSlider(this.actionsKeyboard[1])
          break
        }
      },
      handleKeyup () {
        if (this.keydownFlag) {
          this.keydownFlag = false
          this.flag = false
        }
      },
      changeFocusSlider (fn) {
        if (this.isRange) {
          let arr = this.currentIndex.map((index, i) => {
            if (i === this.focusSlider || this.fixed) {
              let val = fn(index)
              let range = this.fixed ? this.valueLimit[i] : [0, this.total]
              if (val <= range[1] && val >= range[0]) {
                return val
              }
            }
            return index
          })
          if (arr[0] > arr[1]) {
            this.focusSlider = this.focusSlider === 0 ? 1 : 0
            arr = arr.reverse()
          }
          this.setIndex(arr)
        } else {
          this.setIndex(fn(this.currentIndex))
        }
      },
      blurSlider (e) {
        let dot = this.isRange ? this.$refs[`dot${this.focusSlider}`] : this.$refs.dot
        if (!dot || dot === e.target) {
          return false
        }
        this.focusFlag = false
      },
      formatting (value) {
        return typeof this.formatter === 'string' ? this.formatter.replace(/\{value\}/, value) : this.formatter(value)
      },
      mergeFormatting (value1, value2) {
        return typeof this.mergeFormatter === 'string' ? this.mergeFormatter.replace(/\{(value1|value2)\}/g, (_, key) => key === 'value1' ? value1 : value2) : this.mergeFormatter(value1, value2)
      },
      getPos (e) {
        this.realTime && this.getStaticData()
        return this.direction === 'vertical' ? (this.reverse ? (e.pageY - this.offset) : (this.size - (e.pageY - this.offset))) : (this.reverse ? (this.size - (e.clientX - this.offset)) : (e.clientX - this.offset))
      },
      processClick (e) {
        if (this.fixed) {
          e.stopPropagation()
        }
      },
      wrapClick (e) {
        if (this.isDisabled || !this.clickable || this.processFlag) return false
        let pos = this.getPos(e)
        if (this.isRange) {
          if (this.disabledArray.every(b => b === false)) {
            this.currentSlider = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
          } else if (this.disabledArray[0]) {
            if (pos < this.position[0]) return false
            this.currentSlider = 1
          } else if (this.disabledArray[1]) {
            if (pos > this.position[1]) return false
            this.currentSlider = 0
          }
        }
        if (this.disabledArray[this.currentSlider]) {
          return false
        }
        this.setValueOnPos(pos)

        if (this.isRange && this.tooltipMerge) {
          const timer = setInterval(() => this.handleOverlapTooltip(), 16.7)
          setTimeout(() => window.clearInterval(timer), this.speed * 1000)
        }
      },
      moveStart (e, index = 0, isProcess) {
        if (this.disabledArray[index]) {
          return false
        }
        if (this.stopPropagation) {
          e.stopPropagation()
        }
        if (this.isRange) {
          this.currentSlider = index

          if (isProcess) {
            if (!this.processDragable) {
              return false
            }
            this.processFlag = true
            this.processSign = {
              pos: this.position,
              start: this.getPos((e.targetTouches && e.targetTouches[0]) ? e.targetTouches[0] : e)
            }
          }
        }
        if (!isProcess && this.useKeyboard) {
          this.focusFlag = true
          this.focusSlider = index
        }
        this.flag = true
        this.$emit('drag-start', this)
      },
      moving (e) {
        if (this.stopPropagation) {
          e.stopPropagation()
        }

        if (!this.flag) return false
        e.preventDefault()

        if (e.targetTouches && e.targetTouches[0]) e = e.targetTouches[0]
        if (this.processFlag) {
          this.currentSlider = 0
          this.setValueOnPos(this.processSign.pos[0] + this.getPos(e) - this.processSign.start, true)
          this.currentSlider = 1
          this.setValueOnPos(this.processSign.pos[1] + this.getPos(e) - this.processSign.start, true)
        } else {
          this.setValueOnPos(this.getPos(e), true)
        }

        if (this.isRange && this.tooltipMerge) {
          this.handleOverlapTooltip()
        }
      },
      moveEnd (e) {
        if (this.stopPropagation) {
          e.stopPropagation()
        }
        if (this.flag) {
          this.$emit('drag-end', this)
          if (this.lazy && this.isDiff(this.val, this.value)) {
            this.syncValue()
          }
        } else {
          return false
        }
        this.flag = false
        window.setTimeout(() => {
          this.processFlag = false
        }, 0)
        this.setPosition()
      },
      setValueOnPos (pos, isDrag) {
        let range = this.isRange ? this.limit[this.currentSlider] : this.limit
        let valueRange = this.isRange ? this.valueLimit[this.currentSlider] : this.valueLimit
        if (pos >= range[0] && pos <= range[1]) {
          this.setTransform(pos)
          let v = this.getValueByIndex(Math.round(pos / this.gap))
          this.setCurrentValue(v, isDrag)
          if (this.isRange && this.fixed) {
            this.setTransform(pos + ((this.fixedValue * this.gap) * (this.currentSlider === 0 ? 1 : -1)), true)
            this.setCurrentValue((v * this.multiple + (this.fixedValue * this.spacing * this.multiple * (this.currentSlider === 0 ? 1 : -1))) / this.multiple, isDrag, true)
          }
        } else if (pos < range[0]) {
          this.setTransform(range[0])
          this.setCurrentValue(valueRange[0])
          if (this.isRange && this.fixed) {
            this.setTransform(this.limit[this.idleSlider][0], true)
            this.setCurrentValue(this.valueLimit[this.idleSlider][0], isDrag, true)
          } else if (!this.fixed && !this.disabledArray[0] && this.currentSlider === 1) {
            this.focusSlider = 0
            this.currentSlider = 0
          }
        } else {
          this.setTransform(range[1])
          this.setCurrentValue(valueRange[1])
          if (this.isRange && this.fixed) {
            this.setTransform(this.limit[this.idleSlider][1], true)
            this.setCurrentValue(this.valueLimit[this.idleSlider][1], isDrag, true)
          } else if (!this.fixed && !this.disabledArray[1] && this.currentSlider === 0) {
            this.focusSlider = 1
            this.currentSlider = 1
          }
        }
      },
      isDiff (a, b) {
        if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
          return true
        } else if (Array.isArray(a) && a.length === b.length) {
          return a.some((v, i) => v !== b[i])
        }
        return a !== b
      },
      setCurrentValue (val, isDrag, isIdleSlider) {
        let slider = isIdleSlider ? this.idleSlider : this.currentSlider
        if (val < this.minimum || val > this.maximum) return false
        if (this.isRange) {
          if (this.isDiff(this.currentValue[slider], val)) {
            this.currentValue.splice(slider, 1, val)
            if (!this.lazy || !this.flag) {
              this.syncValue()
            }
          }
        } else if (this.isDiff(this.currentValue, val)) {
          this.currentValue = val
          if (!this.lazy || !this.flag) {
            this.syncValue()
          }
        }
        isDrag || this.setPosition()
      },
      getValueByIndex (index) {
        return ((this.spacing * this.multiple) * index + (this.minimum * this.multiple)) / this.multiple
      },
      getIndexByValue (value) {
        return Math.round((value - this.minimum) * this.multiple) / (this.spacing * this.multiple)
      },
      setIndex (val) {
        if (Array.isArray(val) && this.isRange) {
          let value
          if (this.data) {
            value = [this.data[val[0]], this.data[val[1]]]
          } else {
            value = [this.getValueByIndex(val[0]), this.getValueByIndex(val[1])]
          }
          this.setValue(value)
        } else {
          val = this.getValueByIndex(val)
          if (this.isRange) {
            this.currentSlider = val > ((this.currentValue[1] - this.currentValue[0]) / 2 + this.currentValue[0]) ? 1 : 0
          }
          this.setCurrentValue(val)
        }
      },
      setValue (val, noCb, speed) {
        if (this.isDiff(this.val, val)) {
          let resetVal = this.limitValue(val)
          this.val = this.isRange ? resetVal.concat() : resetVal
          this.computedFixedValue()
          this.syncValue(noCb)
        }

        this.$nextTick(() => this.setPosition(speed))
      },
      computedFixedValue () {
        if (!this.fixed) {
          this.fixedValue = 0
          return false
        }

        this.fixedValue = this.currentIndex[1] - this.currentIndex[0]
      },
      setPosition (speed) {
        this.flag || this.setTransitionTime(speed === undefined ? this.speed : speed)
        if (this.isRange) {
          this.setTransform(this.position[0], this.currentSlider === 1)
          this.setTransform(this.position[1], this.currentSlider === 0)
        } else {
          this.setTransform(this.position)
        }
        this.flag || this.setTransitionTime(0)
      },
      setTransform (val, isIdleSlider) {
        let slider = isIdleSlider ? this.idleSlider : this.currentSlider
        let value = roundToDPR((this.direction === 'vertical' ? ((this.dotHeightVal / 2) - val) : (val - (this.dotWidthVal / 2))) * (this.reverse ? -1 : 1))
        let translateValue = this.direction === 'vertical' ? `translateY(${value}px)` : `translateX(${value}px)`
        let processSize = this.fixed ? `${this.fixedValue * this.gap}px` : `${slider === 0 ? this.position[1] - val : val - this.position[0]}px`
        let processPos = this.fixed ? `${slider === 0 ? val : (val - this.fixedValue * this.gap)}px` : `${slider === 0 ? val : this.position[0]}px`
        if (this.isRange) {
          this.slider[slider].style.transform = translateValue
          this.slider[slider].style.WebkitTransform = translateValue
          this.slider[slider].style.msTransform = translateValue
          if (this.direction === 'vertical') {
            this.$refs.process.style.height = processSize
            this.$refs.process.style[this.reverse ? 'top' : 'bottom'] = processPos
          } else {
            this.$refs.process.style.width = processSize
            this.$refs.process.style[this.reverse ? 'right' : 'left'] = processPos
          }
        } else {
          this.slider.style.transform = translateValue
          this.slider.style.WebkitTransform = translateValue
          this.slider.style.msTransform = translateValue
          if (this.direction === 'vertical') {
            this.$refs.process.style.height = `${val}px`
            this.$refs.process.style[this.reverse ? 'top' : 'bottom'] = 0
          } else {
            this.$refs.process.style.width = `${val}px`
            this.$refs.process.style[this.reverse ? 'right' : 'left'] = 0
          }
        }
      },
      setTransitionTime (time) {
        // In order to avoid browser merge style and modify together
        time || this.$refs.process.offsetWidth

        if (this.isRange) {
          for (let i = 0; i < this.slider.length; i++) {
            this.slider[i].style.transitionDuration = `${time}s`
            this.slider[i].style.WebkitTransitionDuration = `${time}s`
          }
          this.$refs.process.style.transitionDuration = `${time}s`
          this.$refs.process.style.WebkitTransitionDuration = `${time}s`
        } else {
          this.slider.style.transitionDuration = `${time}s`
          this.slider.style.WebkitTransitionDuration = `${time}s`
          this.$refs.process.style.transitionDuration = `${time}s`
          this.$refs.process.style.WebkitTransitionDuration = `${time}s`
        }
      },
      limitValue (val) {
        if (this.data) {
          return val
        }

        const inRange = (v) => {
          if (v < this.min) {
            this.printError(`The value of the slider is ${val}, the minimum value is ${this.min}, the value of this slider can not be less than the minimum value`)
            return this.min
          } else if (v > this.max) {
            this.printError(`The value of the slider is ${val}, the maximum value is ${this.max}, the value of this slider can not be greater than the maximum value`)
            return this.max
          }
          return v
        }

        if (this.isRange) {
          return val.map((v) => inRange(v))
        } else {
          return inRange(val)
        }
      },
      syncValue (noCb) {
        let val = this.isRange ? this.val.concat() : this.val
        this.$emit('input', val)
        this.keydownFlag && this.$emit('on-keypress', val)
        noCb || this.$emit('callback', val)
      },
      getValue () {
        return this.val
      },
      getIndex () {
        return this.currentIndex
      },
      getStaticData () {
        if (this.$refs.elem) {
          this.size = this.direction === 'vertical' ? this.$refs.elem.offsetHeight : this.$refs.elem.offsetWidth
          this.offset = this.direction === 'vertical' ? (this.$refs.elem.getBoundingClientRect().top + window.pageYOffset || document.documentElement.scrollTop) : this.$refs.elem.getBoundingClientRect().left
        }
      },
      refresh () {
        if (this.$refs.elem) {
          this.getStaticData()
          this.computedFixedValue()
          this.setPosition()
        }
      },
      printError (msg) {
        if (this.debug) {
          console.error(`[VueSlider error]: ${msg}`)
        }
      },
      handleOverlapTooltip () {
        const isDirectionSame = this.tooltipDirection[0] === this.tooltipDirection[1]

        if (this.isRange && isDirectionSame) {
          const tooltip0 = this.reverse ? this.$refs.tooltip1 : this.$refs.tooltip0
          const tooltip1 = this.reverse ? this.$refs.tooltip0 : this.$refs.tooltip1
          const tooltip0Rect = tooltip0.getBoundingClientRect()
          const tooltip1Rect = tooltip1.getBoundingClientRect()

          const tooltip0Right = tooltip0Rect.right
          const tooltip1Left = tooltip1Rect.left

          const tooltip0Y = tooltip0Rect.top
          const tooltip1Y = tooltip1Rect.top + tooltip1Rect.height

          const horizontalOverlap = this.direction === 'horizontal' && tooltip0Right > tooltip1Left
          const verticalOverlap = this.direction === 'vertical' && tooltip1Y > tooltip0Y

          if (horizontalOverlap || verticalOverlap) {
            this.handleDisplayMergedTooltip(true)
          } else {
            this.handleDisplayMergedTooltip(false)
          }
        }
      },
      handleDisplayMergedTooltip (show) {
        const tooltip0 = this.$refs.tooltip0
        const tooltip1 = this.$refs.tooltip1
        const mergedTooltip = this.$refs.process.getElementsByClassName('vue-merged-tooltip')[0]

        if (show) {
          tooltip0.style.visibility = 'hidden'
          tooltip1.style.visibility = 'hidden'
          mergedTooltip.style.visibility = 'visible'
        } else {
          tooltip0.style.visibility = 'visible'
          tooltip1.style.visibility = 'visible'
          mergedTooltip.style.visibility = 'hidden'
        }
      }
    },
    mounted () {
      this.isComponentExists = true

      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return this.printError('window or document is undefined, can not be initialization.')
      }

      this.$nextTick(() => {
        if (this.isComponentExists) {
          this.getStaticData()
          this.setValue(this.limitValue(this.value), true, this.startAnimation ? this.speed : 0)
          this.bindEvents()

          if (this.isRange && this.tooltipMerge && !this.startAnimation) {
            this.$nextTick(() => {
              this.handleOverlapTooltip()
            })
          }
        }
      })

      this.isMounted = true
    },
    beforeDestroy () {
      this.isComponentExists = false
      this.unbindEvents()
    }
  }
</script>

<style>
  .vue-slider-component {
    position: relative;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -o-user-select:none;
  }
  .vue-slider-component.vue-slider-disabled {
    opacity: .5;
    cursor: not-allowed;
  }
  .vue-slider-component.vue-slider-has-label {
    margin-bottom: 15px;
  }
  .vue-slider-component.vue-slider-disabled .vue-slider-dot {
    cursor: not-allowed;
  }
  .vue-slider-component .vue-slider {
    position: relative;
    display: block;
    border-radius: 15px;
    background-color: #ccc;
  }
  .vue-slider-component .vue-slider::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .vue-slider-component .vue-slider-process {
    position: absolute;
    border-radius: 15px;
    background-color: #3498db;
    transition: all 0s;
    z-index: 1;
  }
  .vue-slider-component .vue-slider-process.vue-slider-process-dragable {
    cursor: pointer;
    z-index: 3;
  }
  .vue-slider-component.vue-slider-horizontal .vue-slider-process {
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    will-change: width;
  }
  .vue-slider-component.vue-slider-vertical .vue-slider-process {
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    will-change: height;
  }
  .vue-slider-component.vue-slider-horizontal-reverse .vue-slider-process {
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
  }
  .vue-slider-component.vue-slider-vertical-reverse .vue-slider-process {
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
  }
  .vue-slider-component .vue-slider-dot {
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
    transition: all 0s;
    will-change: transform;
    cursor: pointer;
    z-index: 5;
  }
  .vue-slider-component .vue-slider-dot.vue-slider-dot-focus {
    box-shadow: 0 0 2px 1px #3498db;
  }
  .vue-slider-component .vue-slider-dot.vue-slider-dot-dragging {
    z-index: 5;
  }
  .vue-slider-component .vue-slider-dot.vue-slider-dot-disabled {
    z-index: 4;
  }
  .vue-slider-component.vue-slider-horizontal .vue-slider-dot {
    left: 0;
  }
  .vue-slider-component.vue-slider-vertical .vue-slider-dot {
    bottom: 0;
  }
  .vue-slider-component.vue-slider-horizontal-reverse .vue-slider-dot {
    right: 0;
  }
  .vue-slider-component.vue-slider-vertical-reverse .vue-slider-dot {
    top: 0;
  }
  .vue-slider-component .vue-slider-tooltip-wrap {
    display: none;
    position: absolute;
    z-index: 9;
  }
  .vue-slider-component .vue-slider-tooltip {
    display: block;
    font-size: 14px;
    white-space: nowrap;
    padding: 2px 5px;
    min-width: 20px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #3498db;
    background-color: #3498db;
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top {
    top: -9px;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-bottom {
    bottom: -9px;
    left: 50%;
    transform: translate(-50%, 100%);
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left {
    top: 50%;
    left: -9px;
    transform: translate(-100%, -50%);
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-right {
    top: 50%;
    right: -9px;
    transform: translate(100%, -50%);
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top .vue-slider-tooltip::before,
  .vue-slider-component .vue-slider-tooltip-top .vue-merged-tooltip .vue-slider-tooltip::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border: 6px solid transparent\0;
    border-top-color: inherit;
    transform: translate(-50%, 0);
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-merged-tooltip {
    display: block;
    visibility: hidden;
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-bottom .vue-slider-tooltip::before,
  .vue-slider-component .vue-slider-tooltip-bottom .vue-merged-tooltip .vue-slider-tooltip::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border: 6px solid transparent\0;
    border-bottom-color: inherit;
    transform: translate(-50%, 0);
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left .vue-slider-tooltip::before,
  .vue-slider-component .vue-slider-tooltip-left .vue-merged-tooltip .vue-slider-tooltip::before {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border: 6px solid transparent\0;
    border-left-color: inherit;
    transform: translate(0, -50%);
  }
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-right .vue-slider-tooltip::before,
  .vue-slider-component .vue-slider-tooltip-right .vue-merged-tooltip .vue-slider-tooltip::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border: 6px solid transparent\0;
    border-right-color: inherit;
    transform: translate(0, -50%);
  }
  .vue-slider-component .vue-slider-dot.vue-slider-hover:hover .vue-slider-tooltip-wrap {
    display: block;
  }
  .vue-slider-component .vue-slider-dot.vue-slider-always .vue-slider-tooltip-wrap {
    display: block!important;
  }
  .vue-slider-component .vue-slider-piecewise {
    position: absolute;
    width: 100%;
    padding: 0;
    margin: 0;
    left: 0;
    top: 0;
    height: 100%;
    list-style: none;
  }
  .vue-slider-component .vue-slider-piecewise-item {
    position: absolute;
    width: 8px;
    height: 8px;
  }
  .vue-slider-component .vue-slider-piecewise-dot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.16);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    transition: all .3s;
  }
  .vue-slider-component .vue-slider-piecewise-item:first-child .vue-slider-piecewise-dot, .vue-slider-component .vue-slider-piecewise-item:last-child .vue-slider-piecewise-dot {
    visibility: hidden;
  }
  .vue-slider-component.vue-slider-horizontal .vue-slider-piecewise-label, .vue-slider-component.vue-slider-horizontal-reverse .vue-slider-piecewise-label {
    position: absolute;
    display: inline-block;
    top: 100%;
    left: 50%;
    white-space: nowrap;
    font-size: 12px;
    color: #333;
    transform: translate(-50%, 8px);
    visibility: visible;
  }
  .vue-slider-component.vue-slider-vertical .vue-slider-piecewise-label, .vue-slider-component.vue-slider-vertical-reverse .vue-slider-piecewise-label {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 100%;
    white-space: nowrap;
    font-size: 12px;
    color: #333;
    transform: translate(8px, -50%);
    visibility: visible;
  }
  .vue-slider-component .vue-slider-sr-only {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute !important;
  }
</style>
