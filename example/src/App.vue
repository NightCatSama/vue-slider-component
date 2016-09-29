<template>
	<div id="app">
		<section data-title="Default">
			<div>
				<vue-slider ref="slider1" :val="val1" @callback="getVal1"></vue-slider>
				<h1><small>Value: </small>{{ val1 }}</h1>
				<div class="btn-group">
					<button @click="setVal(1, 20)">set value => 20</button>
					<button @click="setVal(1, 100)">set value => 100</button>
				</div>
			</div>
			<div>
				<code>{
<span class="green">width</span>: <span class="yellow">'auto'</span><small class="gray">// 组件宽度</small>,
<span class="green">height</span>: <span class="yellow">4</span><small class="gray">// 组件高度</small>,
<span class="green">dotSize</span>: <span class="yellow">16</span><small class="gray">// 滑块大小</small>,
<span class="green">min</span>: <span class="yellow">0</span><small class="gray">// 最小值</small>,
<span class="green">max</span>: <span class="yellow">100</span><small class="gray">// 最大值</small>,
<span class="green">interval</span>: <span class="yellow">1</span><small class="gray">// 分段间隔</small>,
<span class="green">disabled</span>: <span class="yellow">false</span><small class="gray">// 是否不可用</small>,
<span class="green">show</span>: <span class="yellow">true</span><small class="gray">// 是否显示组件</small>,
<span class="green">tooltip</span>: <span class="yellow">false</span><small class="gray">// 是否显示工具提示</small>,
<span class="green">piecewise</span>: <span class="yellow">false</span><small class="gray">// 是否显示分段样式</small>,
<span class="green">val</span>: <span class="yellow">1</span><small class="gray">// 初始值</small>
}</code>
			</div>
		</section>
		<section data-title="Demo1">
			<div>
				<vue-slider ref="slider2" :width="250" :height="10" :dot-size="30" :min="1" :max="25" :interval="4" :piecewise="true" :tooltip="tooltip" :disabled="disabled" :val="val2" @callback="getVal2"></vue-slider>
				<h1><small>Value: </small>{{ val2 }}</h1>
				<div class="btn-group">
					<button @click="setVal(2, 5)">set value => 5</button>
					<button @click="setVal(2, 25)">set value => 25</button>
					<button @click="setDisabled">set disabled</button>
					<button @click="setTooltip">switch tooltip</button>
				</div>
			</div>
			<div>
				<code>{
<span class="green">width</span>: <span class="yellow">250</span>,
<span class="green">height</span>: <span class="yellow">10</span>,
<span class="green">dotSize</span>: <span class="yellow">30</span>,
<span class="green">min</span>: <span class="yellow">1</span>,
<span class="green">max</span>: <span class="yellow">25</span>,
<span class="green">interval</span>: <span class="yellow">4</span>,
<span class="green">disabled</span>: <span class="yellow">{{disabled}}</span>,
<span class="green">show</span>: <span class="yellow">true</span>,
<span class="green">tooltip</span>: <span class="yellow">{{tooltip}}</span>,
<span class="green">piecewise</span>: <span class="yellow">true</span>,
<span class="green">val</span>: <span class="yellow">{{val2}}</span>
}</code>
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
			msg: 'Hello Vue!',
			val1: 0,
			val2: 25,
			disabled: false,
			tooltip: 'hover'
		}
	},
	methods: {
		getVal1(val) {
			this.val1 = val
		},
		getVal2(val) {
			this.val2 = val
		},
		setDisabled() {
			this.disabled = !this.disabled
		},
		setTooltip() {
			this.tooltip = this.tooltip === 'hover' ? 'always' : 'hover'
		},
		setVal(kind, num) {
			this[`val${kind}`] = num
			this.$refs[`slider${kind}`].setValue(num)
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
    white-space: pre-wrap;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
}
</style>
