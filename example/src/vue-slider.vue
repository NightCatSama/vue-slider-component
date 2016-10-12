<template>
	<span>
		<template v-if="isMoblie">
			<div v-el:wrap :class="['vue-slider-wrap', flowDirection, className, { 'vue-slider-disabled': (isDisabled && this.eventType !== 'none') }]" v-show="show" :style="[( styles || {} ), wrapStyles]" @click="wrapClick">
				<div v-el:elem class="vue-slider" :style="elemStyles">
					<template v-if="isRange">
						<div v-el:dot0 :data-rangeValue="value[0]" :class="[ tooltipStatus, `vue-slider-tooltip-${tooltipDirection}`, 'vue-slider-dot']" :style="dotStyles" @touchstart="moveStart(0)"></div>
						<div v-el:dot1 :data-rangeValue="value[1]" :class="[ tooltipStatus, `vue-slider-tooltip-${tooltipDirection}`, 'vue-slider-dot']" :style="dotStyles" @touchstart="moveStart(1)"></div>
					</template>
					<template v-else>
						<div v-el:dot :data-rangeValue="value" :class="[ tooltipStatus, `vue-slider-tooltip-${tooltipDirection}`, 'vue-slider-dot']" :style="dotStyles" @touchstart="moveStart"></div>
					</template>
					<template v-if="piecewise">
						<ul v-if="direction === 'vertical'" class="vue-slider-piecewise">
							<li v-for="i in (total - 1)" :style="[ piecewiseStyle, { bottom: `${ gap * (i + 1) - width / 2 }px`, left: '0px' }]"></li>
						</ul>
						<ul v-else class="vue-slider-piecewise">
							<li v-for="i in (total - 1)" :style="[ piecewiseStyle, { left: `${ gap * (i + 1) - height / 2 }px`, top: '0px' }]"></li>
						</ul>
					</template>
					<span v-el:process class="vue-slider-process"></span>
				</div>
			</div>
		</template>
		<template v-else>
			<div v-el:wrap :class="['vue-slider-wrap', flowDirection, className, { 'vue-slider-disabled': (isDisabled && this.eventType !== 'none') }]" v-show="show" :style="[( styles || {} ), wrapStyles]" @click="wrapClick">
				<div v-el:elem class="vue-slider" :style="elemStyles">
					<template v-if="isRange">
						<div v-el:dot0 :data-rangeValue="value[0]" :class="[ tooltipStatus, `vue-slider-tooltip-${tooltipDirection}`, 'vue-slider-dot']" :style="dotStyles" @mousedown="moveStart(0)"></div>
						<div v-el:dot1 :data-rangeValue="value[1]" :class="[ tooltipStatus, `vue-slider-tooltip-${tooltipDirection}`, 'vue-slider-dot']" :style="dotStyles" @mousedown="moveStart(1)"></div>
					</template>
					<template v-else>
						<div v-el:dot :data-rangeValue="value" :class="[ tooltipStatus, `vue-slider-tooltip-${tooltipDirection}`, 'vue-slider-dot']" :style="dotStyles" @mousedown="moveStart"></div>
					</template>
					<template v-if="piecewise">
						<ul v-if="direction === 'vertical'" class="vue-slider-piecewise">
							<li v-for="i in (total - 1)" :style="[ piecewiseStyle, { bottom: `${ gap * (i + 1) - width / 2 }px`, left: '0px' }]"></li>
						</ul>
						<ul v-else class="vue-slider-piecewise">
							<li v-for="i in (total - 1)" :style="[ piecewiseStyle, { left: `${ gap * (i + 1) - height / 2 }px`, top: '0px' }]"></li>
						</ul>
					</template>
					<span v-el:process class="vue-slider-process"></span>
				</div>
			</div>
		</template>
	</span>
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
		className: String,
		styles: Object,
		width: {
			type: [Number, String],
			default: 'auto'
		},
		height: {
			type: [Number, String],
			default: 4
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
		tooltipDir: {
			type: String
		},
		reverse: {
			type: Boolean,
			default: false
		},
		speed: {
			type: Number,
			default: 0.5
		},
		val: {
			type: [String, Number, Array],
			default: 0
		}
	},
	computed: {
		flowDirection: function() {
			return `vue-slider-${this.direction + (this.reverse ? '-reverse' : '')}`
		},
		tooltipDirection: function() {
			return this.tooltipDir || (this.direction === 'vertical' ? 'left' : 'top')
		},
		tooltipStatus: function() {
			if (this.tooltip === 'hover' && this.flag) return 'vue-slider-always'
			return this.tooltip ? `vue-slider-${this.tooltip}` : ''
		},
		isMoblie: function() {
			if (this.eventType === 'touch') {
				return true
			}
			else if (this.eventType === 'mouse') {
				return false
			}
			else {
				return /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|Mobile)/i.test(navigator.userAgent)
			}
		},
		isDisabled: function() {
			return this.eventType === 'none' ? true : this.disabled
		},
		isRange: function() {
			return Array.isArray(this.val)
		},
		slider: function() {
			if (this.isRange) {
				return [this.$els.dot0, this.$els.dot1]
			}
			else {
				return this.$els.dot
			}
		},
		minimum: function() {
			if (this.data) {
				return 0
			}
			return this.min
		},
		value: {
			get: function() {
				if (this.data) {
					if (this.isRange) {
						return [this.data[this.currentValue[0]], this.data[this.currentValue[1]]]
					}
					return this.data[this.currentValue]
				}
				return this.currentValue
			},
			set: function(val) {
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
		maximum: function() {
			if (this.data) {
				return this.data.length - 1
			}
			return this.max
		},
		spacing: function() {
			if (this.data) {
				return 1
			}
			return this.interval
		},
		total: function() {
			if (this.data) {
				return this.data.length - 1
			}
			if ((this.maximum - this.minimum) % this.interval !== 0) {
				console.error('[Vue warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible')
			}
			return (this.maximum - this.minimum) / this.interval
		},
		gap: function() {
			return this.size / this.total
		},
		offset: function() {
			return this.direction === 'vertical' ? (this.$els.elem.getBoundingClientRect().top + window.pageYOffset || document.documentElement.scrollTop) : this.$els.elem.getBoundingClientRect().left
		},
		position: function() {
			if (this.isRange) {
				return [(this.currentValue[0] - this.minimum) / this.spacing * this.gap, (this.currentValue[1] - this.minimum) / this.spacing * this.gap]
			}
			return (this.currentValue - this.minimum) / this.spacing * this.gap
		},
		limit: function() {
			if (this.isRange) {
				return [[0, this.position[1]], [this.position[0], this.size]]
			}
			return [0, this.size]
		},
		valueLimit: function() {
			if (this.isRange) {
				return [[this.minimum, this.currentValue[1]], [this.currentValue[0], this.maximum]]
			}
			return [this.minimum, this.maximum]
		},
		wrapStyles: function() {
			if (this.direction === 'vertical') {
				return {
					height: typeof this.height === 'number' ? `${this.height}px` : this.height
				}
			}
			return {
				width: typeof this.width === 'number' ? `${this.width}px` : this.width
			}
		},
		elemStyles: function() {
			if (this.direction === 'vertical') {
				return {
					width: `${this.width}px`,
					height: '100%',
					margin: `${this.dotSize / 2}px`
				}
			}
			return {
				height: `${this.height}px`,
				margin: `${this.dotSize / 2}px`
			}
		},
		dotStyles: function() {
			if (this.direction === 'vertical') {
				return {
					width: `${this.dotSize}px`,
					height: `${this.dotSize}px`,
					left: `${(-(this.dotSize - this.width) / 2)}px`
				}
			}
			return {
				width: `${this.dotSize}px`,
				height: `${this.dotSize}px`,
				top: `${(-(this.dotSize - this.height) / 2)}px`
			}
		},
		piecewiseStyle: function() {
			if (this.direction === 'vertical') {
				return {
					width: `${this.width}px`,
					height: `${this.width}px`
				}
			}
			return {
				width: `${this.height}px`,
				height: `${this.height}px`
			}
		}
	},
	watch: {
		currentValue: function(val) {
			this.val = this.value
		},
		val: function(val) {
			this.flag || this.setValue(val)
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
		getPos(e) {
			let pos
			if (this.direction === 'vertical') {
				pos = this.reverse ? (e.pageY - this.offset) : (this.size - (e.pageY - this.offset))
			}
			else {
				pos = this.reverse ? (this.size - (e.clientX - this.offset)) : (e.clientX - this.offset)
			}
			return pos
		},
		wrapClick(e) {
			if (this.isDisabled || e.target.classList.contains('vue-slider-dot')) return false
			this.setValueOnPos(this.getPos(e))
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
			if (this.flag) this.$emit('drag-end', this)
			this.flag = false
			this.setPosition(0.2)
		},
		setValueOnPos(x, bool) {
			let range = this.isRange ? this.limit[this.currentSlider] : this.limit
			let valueRange = this.isRange ? this.valueLimit[this.currentSlider] : this.valueLimit
			if (x >= range[0] && x <= range[1]) {
				this.setTransform(x)
				let v = Math.round(x / this.gap) * this.spacing + this.minimum
				this.setCurrentValue(v, bool)
			}
			else if (x < range[0]) {
				this.setTransform(range[0])
				this.setCurrentValue(valueRange[0])
				if (this.currentSlider === 1) this.currentSlider = 0
			}
			else {
				this.setTransform(range[1])
				this.setCurrentValue(valueRange[1]);
				if (this.currentSlider === 0) this.currentSlider = 1
			}
		},
		isDiff(a, b) {
			if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
				return true
			}
			else if (Array.isArray(a) && a.length === b.length) {
				return a.some((v, i) => {
					return v !== b[i]
				})
			}
			return a !== b
		},
		setCurrentValue(val, bool) {
			if (val < this.minimum || val > this.maximum) return false
			if (this.isRange) {
				if (this.isDiff(this.currentValue[this.currentSlider], val)) {
					this.currentValue.splice(this.currentSlider, 1, val)
					this.$emit('callback', this.value)
				}
			}
			else if (this.isDiff(this.currentValue, val)) {
				this.currentValue = val
				this.$emit('callback', this.value)
			}
			bool || this.setPosition()
		},
		setIndex(val) {
			val = this.spacing * val + this.minimum
			if (this.isRange) {
				this.currentSlider = val > ((this.currentValue[1] - this.currentValue[0]) / 2 + this.currentValue[0]) ? 1 : 0
			}
			this.setCurrentValue(val)
		},
		setValue(val) {
			if (this.isDiff(this.value, val)) {
				this.value = val
				this.$emit('callback', this.value)
			}
			this.setPosition()
		},
		setPosition(time = this.speed) {
			this.flag || this.setTransitionTime(time)
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
					this.$els.process.style.height = processSize
					this.$els.process.style[this.reverse ? 'top' : 'bottom'] = processPos
				}
				else {
					this.$els.process.style.width = processSize
					this.$els.process.style[this.reverse ? 'right' : 'left'] = processPos
				}
			}
			else {
				this.slider.style.transform = translateValue
				this.slider.style.WebkitTransform = translateValue
				this.slider.style.msTransform = translateValue
				if (this.direction === 'vertical') {
					this.$els.process.style.height = `${val}px`
				}
				else {
					this.$els.process.style.width = `${val}px`
				}
			}
		},
		setTransitionTime(time) {
			time || this.$els.process.offsetWidth
			if (this.isRange) {
				for (let i = 0; i < this.slider.length; i++) {
					this.slider[i].style.transitionDuration = `${time}s`
					this.slider[i].style.WebkitTransitionDuration = `${time}s`
				}
				this.$els.process.style.transitionDuration = `${time}s`
				this.$els.process.style.WebkitTransitionDuration = `${time}s`
			}
			else {
				this.slider.style.transitionDuration = `${time}s`
				this.slider.style.WebkitTransitionDuration = `${time}s`
				this.$els.process.style.transitionDuration = `${time}s`
				this.$els.process.style.WebkitTransitionDuration = `${time}s`
			}
		},
		getValue() {
			return this.value
		},
		getIndex() {
			if (Array.isArray(this.currentValue)) {
				if (this.data) {
					return this.currentValue
				}
				else {
					return [(this.currentValue[0] - this.minimum) / this.spacing, (this.currentValue[1] - this.minimum) / this.spacing]
				}
			}
			else {
				return (this.currentValue - this.minimum) / this.spacing
			}
		},
		refresh() {
			this.size = this.direction === 'vertical' ? this.$els.elem.offsetHeight : this.$els.elem.offsetWidth
			this.setPosition(0)
		}
	},
	created() {
		window.addEventListener('resize', this.refresh)
	},
	ready() {
		this.size = this.direction === 'vertical' ? this.$els.elem.offsetHeight : this.$els.elem.offsetWidth
		this.setValue(this.val)
		this.bindEvents()
	},
	destroyed() {
		this.unbindEvents()
	}
}
</script>

<style scoped>
.vue-slider-wrap {
	position: relative;
    display: block;
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
.vue-slider-dot::after {
	content: attr(data-rangevalue);
	display: none;
	font-size: 14px;
	white-space: nowrap;
	position: absolute;
	padding: 2px 5px;
	color: #fff;
	border-radius: 5px;
	background-color: #3498db;
	z-index: 9;
}
.vue-slider-dot.vue-slider-tooltip-top::after  {
	top: 0;
	left: 50%;
	transform: translate(-50%, calc(-100% - 10px));
}
.vue-slider-dot.vue-slider-tooltip-bottom::after  {
	top: 100%;
	left: 50%;
	transform: translate(-50%, 10px);
}
.vue-slider-dot.vue-slider-tooltip-left::after  {
	top: 50%;
	left: 0;
	transform: translate(calc(-100% - 10px), -50%);
}
.vue-slider-dot.vue-slider-tooltip-right::after  {
	top: 50%;
	left: 100%;
	transform: translate(10px, -50%);
}
.vue-slider-dot.vue-slider-tooltip-top::before {
	content: '';
	display: none;
	position: absolute;
	top: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-top-color: #3498db;
    transform: translateX(-50%);
}
.vue-slider-dot.vue-slider-tooltip-bottom::before {
	content: '';
	display: none;
	position: absolute;
	top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-bottom-color: #3498db;
    transform: translateX(-50%);
}
.vue-slider-dot.vue-slider-tooltip-left::before  {
	content: '';
	display: none;
	position: absolute;
	top: 50%;
    left: -10px;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-left-color: #3498db;
    transform: translateY(-50%);
}
.vue-slider-dot.vue-slider-tooltip-right::before  {
	content: '';
	display: none;
	position: absolute;
	top: 50%;
    left: 100%;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-right-color: #3498db;
    transform: translateY(-50%);
}
.vue-slider-dot.vue-slider-hover:hover::before, .vue-slider-dot.vue-slider-hover:hover::after {
	display: block;
}
.vue-slider-dot.vue-slider-always::before, .vue-slider-dot.vue-slider-always::after {
	display: block!important;
}
.vue-slider-piecewise {
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
