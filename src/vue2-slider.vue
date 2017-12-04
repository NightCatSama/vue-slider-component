<template>
  <div ref="wrap" :class="['vue-slider-component', flowDirection, disabledClass, { 'vue-slider-has-label': piecewiseLabel }]" v-show="show" :style="wrapStyles" @click="wrapClick">
    <div ref="elem" aria-hidden="true" class="vue-slider" :style="[elemStyles, bgStyle]">
      <template v-if="isRange">
        <div
          ref="dot0"
          :class="[tooltipStatus, 'vue-slider-dot']"
          :style="[dotStyles, sliderStyles[0]]"
          @mousedown="moveStart($event, 0)"
          @touchstart="moveStart($event, 0)"
        >
          <span :class="['vue-slider-tooltip-' + tooltipDirection[0], 'vue-slider-tooltip-wrap']">
            <slot name="tooltip" :value="val[0]" :index="0">
              <span class="vue-slider-tooltip" :style="tooltipStyles[0]">{{ formatter ? formatting(val[0]) : val[0] }}</span>
            </slot>
          </span>
        </div>
        <div
          ref="dot1"
          :class="[tooltipStatus, 'vue-slider-dot']"
          :style="[dotStyles, sliderStyles[1]]"
          @mousedown="moveStart($event, 1)"
          @touchstart="moveStart($event, 1)"
        >
          <span :class="['vue-slider-tooltip-' + tooltipDirection[1], 'vue-slider-tooltip-wrap']">
            <slot name="tooltip" :value="val[1]" :index="1">
              <span class="vue-slider-tooltip" :style="tooltipStyles[1]">{{ formatter ? formatting(val[1]) : val[1] }}</span>
            </slot>
          </span>
        </div>
      </template>
      <template v-else>
        <div
          ref="dot"
          :class="[tooltipStatus, 'vue-slider-dot']"
          :style="[dotStyles, sliderStyles]"
          @mousedown="moveStart"
          @touchstart="moveStart"
        >
          <span :class="['vue-slider-tooltip-' + tooltipDirection, 'vue-slider-tooltip-wrap']">
            <slot name="tooltip" :value="val">
              <span class="vue-slider-tooltip" :style="tooltipStyles">{{ formatter ? formatting(val) : val }}</span>
            </slot>
          </span>
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
      <div ref="process" class="vue-slider-process" :style="processStyle"></div>
    </div>
    <input v-if="!isRange && !data" class="vue-slider-sr-only" type="range" v-model="val" :min="min" :max="max" />
  </div>
</template>
<script>
  export default {
    name: 'VueSliderComponent',
    data () {
      return {
        flag: false,
        size: 0,
        currentValue: 0,
        currentSlider: 0
      }
    },
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
        type: Boolean,
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
        type: [String, Number, Array],
        default: 0
      },
      piecewiseLabel: {
        type: Boolean,
        default: false
      },
      sliderStyle: [Array, Object, Function],
      tooltipDir: [Array, String],
      formatter: [String, Function],
      piecewiseStyle: Object,
      piecewiseActiveStyle: Object,
      processStyle: Object,
      bgStyle: Object,
      tooltipStyle: [Array, Object, Function],
      labelStyle: Object,
      labelActiveStyle: Object
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
      isDisabled () {
        return this.eventType === 'none' ? true : this.disabled
      },
      disabledClass () {
        return this.disabled ? 'vue-slider-disabled' : ''
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
          return this.data ? this.currentValue : [(this.currentValue[0] - this.minimum) / this.spacing, (this.currentValue[1] - this.minimum) / this.spacing]
        } else {
          return (this.currentValue - this.minimum) / this.spacing
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
        } else if (~~((this.maximum - this.minimum) * this.multiple) % (this.interval * this.multiple) !== 0) {
          console.error('[Vue-slider warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible')
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
        return this.isRange ? [[0, this.position[1]], [this.position[0], this.size]] : [0, this.size]
      },
      valueLimit () {
        return this.isRange ? [[this.minimum, this.currentValue[1]], [this.currentValue[0], this.maximum]] : [this.minimum, this.maximum]
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
        let resetVal = this.limitValue(this.val)
        resetVal !== false && this.setValue(resetVal)
        this.refresh()
      },
      min (val) {
        let resetVal = this.limitValue(this.val)
        resetVal !== false && this.setValue(resetVal)
        this.refresh()
      },
      show (bool) {
        if (bool && !this.size) {
          this.$nextTick(() => {
            this.refresh()
          })
        }
      }
    },
    methods: {
      bindEvents () {
        document.addEventListener('touchmove', this.moving, {passive: false})
        document.addEventListener('touchend', this.moveEnd, {passive: false})
        document.addEventListener('mousemove', this.moving)
        document.addEventListener('mouseup', this.moveEnd)
        document.addEventListener('mouseleave', this.moveEnd)

        window.addEventListener('resize', this.refresh)
      },
      unbindEvents () {
        window.removeEventListener('resize', this.refresh)

        document.removeEventListener('touchmove', this.moving)
        document.removeEventListener('touchend', this.moveEnd)
        document.removeEventListener('mousemove', this.moving)
        document.removeEventListener('mouseup', this.moveEnd)
        document.removeEventListener('mouseleave', this.moveEnd)
      },
      formatting (value) {
        return typeof this.formatter === 'string' ? this.formatter.replace(/\{value\}/, value) : this.formatter(value)
      },
      getPos (e) {
        this.realTime && this.getStaticData()
        return this.direction === 'vertical' ? (this.reverse ? (e.pageY - this.offset) : (this.size - (e.pageY - this.offset))) : (this.reverse ? (this.size - (e.clientX - this.offset)) : (e.clientX - this.offset))
      },
      wrapClick (e) {
        if (this.isDisabled || !this.clickable) return false
        let pos = this.getPos(e)
        if (this.isRange) {
          this.currentSlider = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
        }
        this.setValueOnPos(pos)
      },
      moveStart (e, index) {
        if (this.stopPropagation) {
          e.stopPropagation()
        }

        if (this.isDisabled) return false
        else if (this.isRange) {
          this.currentSlider = index
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
        this.setValueOnPos(this.getPos(e), true)
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
        this.setPosition()
      },
      setValueOnPos (pos, isDrag) {
        let range = this.isRange ? this.limit[this.currentSlider] : this.limit
        let valueRange = this.isRange ? this.valueLimit[this.currentSlider] : this.valueLimit
        if (pos >= range[0] && pos <= range[1]) {
          this.setTransform(pos)
          let v = (Math.round(pos / this.gap) * (this.spacing * this.multiple) + (this.minimum * this.multiple)) / this.multiple
          this.setCurrentValue(v, isDrag)
        } else if (pos < range[0]) {
          this.setTransform(range[0])
          this.setCurrentValue(valueRange[0])
          if (this.currentSlider === 1) this.currentSlider = 0
        } else {
          this.setTransform(range[1])
          this.setCurrentValue(valueRange[1])
          if (this.currentSlider === 0) this.currentSlider = 1
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
      setCurrentValue (val, bool) {
        if (val < this.minimum || val > this.maximum) return false
        if (this.isRange) {
          if (this.isDiff(this.currentValue[this.currentSlider], val)) {
            this.currentValue.splice(this.currentSlider, 1, val)
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
        bool || this.setPosition()
      },
      setIndex (val) {
        if (Array.isArray(val) && this.isRange) {
          let value
          if (this.data) {
            value = [this.data[val[0]], this.data[val[1]]]
          } else {
            value = [this.spacing * val[0] + this.minimum, this.spacing * val[1] + this.minimum]
          }
          this.setValue(value)
        } else {
          val = this.spacing * val + this.minimum
          if (this.isRange) {
            this.currentSlider = val > ((this.currentValue[1] - this.currentValue[0]) / 2 + this.currentValue[0]) ? 1 : 0
          }
          this.setCurrentValue(val)
        }
      },
      setValue (val, noCb, speed) {
        if (this.isDiff(this.val, val)) {
          let resetVal = this.limitValue(val)
          if (resetVal !== false) {
            this.val = this.isRange ? resetVal.concat() : resetVal
          } else {
            this.val = this.isRange ? val.concat() : val
          }
          this.syncValue(noCb)
        }

        this.$nextTick(() => this.setPosition(speed))
      },
      setPosition (speed) {
        this.flag || this.setTransitionTime(speed === undefined ? this.speed : speed)
        if (this.isRange) {
          this.currentSlider = 0
          this.setTransform(this.position[this.currentSlider])
          this.currentSlider = 1
          this.setTransform(this.position[this.currentSlider])
        } else {
          this.setTransform(this.position)
        }
        this.flag || this.setTransitionTime(0)
      },
      setTransform (val) {
        let value = (this.direction === 'vertical' ? ((this.dotHeightVal / 2) - val) : (val - (this.dotWidthVal / 2))) * (this.reverse ? -1 : 1)
        let translateValue = this.direction === 'vertical' ? `translateY(${value}px)` : `translateX(${value}px)`
        let processSize = `${this.currentSlider === 0 ? this.position[1] - val : val - this.position[0]}px`
        let processPos = `${this.currentSlider === 0 ? val : this.position[0]}px`
        if (this.isRange) {
          this.slider[this.currentSlider].style.transform = translateValue
          this.slider[this.currentSlider].style.WebkitTransform = translateValue
          this.slider[this.currentSlider].style.msTransform = translateValue
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

        let bool = false
        if (this.isRange) {
          val = val.map((v) => {
            if (v < this.min) {
              bool = true
              return this.min
            } else if (v > this.max) {
              bool = true
              return this.max
            }
            return v
          })
        } else if (val > this.max) {
          bool = true
          val = this.max
        } else if (val < this.min) {
          bool = true
          val = this.min
        }
        return bool && val
      },
      syncValue (noCb) {
        noCb || this.$emit('callback', this.val)
        this.$emit('input', this.isRange ? this.val.concat() : this.val)
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
          this.setPosition()
        }
      }
    },
    mounted () {
      if (typeof window === 'undefined' || typeof document === 'undefined') return

      this.$nextTick(() => {
        this.getStaticData()
        this.setValue(this.value, true, 0)
        this.bindEvents()
      })
    },
    beforeDestroy () {
      this.unbindEvents()
    }
  }
</script>

<style>
  .vue-slider-component {
    position: relative;
    box-sizing: border-box;
    user-select: none;
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
    z-index: 3;
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
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top .vue-slider-tooltip::before {
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
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-bottom .vue-slider-tooltip::before {
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
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left .vue-slider-tooltip::before {
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
  .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-right .vue-slider-tooltip::before {
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
