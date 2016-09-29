<template>
	<div id="app">
		<section data-title="Default">
			<div>
				<vue-slider ref="slider1" :val="demo.default.val" @callback="getVal1"></vue-slider>
				<h1><small>Value: </small>{{ demo.default.val }}</h1>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.default">
					<span class="green">{{ key }}</span>: <span class="yellow">{{ value }}</span><small class="gray">// {{ demo.annotation[key] }}</small><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Demo">
			<div>
				<!-- I miss {...props} -->
				<vue-slider ref="slider2" :width="demo.demo1.width" :height="demo.demo1.height" :dot-size="demo.demo1.dotSize" :min="demo.demo1.min" :max="demo.demo1.max" :interval="demo.demo1.interval" :piecewise="demo.demo1.piecewise" :tooltip="demo.demo1.tooltip" :disabled="demo.demo1.disabled" :val="demo.demo1.val" @callback="getVal2"></vue-slider>
				<h1><small>Value: </small>{{ demo.demo1.val }}</h1>
				<div class="btn-group">
					<button @click="setVal('demo1', 21)">set value = 21</button>
					<button @click="setIndex(2, 2)">set index = 2</button>
					<button @click="setDisabled('demo1')">set disabled</button>
					<button @click="setTooltip('demo1')">switch tooltip</button>
				</div>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo1">
					<span class="green">{{ key }}</span>: <span class="yellow">{{ value }}</span><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Custom Data">
			<div>
				<vue-slider ref="slider3" width="80%" :piecewise="demo.demo2.piecewise" :tooltip="demo.demo2.tooltip" :interval="4" :disabled="demo.demo2.disabled" :data="demo.demo2.data" :val="demo.demo2.val" @callback="getVal3"></vue-slider>
				<h1><small>Value: </small>{{ demo.demo2.val }}</h1>
				<div class="btn-group">
					<button @click="setVal('demo2', '2016-10-06')">set value = 2016-10-06</button>
					<button @click="setIndex(3, 3)">set index = 3</button>
					<button @click="setDisabled('demo2')">set disabled</button>
					<button @click="setTooltip('demo2')">switch tooltip</button>
				</div>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo2">
					<span class="green">{{ key }}</span>: <span class="yellow">{{ value }}</span><br>
				</template>}</code>
			</div>
		</section>
	</div>
</template>

<script>
import { vue2Slider as vueSlider } from './index.js';

export default {
	components: {
		vueSlider
	},
	data () {
		return {
			demo: {
				default: {
					width: 'auto',
					height: 4,
					dotSize: 16,
					min: 0,
					max: 100,
					interval: 1,
					disabled: false,
					show: true,
					tooltip: false,
					piecewise: false,
					val: 1
				},
				demo1: {
					width: 250,
					height: 8,
					dotSize: 20,
					min: 1,
					max: 25,
					interval: 4,
					disabled: false,
					show: true,
					tooltip: 'hover',
					piecewise: true,
					val: 1
				},
				demo2: {
					width: '80%',
					tooltip: 'always',
					disabled: false,
					piecewise: true,
					data: [
					  "2016-10-01",
					  "2016-10-02",
					  "2016-10-03",
					  "2016-10-04",
					  "2016-10-05",
					  "2016-10-06",
					  "2016-10-07"
					],
					val: '2016-10-01'
				},
				annotation: {
					width: '组件宽度',
					height: '组件高度',
					dotSize: '滑块大小',
					min: '最小值',
					max: '最大值',
					interval: '分段间隔',
					disabled: '是否不可用',
					show: '是否显示组件',
					tooltip: '是否显示工具提示',
					piecewise: '是否显示分段样式',
					val: '初始值'
				}
			}
		}
	},
	methods: {
		getVal1(val) {
			console.info(val)
			this.demo.default.val = val
		},
		getVal2(val) {
			console.info(val)
			this.demo.demo1.val = val
		},
		getVal3(val) {
			console.info(val)
			this.demo.demo2.val = val
		},
		setDisabled(name) {
			let obj = this.demo[name]
			obj.disabled = !obj.disabled
		},
		setTooltip(name) {
			let obj = this.demo[name]
			obj.tooltip = obj.tooltip === 'hover' ? 'always' : 'hover'
		},
		setVal(name, num) {
			let obj = this.demo[name]
			obj.val = num
		},
		setIndex(kind, num) {
			this.$refs[`slider${kind}`].setIndex(num)
		}
	}
}
</script>

<style>
* {
}
body {
	font-family: Helvetica, sans-serif;
	margin: 0;
	padding: 0;
}

#app {
}

section {
	padding: 60px 20px 20px 20px;
	margin: 10px;
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, .36);
	max-width: 800px;
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
}

section::after {
	content: attr(data-title);
	position: absolute;
	left: 5px;
	top: 5px;
	font-size: 14px;
	font-weight: bold;
	color: #333;
}
.btn-group {
	margin: 10px 0;
}

.btn-group button {
    padding: 8px 12px;
    display: inline-block;
    border: none;
    background-color: #ccc;
    border-radius: 3px;
    transition: background-color .2s;
    margin: 5px 10px 5px 0;
}

.green {
	color: #2ecc71;
}

.yellow {
	color: #ffd400;
}

.gray {
	color: #D3DCE6;
}

code {
    padding: 10px 20px;
    margin: 0;
    display: block;
    background-color: #333;
    color: #fff;
    white-space: pre-line;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
}
</style>
