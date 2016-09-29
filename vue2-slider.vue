<template>
	<span>
		<template v-if="isMoblie">
			<div ref="wrap" :class="['vue-slider-wrap', className, { 'vue-slider-disabled': disabled }]" v-show="show" :style="[( styles || {} ), wrapStyles]" @touchmove="moveing" @touchend="moveEnd" @click="wrapClick">
				<span class="vue-slider-min">
					<slot name="left">{{ data ? data[minimum] : minimum }}</slot>
				</span>
				<div ref="elem" class="vue-slider" :style="elemStyles">
					<div ref="dot" :data-rangeValue="value" :class="[ (tooltip ? `vue-slider-${tooltip}` : ''), 'vue-slider-dot' ]" :style="dotStyles" @touchstart="moveStart">
					</div>
					<template v-if="piecewise">
						<ul class="vue-slider-piecewise">
							<li v-for="(value, index) of total - 1" :style="[ piecewiseStyle, { left: `${gap*(index + 1) - height / 2}px` }]"></li>
						</ul>
					</template>
					<span ref="process" class="vue-slider-process"></span>
				</div>
				<span class="vue-slider-max">
					<slot name="right">{{ data ? data[maximum] : maximum }}</slot>
				</span>
			</div>
		</template>
		<template v-else>
			<div ref="wrap" :class="['vue-slider-wrap', className, { 'vue-slider-disabled': disabled }]" v-show="show" :style="[( styles || {} ), wrapStyles]" @mousemove="moveing" @mouseup="moveEnd" @mouseleave="moveEnd" @click="wrapClick">
				<span class="vue-slider-min">
					<slot name="left">{{ data ? data[minimum] : minimum }}</slot>
				</span>
				<div ref="elem" class="vue-slider" :style="elemStyles">
					<div ref="dot" :data-rangeValue="value" :class="[ `vue-slider-${tooltip}`, 'vue-slider-dot']" :style="dotStyles" @mousedown="moveStart">
					</div>
					<template v-if="piecewise">
						<ul class="vue-slider-piecewise">
							<li v-for="(value, index) of total - 1" :style="[ piecewiseStyle, { left: `${gap*(index + 1) - height / 2}px` }]"></li>
						</ul>
					</template>
					<span ref="process" class="vue-slider-process"></span>
				</div>
				<span class="vue-slider-max">
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
			isMoblie: /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone)/i.test(navigator.userAgent),
			flag: false,
			w: 0,
			currentValue: 0
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
		val: {
			type: [String, Number],
			default: 0
		}
	},
	computed: {
		minimum: function() {
			if (this.data) {
				return 0
			}
			return this.min
		},
		value: {
			get: function() {
				if (this.data) {
					return this.data[this.currentValue]
				}
				return this.currentValue
			},
			set: function(val) {
				if (this.data) {
					let index = this.data.indexOf(val)
					if (index > 0) {
						this.currentValue = this.data.indexOf(val)
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
				throw new Error('Prop[interval] is illegal, Please enter a valid interval')
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
			return (this.currentValue - this.minimum) / this.spacing * this.gap
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
		}
	},
	watch: {
		val: function(val) {
			this.flag || this.setValue(val)
		}
	},
	methods: {
		wrapClick(e) {
			if (this.disabled) return false
			let x = e.clientX - this.left
			this.setValueOnPos(x)
		},
		moveStart() {
			if (this.disabled) return false
			this.flag = true
		},
		moveing(e) {
			if (!this.flag) return false
			if (this.isMoblie) e = e.targetTouches[0]
			let x = e.clientX - this.left
			this.setValueOnPos(x, true)
		},
		moveEnd() {
			this.flag = false
			this.setPosition(0.2)
		},
		setValueOnPos(x, bool) {
			if (x >= 0 && x <= this.w) {
				this.setTransform(x)
				let v = Math.round(x / this.gap) * this.spacing + this.minimum
				this.setCurrentValue(v, bool)
			}
			else if (x < 0) {
				this.setTransform(0)
				this.setCurrentValue(this.minimum)
			}
			else {
				this.setTransform(this.w)
				this.setCurrentValue(this.maximum);
			}
		},
		setCurrentValue(val, bool) {
			if (val < this.minimum || val > this.maximum) return false
			else if (val !== this.currentValue) {
				this.currentValue = val
				this.$emit('callback', this.value)
			}
			bool || this.setPosition()
		},
		setIndex(val) {
			this.setCurrentValue(this.spacing * val + this.minimum)
		},
		setValue(val) {
			if (val !== this.value) {
				this.value = val
				this.$emit('callback', this.value)
			}
			this.setPosition()
		},
		setPosition(time = 0.5) {
			this.flag || this.setTransitionTime(time)
			this.setTransform(this.position)
			this.flag || this.setTransitionTime(0)
		},
		setTransform(val) {
			this.$refs.dot.style.transform = `translateX( ${val - (this.dotSize / 2)}px)`
			this.$refs.dot.style.WebkitTransform = `translateX( ${val - (this.dotSize / 2)}px)`
			this.$refs.process.style.width = `${val}px`
		},
		setTransitionTime(time) {
			time || this.$refs.dot.offsetWidth
			this.$refs.dot.style.transitionDuration = `${time}s`
			this.$refs.dot.style.webkitTransitionDuration = `${time}s`
			this.$refs.process.style.transitionDuration = `${time}s`
			this.$refs.process.style.webkitTransitionDuration = `${time}s`
		},
		refresh() {
			this.w = this.$refs.elem.offsetWidth
			this.setPosition(0)
		}
	},
	mounted() {
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
	display: flex;
    align-items: center;
    justify-content: center;
}
.vue-slider-wrap.vue-slider-disabled {
	opacity: .5;
	cursor: not-allowed;
}
.vue-slider-wrap .vue-slider {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    flex: 1;
    -webkit-user-select: none;
            user-select: none;
    border-radius: 15px;
    background-color: #ccc;
}
.vue-slider-process {
	width: 0;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
    -webkit-user-select: none;
            user-select: none;
	border-radius: 15px;
	background-color: #3498db;
    transition: all 0s;
    z-index: 1;
}
.vue-slider-dot {
    position: absolute;
    left: 0;
    -webkit-user-select: none;
            user-select: none;
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
	font-size: 14px;
	color: #3498db;
	vertical-align: middle;
}
.vue-slider-min {
	margin-right: 5px;
}
.vue-slider-max {
	margin-left: 5px;
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
