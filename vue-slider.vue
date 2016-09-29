<template>
	<span>
		<template v-if="isMoblie">
			<div ref="wrap" :class="['vue-slider-wrap', { 'vue-slider-disabled': disabled }]" v-show="show" :style="wrapStyles" @touchmove="moveing" @touchend="moveEnd" @click="wrapClick">
				<span class="vue-slider-min">
					<slot name="left">{{ min }}</slot>
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
					<slot name="right">{{ max }}</slot>
				</span>
			</div>
		</template>
		<template v-else>
			<div ref="wrap" :class="['vue-slider-wrap', { 'vue-slider-disabled': disabled }]" v-show="show" :style="wrapStyles" @mousemove="moveing" @mouseup="moveEnd" @mouseleave="moveEnd" @click="wrapClick">
				<span class="vue-slider-min">
					<slot name="left">{{ min }}</slot>
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
					<slot name="right">{{ max }}</slot>
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
			value: 0
		}
	},
	props: {
		width: {
			type: [Number, String],
			default: 'auto'
		},
		height: {
			type: Number,
			default: 4
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
			type: Number,
			default: 0
		}
	},
	computed: {
		total: function() {
			if ((this.max - this.min) % this.interval !== 0) {
				throw new Error('Prop[interval] is illegal, Please enter a valid interval')
			}
			return (this.max - this.min) / this.interval
		},
		gap: function() {
			return this.w / this.total
		},
		left: function() {
			return this.$refs.elem.getBoundingClientRect().left
		},
		position: function() {
			return (this.value - this.min) / this.interval * this.gap
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
				height: `${this.height}px`,
				top: `0`
			}
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
				let v = Math.round(x / this.gap) * this.interval + this.min
				this.setValue(v, bool)
			}
			else if (x < 0) {
				this.setTransform(0)
				this.setValue(this.min)
			}
			else {
				this.setTransform(this.w)
				this.setValue(this.max);
			}
		},
		setValue(val, bool) {
			if (val < this.min || val > this.max) return false
			val !== this.value && this.$emit('callback', val)
			this.value = val
			bool || this.setPosition()
		},
		setPosition(time = 0.5) {
			this.flag || this.setTransitionTime(time)
			this.setTransform(this.position)
			this.flag || this.setTransitionTime(0)
		},
		setTransform(val) {
			this.$refs.dot.style.transform = `translateX( ${val - (this.dotSize / 2)}px)`
			this.$refs.dot.style.WebkitTransform = `translateX( ${val - (this.dotSize / 2)}px)`
			this.$refs.process.style.width = `${this.position}px`
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
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
       -moz-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
       -moz-box-pack: center;
        -ms-flex-pack: center;
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
    -webkit-box-flex: 1;
    -webkit-flex: 1;
       -moz-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    -webkit-user-select: none;
            -moz-user-select: none;
             -ms-user-select: none;
         user-select: none;
    -webkit-border-radius: 15px;
       -moz-border-radius: 15px;
            border-radius: 15px;
    /* background-color: #3498db; */
    background-color: #ccc;
}
.vue-slider-process {
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
    -webkit-user-select: none;
            -moz-user-select: none;
             -ms-user-select: none;
         user-select: none;
	-webkit-border-radius: 15px;
	   -moz-border-radius: 15px;
	        border-radius: 15px;
	background-color: #3498db;
    -webkit-transition: all 0s;
    -o-transition: all 0s;
    -moz-transition: all 0s;
    transition: all 0s;
    z-index: 1;
}
.vue-slider-dot {
    position: absolute;
    left: 0;
    -webkit-user-select: none;
            -moz-user-select: none;
             -ms-user-select: none;
         user-select: none;
    -webkit-border-radius: 50%;
       -moz-border-radius: 50%;
            border-radius: 50%;
    background-color: #f1c40f;
    -webkit-transition: all 0s;
    -o-transition: all 0s;
    -moz-transition: all 0s;
    transition: all 0s;
    z-index: 3;
}
.vue-slider-dot::after {
	content: attr(data-rangevalue);
	display: none;
	font-size: 14px;
	position: absolute;
	top: 0;
	left: 50%;
	padding: 2px 5px;
	color: #fff;
	-webkit-border-radius: 5px;
	   -moz-border-radius: 5px;
	        border-radius: 5px;
	background-color: #3498db;
	-webkit-transform: translate(-50%, -webkit-calc(-100% - 10px));
	   -moz-transform: translate(-50%, -moz-calc(-100% - 10px));
	    -ms-transform: translate(-50%, calc(-100% - 10px));
	     -o-transform: translate(-50%, calc(-100% - 10px));
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
    -webkit-transform: translateX(-50%);
       -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
         -o-transform: translateX(-50%);
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
	background-color: rgba(0, 0, 0, 0.16);
	-webkit-border-radius: 50%;
	   -moz-border-radius: 50%;
	        border-radius: 50%;
    z-index: 2;
}
</style>
