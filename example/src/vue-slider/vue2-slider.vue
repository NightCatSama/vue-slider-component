<template>
	<div ref="wrap" :class="['vue-slider-wrap', flowDirection, disabledClass]" v-show="show" :style="wrapStyles" @click="wrapClick">
		<div ref="elem" class="vue-slider" :style="[elemStyles, bgStyle]">
			<template v-if="isMoblie">
				<template v-if="isRange">
					<div ref="dot0" :class="[tooltipStatus, 'vue-slider-dot']" :style="[sliderStyle, dotStyles]" @touchstart="moveStart(0)">
						<span :class="tooltipClass" :style="tooltipStyle">{{ formatter ? formatting(val[0]) : val[0] }}</span>
					</div>
					<div ref="dot1" :class="[tooltipStatus, 'vue-slider-dot']" :style="[sliderStyle, dotStyles]" @touchstart="moveStart(1)">
						<span :class="tooltipClass" :style="tooltipStyle">{{ formatter ? formatting(val[1]) : val[1] }}</span>
					</div>
				</template>
				<template v-else>
					<div ref="dot" :class="[tooltipStatus, 'vue-slider-dot']" :style="[sliderStyle, dotStyles]" @touchstart="moveStart">
						<span :class="tooltipClass" :style="tooltipStyle">{{ formatter ? formatting(val) : val}}</span>
					</div>
				</template>
			</template>
			<template v-else>
				<template v-if="isRange">
					<div ref="dot0" :class="[tooltipStatus, 'vue-slider-dot']" :style="[sliderStyle, dotStyles]" @mousedown="moveStart(0)">
						<span :class="tooltipClass" :style="tooltipStyle">{{ formatter ? formatting(val[0]) : val[0] }}</span>
					</div>
					<div ref="dot1" :class="[tooltipStatus, 'vue-slider-dot']" :style="[sliderStyle, dotStyles]" @mousedown="moveStart(1)">
						<span :class="tooltipClass" :style="tooltipStyle">{{ formatter ? formatting(val[1]) : val[1] }}</span>
					</div>
				</template>
				<template v-else>
					<div ref="dot" :class="[tooltipStatus, 'vue-slider-dot']" :style="[sliderStyle, dotStyles]" @mousedown="moveStart">
						<span :class="tooltipClass" :style="tooltipStyle">{{ formatter ? formatting(val) : val}}</span>
					</div>
				</template>
			</template>
			<template v-if="piecewise">
				<ul class="vue-slider-piecewise">
					<li v-for="position in piecewiseDotPos" :style="[piecewiseStyles, piecewiseStyle, position]"></li>
				</ul>
			</template>
			<div ref="process" class="vue-slider-process" :style="processStyle"></div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
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
		value: {
			type: [String, Number, Array],
			default: 0
		},
		sliderStyle: Object,
		tooltipDir: String,
		formatter: [String, Function],
		piecewiseStyle: Object,
		processStyle: Object,
		bgStyle: Object,
		tooltipStyle: Object
	},
	computed: {
		flowDirection() {
			return `vue-slider-${this.direction + (this.reverse ? '-reverse' : '')}`
		},
		tooltipDirection() {
			return this.tooltipDir || (this.direction === 'vertical' ? 'left' : 'top')
		},
		tooltipStatus() {
			return this.tooltip === 'hover' && this.flag ? 'vue-slider-always' : this.tooltip ? `vue-slider-${this.tooltip}` : ''
		},
		tooltipClass() {
			return [`vue-slider-tooltip-${this.tooltipDirection}`, 'vue-slider-tooltip']
		},
		isMoblie() {
			return this.eventType === 'touch' || this.eventType !== 'mouse' && /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|Mobile)/i.test(navigator.userAgent)
		},
		isDisabled() {
			return this.eventType === 'none' ? true : this.disabled
		},
		disabledClass() {
			return this.disabled ? 'vue-slider-disabled' : ''
		},
		isRange() {
			return Array.isArray(this.value)
		},
		slider() {
			return this.isRange ? [this.$refs.dot0, this.$refs.dot1] : this.$refs.dot
		},
		minimum() {
			return this.data ? 0 : this.min
		},
		val: {
			get() {
				return this.data ? (this.isRange ? [this.data[this.currentValue[0]], this.data[this.currentValue[1]]] : this.data[this.currentValue]) : this.currentValue
			},
			set(val) {
				if (this.data) {
					if (this.isRange) {
						let index0 = this.data.indexOf(val[0])
						let index1 = this.data.indexOf(val[1])
						if (index0 > -1 && index1 > -1) {
							this.currentValue = [index0, index1]
						}
					}
					else {
						let index = this.data.indexOf(val)
						if (index > -1) {
							this.currentValue = index
						}
					}
				}
				else {
					this.currentValue = val
				}
			}
		},
		maximum() {
			return this.data ? (this.data.length - 1) : this.max
		},
		spacing() {
			return this.data ? 1 : this.interval
		},
		total() {
			if (this.data) {
				return this.data.length - 1
			}
			else if ((this.maximum - this.minimum) % this.interval !== 0) {
				console.error('[Vue-slider warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible')
			}
			return (this.maximum - this.minimum) / this.interval
		},
		gap() {
			return this.size / this.total
		},
		position() {
			return this.isRange ? [(this.currentValue[0] - this.minimum) / this.spacing * this.gap, (this.currentValue[1] - this.minimum) / this.spacing * this.gap] : ((this.currentValue - this.minimum) / this.spacing * this.gap)
		},
		limit() {
			return this.isRange ? [[0, this.position[1]], [this.position[0], this.size]] : [0, this.size]
		},
		valueLimit() {
			return this.isRange ? [[this.minimum, this.currentValue[1]], [this.currentValue[0], this.maximum]] : [this.minimum, this.maximum]
		},
		wrapStyles() {
			return this.direction === 'vertical' ? {
				height: typeof this.height === 'number' ? `${this.height}px` : this.height,
				padding: `${this.dotSize / 2}px`
			} : {
				width: typeof this.width === 'number' ? `${this.width}px` : this.width,
				padding: `${this.dotSize / 2}px`
			}
		},
		elemStyles() {
			return this.direction === 'vertical' ? {
				width: `${this.width}px`,
				height: '100%'
			} : {
				height: `${this.height}px`
			}
		},
		dotStyles() {
			return this.direction === 'vertical' ? {
				width: `${this.dotSize}px`,
				height: `${this.dotSize}px`,
				left: `${(-(this.dotSize - this.width) / 2)}px`
			} : {
				width: `${this.dotSize}px`,
				height: `${this.dotSize}px`,
				top: `${(-(this.dotSize - this.height) / 2)}px`
			}
		},
		piecewiseStyles() {
			return this.direction === 'vertical' ? {
				width: `${this.width}px`,
				height: `${this.width}px`
			} : {
				width: `${this.height}px`,
				height: `${this.height}px`
			}
		},
		piecewiseDotPos() {
			let arr = []
			for (let i = 1; i < this.total; i++) {
				arr.push(this.direction === 'vertical' ? {
					bottom: `${this.gap * i - this.width / 2}px`,
					left: '0'
				} : {
					left: `${this.gap * i - this.height / 2}px`,
					top: '0'
				})
			}
			return arr
		}
	},
	watch: {
		value(val) {
			this.flag || this.setValue(val)
		},
		show(bool) {
			if (bool && !this.size) {
				this.$nextTick(() => {
					this.refresh()
				})
			}
		}
	},
	methods: {
		bindEvents() {
			if (this.isMoblie) {
				document.addEventListener('touchmove', this.moving)
				document.addEventListener('touchend', this.moveEnd)
			}
			else {
				document.addEventListener('mousemove', this.moving)
				document.addEventListener('mouseup', this.moveEnd)
				document.addEventListener('mouseleave', this.moveEnd)
			}
		},
		unbindEvents() {
			window.removeEventListener('resize', this.refresh)

			if (this.isMoblie) {
				document.removeEventListener('touchmove', this.moving)
				document.removeEventListener('touchend', this.moveEnd)
			}
			else {
				document.removeEventListener('mousemove', this.moving)
				document.removeEventListener('mouseup', this.moveEnd)
				document.removeEventListener('mouseleave', this.moveEnd)
			}
		},
		formatting(value) {
			return typeof this.formatter === 'string' ? this.formatter.replace(/\{value\}/, value) : this.formatter(value)
		},
		getPos(e) {
			return this.direction === 'vertical' ? (this.reverse ? (e.pageY - this.offset) : (this.size - (e.pageY - this.offset))) : (this.reverse ? (this.size - (e.clientX - this.offset)) : (e.clientX - this.offset))
		},
		wrapClick(e) {
			if (this.isDisabled || !this.clickable) return false
			let pos = this.getPos(e)
			if (this.isRange) {
				this.currentSlider = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
			}
			this.setValueOnPos(pos)
		},
		moveStart(index) {
			if (this.isDisabled) return false
			else if (this.isRange) {
				this.currentSlider = index
			}
			this.flag = true
			this.$emit('drag-start', this)
		},
		moving(e) {
			if (!this.flag) return false
			e.preventDefault()

			if (this.isMoblie) e = e.targetTouches[0]
			this.setValueOnPos(this.getPos(e), true)
		},
		moveEnd(e) {
			if (this.flag) {
				this.$emit('drag-end', this)
				if (this.lazy && this.isDiff(this.val, this.value)) {
					this.$emit('callback', this.val)
					this.$emit('input', this.isRange ? this.val.slice() : this.val)
				}
			}
			else {
				return false
			}
			this.flag = false
			this.setPosition()
		},
		setValueOnPos(pos, bool) {
			let range = this.isRange ? this.limit[this.currentSlider] : this.limit
			let valueRange = this.isRange ? this.valueLimit[this.currentSlider] : this.valueLimit
			if (pos >= range[0] && pos <= range[1]) {
				this.setTransform(pos)
				let v = Math.round(pos / this.gap) * this.spacing + this.minimum
				this.setCurrentValue(v, bool)
			}
			else if (pos < range[0]) {
				this.setTransform(range[0])
				this.setCurrentValue(valueRange[0])
				if (this.currentSlider === 1) this.currentSlider = 0
			}
			else {
				this.setTransform(range[1])
				this.setCurrentValue(valueRange[1])
				if (this.currentSlider === 0) this.currentSlider = 1
			}
		},
		isDiff(a, b) {
			if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
				return true
			}
			else if (Array.isArray(a) && a.length === b.length) {
				return a.some((v, i) => v !== b[i])
			}
			return a !== b
		},
		setCurrentValue(val, bool) {
			if (val < this.minimum || val > this.maximum) return false
			if (this.isRange) {
				if (this.isDiff(this.currentValue[this.currentSlider], val)) {
					this.currentValue.splice(this.currentSlider, 1, val)
					if (!this.lazy || !this.flag) {
						this.$emit('callback', this.val)
						this.$emit('input', this.isRange ? this.val.slice() : this.val)
					}
				}
			}
			else if (this.isDiff(this.currentValue, val)) {
				this.currentValue = val
				if (!this.lazy || !this.flag) {
					this.$emit('callback', this.val)
					this.$emit('input', this.isRange ? this.val.slice() : this.val)
				}
			}
			bool || this.setPosition()
		},
		setIndex(val) {
			if (Array.isArray(val) && this.isRange) {
				let value
				if (this.data) {
					value = [this.data[val[0]], this.data[val[1]]]
				}
				else {
					value = [this.spacing * val[0] + this.minimum, this.spacing * val[1] + this.minimum]
				}
				this.setValue(value)
			}
			else {
				val = this.spacing * val + this.minimum
				if (this.isRange) {
					this.currentSlider = val > ((this.currentValue[1] - this.currentValue[0]) / 2 + this.currentValue[0]) ? 1 : 0
				}
				this.setCurrentValue(val)
			}
		},
		setValue(val, speed) {
			if (this.isDiff(this.val, val)) {
				this.val = val
				this.$emit('callback', this.val)
				this.$emit('input', this.isRange ? this.val.slice() : this.val)
			}
			this.$nextTick(() => {
				this.setPosition()
			})
		},
		setPosition(speed) {
			this.flag || this.setTransitionTime(speed === undefined ? this.speed : speed)
			if (this.isRange) {
				this.currentSlider = 0
				this.setTransform(this.position[this.currentSlider])
				this.currentSlider = 1
				this.setTransform(this.position[this.currentSlider])
			}
			else {
				this.setTransform(this.position)
			}
			this.flag || this.setTransitionTime(0)
		},
		setTransform(val) {
			let value = (this.direction === 'vertical' ? ((this.dotSize / 2) - val) : (val - (this.dotSize / 2))) * (this.reverse ? -1 : 1)
			let translateValue = this.direction === 'vertical' ? `translateY( ${value}px )` : `translateX( ${value}px )`
			let processSize = `${this.currentSlider === 0 ? this.position[1] - val : val - this.position[0]}px`
			let processPos = `${this.currentSlider === 0 ? val : this.position[0]}px`
			if (this.isRange) {
				this.slider[this.currentSlider].style.transform = translateValue
				this.slider[this.currentSlider].style.WebkitTransform = translateValue
				this.slider[this.currentSlider].style.msTransform = translateValue
				if (this.direction === 'vertical') {
					this.$refs.process.style.height = processSize
					this.$refs.process.style[this.reverse ? 'top' : 'bottom'] = processPos
				}
				else {
					this.$refs.process.style.width = processSize
					this.$refs.process.style[this.reverse ? 'right' : 'left'] = processPos
				}
			}
			else {
				this.slider.style.transform = translateValue
				this.slider.style.WebkitTransform = translateValue
				this.slider.style.msTransform = translateValue
				if (this.direction === 'vertical') {
					this.$refs.process.style.height = `${val}px`
					this.$refs.process.style[this.reverse ? 'top' : 'bottom'] = 0
				}
				else {
					this.$refs.process.style.width = `${val}px`
					this.$refs.process.style[this.reverse ? 'right' : 'left'] = 0
				}
			}
		},
		setTransitionTime(time) {
			time || this.$refs.process.offsetWidth
			if (this.isRange) {
				for (let i = 0; i < this.slider.length; i++) {
					this.slider[i].style.transitionDuration = `${time}s`
					this.slider[i].style.WebkitTransitionDuration = `${time}s`
				}
				this.$refs.process.style.transitionDuration = `${time}s`
				this.$refs.process.style.WebkitTransitionDuration = `${time}s`
			}
			else {
				this.slider.style.transitionDuration = `${time}s`
				this.slider.style.WebkitTransitionDuration = `${time}s`
				this.$refs.process.style.transitionDuration = `${time}s`
				this.$refs.process.style.WebkitTransitionDuration = `${time}s`
			}
		},
		getValue() {
			return this.val
		},
		getIndex() {
			if (Array.isArray(this.currentValue)) {
				return this.data ? this.currentValue : [(this.currentValue[0] - this.minimum) / this.spacing, (this.currentValue[1] - this.minimum) / this.spacing]
			}
			else {
				return (this.currentValue - this.minimum) / this.spacing
			}
		},
		getStaticData() {
			if (this.$refs.elem) {
				this.size = this.direction === 'vertical' ? this.$refs.elem.offsetHeight : this.$refs.elem.offsetWidth
				this.offset = this.direction === 'vertical' ? (this.$refs.elem.getBoundingClientRect().top + window.pageYOffset || document.documentElement.scrollTop) : this.$refs.elem.getBoundingClientRect().left
			}
		},
		refresh() {
			if (this.$refs.elem) {
				this.getStaticData()
				this.setPosition()
			}
		}
	},
	created() {
		window.addEventListener('resize', this.refresh)
	},
	mounted() {
		this.$nextTick(() => {
			this.getStaticData()
			this.setValue(this.value, 0)
			this.bindEvents()
		})
	},
	beforeDestroy() {
		this.unbindEvents()
	}
}
</script>

<style scoped>
.vue-slider-wrap {
	position: relative;
	box-sizing: border-box;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.vue-slider-wrap.vue-slider-disabled {
	opacity: .5;
	cursor: not-allowed;
}
.vue-slider-wrap.vue-slider-disabled .vue-slider-dot {
	cursor: not-allowed;
}
.vue-slider-wrap .vue-slider {
	position: relative;
	display: block;
	border-radius: 15px;
	background-color: #ccc;
}
.vue-slider-wrap .vue-slider::after {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
}
.vue-slider-process {
	position: absolute;
	border-radius: 15px;
	background-color: #3498db;
	transition: all 0s;
	z-index: 1;
}
.vue-slider-horizontal .vue-slider-process {
	width: 0;
	height: 100%;
	top: 0;
	left: 0;
}
.vue-slider-vertical .vue-slider-process {
	width: 100%;
	height: 0;
	bottom: 0;
	left: 0;
}
.vue-slider-horizontal-reverse .vue-slider-process {
	width: 0;
	height: 100%;
	top: 0;
	right: 0;
}
.vue-slider-vertical-reverse .vue-slider-process {
	width: 100%;
	height: 0;
	top: 0;
	left: 0;
}
.vue-slider-dot {
	position: absolute;
	border-radius: 50%;
	background-color: #fff;
	box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
	transition: all 0s;
	cursor: pointer;
	z-index: 3;
}
.vue-slider-horizontal .vue-slider-dot {
	left: 0;
}
.vue-slider-vertical .vue-slider-dot {
	bottom: 0;
}
.vue-slider-horizontal-reverse .vue-slider-dot {
	right: 0;
}
.vue-slider-vertical-reverse .vue-slider-dot {
	top: 0;
}
.vue-slider-tooltip {
	display: none;
	font-size: 14px;
	white-space: nowrap;
	position: absolute;
	padding: 2px 5px;
	min-width: 20px;
	text-align: center;
	color: #fff;
	border-radius: 5px;
	border: 1px solid #3498db;
	background-color: #3498db;
	z-index: 9;
}
.vue-slider-tooltip.vue-slider-tooltip-top  {
	top: -9px;
	left: 50%;
	transform: translate(-50%, -100%);
}
.vue-slider-tooltip.vue-slider-tooltip-bottom  {
	bottom: -9px;
	left: 50%;
	transform: translate(-50%, 100%);
}
.vue-slider-tooltip.vue-slider-tooltip-left  {
	top: 50%;
	left: -9px;
	transform: translate(-100%, -50%);
}
.vue-slider-tooltip.vue-slider-tooltip-right  {
	top: 50%;
	right: -9px;
	transform: translate(100%, -50%);
}
.vue-slider-tooltip.vue-slider-tooltip-top::before {
	content: '';
	position: absolute;
	bottom: -10px;
	left: 50%;
	width: 0;
	height: 0;
	border-width: 5px;
	border-width: 6px\0;
	border-style: solid;
	border-color: transparent;
	border-top-color: inherit;
	transform: translate(-50%, 0);
}
.vue-slider-tooltip.vue-slider-tooltip-bottom::before {
	content: '';
	position: absolute;
	top: -10px;
	left: 50%;
	width: 0;
	height: 0;
	border-width: 5px;
	border-width: 6px\0;
	border-style: solid;
	border-color: transparent;
	border-bottom-color: inherit;
	transform: translate(-50%, 0);
}
.vue-slider-tooltip.vue-slider-tooltip-left::before  {
	content: '';
	position: absolute;
	top: 50%;
	right: -10px;
	width: 0;
	height: 0;
	border-width: 5px;
	border-width: 6px\0;
	border-style: solid;
	border-color: transparent;
	border-left-color: inherit;
	transform: translate(0, -50%);
}
.vue-slider-tooltip.vue-slider-tooltip-right::before  {
	content: '';
	position: absolute;
	top: 50%;
	left: -10px;
	width: 0;
	height: 0;
	border-width: 5px;
	border-width: 6px\0;
	border-style: solid;
	border-color: transparent;
	border-right-color: inherit;
	transform: translate(0, -50%);
}
.vue-slider-dot.vue-slider-hover:hover .vue-slider-tooltip {
	display: block;
}
.vue-slider-dot.vue-slider-always .vue-slider-tooltip {
	display: block!important;
}
.vue-slider-piecewise {
	position: absolute;
	width: 100%;
	padding: 0;
	margin: 0;
	left: 0;
	top: 0;
	height: 100%;
	list-style: none;
}
.vue-slider-piecewise li {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.16);
	border-radius: 50%;
    z-index: 2;
}
.vue-slider-horizontal .vue-slider-piecewise li {
	top: 0;
}
.vue-slider-vertical .vue-slider-piecewise li {
	left: 0;
}
</style>
