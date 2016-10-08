<template>
	<span>
		<template v-if="isMoblie">
			<div v-el:wrap :class="['vue-slider-wrap', className, { 'vue-slider-disabled': (isDisabled && this.eventType !== 'none') }]" v-show="show" :style="[( styles || {} ), wrapStyles]" @touchmove="moveing" @touchend="moveEnd" @click="wrapClick">
				<span class="vue-slider-min" :style="valueStyle">
					<slot name="left">{{ data ? data[minimum] : minimum }}</slot>
				</span>
				<div v-el:elem class="vue-slider" :style="elemStyles">
					<template v-if="isRange">
						<div v-el:dot0 :data-rangeValue="value[0]" :class="[ `vue-slider-${tooltip}`, 'vue-slider-dot']" :style="dotStyles" @touchstart="moveStart(0)"></div>
						<div v-el:dot1 :data-rangeValue="value[1]" :class="[ `vue-slider-${tooltip}`, 'vue-slider-dot']" :style="dotStyles" @touchstart="moveStart(1)"></div>
					</template>
					<template v-else>
						<div v-el:dot :data-rangeValue="value" :class="[ `vue-slider-${tooltip}`, 'vue-slider-dot']" :style="dotStyles" @touchstart="moveStart"></div>
					</template>
					<template v-if="piecewise">
						<ul class="vue-slider-piecewise">
							<li v-for="(value, index) of total - 1" :style="[ piecewiseStyle, { left: `${gap*(index + 1) - height / 2}px` }]"></li>
						</ul>
					</template>
					<span v-el:process class="vue-slider-process"></span>
				</div>
				<span class="vue-slider-max" :style="valueStyle">
					<slot name="right">{{ data ? data[maximum] : maximum }}</slot>
				</span>
			</div>
		</template>
		<template v-else>
			<div v-el:wrap :class="['vue-slider-wrap', className, { 'vue-slider-disabled': (isDisabled && this.eventType !== 'none') }]" v-show="show" :style="[( styles || {} ), wrapStyles]" @mousemove="moveing" @mouseup="moveEnd" @mouseleave="moveEnd" @click="wrapClick">
				<span class="vue-slider-min" :style="valueStyle">
					<slot name="left">{{ data ? data[minimum] : minimum }}</slot>
				</span>
				<div v-el:elem class="vue-slider" :style="elemStyles">
					<template v-if="isRange">
						<div v-el:dot0 :data-rangeValue="value[0]" :class="[ `vue-slider-${tooltip}`, 'vue-slider-dot']" :style="dotStyles" @mousedown="moveStart(0)"></div>
						<div v-el:dot1 :data-rangeValue="value[1]" :class="[ `vue-slider-${tooltip}`, 'vue-slider-dot']" :style="dotStyles" @mousedown="moveStart(1)"></div>
					</template>
					<template v-else>
						<div v-el:dot :data-rangeValue="value" :class="[ `vue-slider-${tooltip}`, 'vue-slider-dot']" :style="dotStyles" @mousedown="moveStart"></div>
					</template>
					<template v-if="piecewise">
						<ul class="vue-slider-piecewise">
							<li v-for="(v, i) of total - 1" :style="[ piecewiseStyle, { left: `${gap*(i + 1) - height / 2}px` }]"></li>
						</ul>
					</template>
					<span v-el:process class="vue-slider-process"></span>
				</div>
				<span class="vue-slider-max" :style="valueStyle">
					<slot name="right">{{ data ? data[maximum] : maximum }}</slot>
				</span>
			</div>
		</template>
	</span>
</template>
<script>
export default {
	data() {
		return {
			flag: false,
			w: 0,
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
			type: Number,
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
			default: false
		},
		eventType: {
			type: String,
			default: 'auto'
		},
		val: {
			type: [String, Number, Array],
			default: 0
		}
	},
	computed: {
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
				return [this.$refs.dot0, this.$refs.dot1]
			}
			else {
				return this.$refs.dot
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
			return this.w / this.total
		},
		left: function() {
			return this.$refs.elem.getBoundingClientRect().left
		},
		position: function() {
			if (this.isRange) {
				return [(this.currentValue[0] - this.minimum) / this.spacing * this.gap, (this.currentValue[1] - this.minimum) / this.spacing * this.gap]
			}
			return (this.currentValue - this.minimum) / this.spacing * this.gap
		},
		limit: function() {
			if (this.isRange) {
				return [[0, this.position[1]], [this.position[0], this.w]]
			}
			return [0, this.w]
		},
		valueLimit: function() {
			if (this.isRange) {
				return [[this.minimum, this.currentValue[1]], [this.currentValue[0], this.maximum]]
			}
			return [this.minimum, this.maximum]
		},
		wrapStyles: function() {
			return {
				width: typeof this.width === 'number' ? `${this.width}px` : this.width
			}
		},
		elemStyles: function() {
			return {
				height: `${this.height}px`,
				margin: `${this.dotSize / 2}px`
			}
		},
		dotStyles: function() {
			return {
				width: `${this.dotSize}px`,
				height: `${this.dotSize}px`,
				top: `${(-(this.dotSize - this.height) / 2)}px`
			}
		},
		piecewiseStyle: function() {
			return {
				width: `${this.height}px`,
				height: `${this.height}px`
			}
		},
		valueStyle: function() {
			return {
				top: `${this.height / 2 + this.dotSize / 2}px`
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
		wrapClick(e) {
			if (this.isDisabled || e.target.classList.contains('vue-slider-dot')) return false
			let x = e.clientX - this.left
			if (this.isRange) {
				this.currentSlider = x > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
			}
			this.setValueOnPos(x)
		},
		moveStart(index) {
			if (this.isDisabled) return false
			else if (this.isRange) {
				this.currentSlider = index
			}
			this.flag = true
		},
		moveing(e) {
			if (!this.flag) return false
			if (this.isMoblie) e = e.targetTouches[0]
			let x = e.clientX - this.left
			this.setValueOnPos(x, true)
		},
		moveEnd(e) {
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
		setPosition(time = 0.5) {
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
			if (this.isRange) {
				this.slider[this.currentSlider].style.transform = `translateX( ${val - (this.dotSize / 2)}px)`
				this.slider[this.currentSlider].style.WebkitTransform = `translateX( ${val - (this.dotSize / 2)}px)`
				this.slider[this.currentSlider].style.msTransform = `translateX( ${val - (this.dotSize / 2)}px)`
				this.$refs.process.style.width = `${this.currentSlider === 0 ? this.position[1] - val : val - this.position[0]}px`
				this.$refs.process.style.left = `${this.currentSlider === 0 ? val : this.position[0]}px`
			}
			else {
				this.slider.style.transform = `translateX( ${val - (this.dotSize / 2)}px)`
				this.slider.style.WebkitTransform = `translateX( ${val - (this.dotSize / 2)}px)`
				this.slider.style.msTransform = `translateX( ${val - (this.dotSize / 2)}px)`
				this.$refs.process.style.width = `${val}px`
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
			this.w = this.$refs.elem.offsetWidth
			this.setPosition(0)
		}
	},
	ready() {
		this.w = this.$refs.elem.offsetWidth
		this.setValue(this.val)
	},
	created() {
		window.addEventListener('resize', this.refresh)
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
	width: 0;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 15px;
	background-color: #3498db;
    transition: all 0s;
    z-index: 1;
}
.vue-slider-dot {
    position: absolute;
    left: 0;
    border-radius: 50%;
    background-color: #f1c40f;
    transition: all 0s;
    cursor: pointer;
    z-index: 3;
}
.vue-slider-dot::after {
	content: attr(data-rangevalue);
	display: none;
	font-size: 14px;
	white-space: nowrap;
	position: absolute;
	top: 0;
	left: 50%;
	padding: 2px 5px;
	color: #fff;
	border-radius: 5px;
	background-color: #3498db;
	transform: translate(-50%, calc(-100% - 10px));
	z-index: 9;
}
.vue-slider-dot::before {
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
.vue-slider-dot.vue-slider-hover:hover::before, .vue-slider-dot.vue-slider-hover:hover::after {
	display: block;
}
.vue-slider-dot.vue-slider-always::before, .vue-slider-dot.vue-slider-always::after {
	display: block!important;
}
.vue-slider-min, .vue-slider-max {
	position: absolute;
	font-size: 14px;
	color: #3498db;
}
.vue-slider-min {
	margin-right: 5px;
	left: 0;
}
.vue-slider-max {
	margin-left: 5px;
	right: 0;
	z-index: 3;
}
.vue-slider-piecewise {
	list-style: none;
}
.vue-slider-piecewise li {
	position: absolute;
	top: 0;
	background-color: rgba(0, 0, 0, 0.16);
	border-radius: 50%;
    z-index: 2;
}
</style>
