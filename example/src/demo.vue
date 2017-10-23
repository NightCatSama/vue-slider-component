<template>
	<div class="container">
		<h1>Example</h1>
		<section data-title="Default" id="demo">
			<div>
				<vue-slider  @callback="cb" ref="slider" v-bind="demo.default" v-model="demo.default.value"></vue-slider>
				<h3><small>Value: </small>{{ demo.default.value }}</h3>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.default">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><small class="gray ml-sm">// {{ demo.annotation[key] }}</small><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Lazy" id="demo1">
			<div>
				<vue-slider  @callback="cb" ref="slider1" v-bind="demo.demo1" v-model="demo.demo1.value"></vue-slider>
				<h3><small>Value: </small>{{ demo.demo1.value }}</h3>
				<div class="btn-group">
					<button @click="setValue('demo1', 21)">set value = 21</button>
					<button @click="setIndex('slider1', 2)">set index = 2</button>
					<button @click="setDisabled('demo1')">set disabled</button>
					<button @click="setTooltip('demo1')">switch tooltip</button>
					<button @click="getValue('slider1')">getValue()</button>
					<button @click="getIndex('slider1')">getIndex()</button>
				</div>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo1">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Label" id="demo2">
			<div>
				<vue-slider  @callback="cb" ref="slider2" v-bind="demo.demo2" v-model="demo.demo2.value"></vue-slider>
				<h3><small>Value: </small>{{ demo.demo2.value }}</h3>
				<div class="btn-group">
					<button @click="setValue('demo2', '2016-10-06')">set value = 2016-10-06</button>
					<button @click="setIndex('slider2', 3)">set index = 3</button>
					<button @click="setDisabled('demo2')">set disabled</button>
					<button @click="setTooltip('demo2')">switch tooltip</button>
					<button @click="getValue('slider2')">getValue()</button>
					<button @click="getIndex('slider2')">getIndex()</button>
				</div>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo2">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Formatter" id="demo3">
			<div>
				<vue-slider  @callback="cb" ref="slider3" v-bind="demo.demo3" v-model="demo.demo3.value"></vue-slider>
				<h3><small>Value: </small>{{ demo.demo3.value }}</h3>
				<div class="btn-group">
					<button @click="setValue('demo3', [100, 200])">set value = [100, 200]</button>
					<button @click="setIndex('slider3', 250)">set index = 250</button>
					<button @click="setDisabled('demo3')">set disabled</button>
					<button @click="setTooltip('demo3')">switch tooltip</button>
					<button @click="getValue('slider3')">getValue()</button>
					<button @click="getIndex('slider3')">getIndex()</button>
				</div>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo3">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Range + Custom Data" id="demo4">
			<div>
				<vue-slider  @callback="cb" ref="slider4" v-bind="demo.demo4" v-model="demo.demo4.value"></vue-slider>
				<h3><small>Value: </small>{{ demo.demo4.value }}</h3>
				<div class="btn-group">
					<button @click="setValue('demo4', ['10-02', '10-12'])">set value = ["10-02", "10-12"]</button>
					<button @click="setIndex('slider4', [3, 10])">set index = [3, 10]</button>
					<button @click="setDisabled('demo4')">set disabled</button>
					<button @click="setTooltip('demo4')">switch tooltip</button>
					<button @click="getValue('slider4')">getValue()</button>
					<button @click="getIndex('slider4')">getIndex()</button>
				</div>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo4">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Vertical + Custom Class" id="demo5">
			<div>
				<vue-slider  @callback="cb" ref="slider5" v-bind="demo.demo5" v-model="demo.demo5.value" :formatter="formatting" :reverse="true" tooltipDir="left" @drag-start="dragStart" @drag-end="dragEnd"></vue-slider>
				<vue-slider  @callback="cb" v-bind="demo.demo5" v-model="demo.demo5.value" :formatter="formatting" :reverse="false" tooltipDir="right" @drag-start="dragStart" @drag-end="dragEnd"></vue-slider>
				<h3><small>Value: </small>{{ demo.demo5.value }}</h3>
				<div class="btn-group">
					<button @click="setValue('demo5', 80)">set value = 80</button>
					<button @click="setIndex('slider5', 15)">set index = 15</button>
					<button @click="setDisabled('demo5')">set disabled</button>
					<button @click="setTooltip('demo5')">switch tooltip</button>
					<button @click="getValue('slider5')">getValue()</button>
					<button @click="getIndex('slider5')">getIndex()</button>
				</div>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo5">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><br>
				</template><span class="green">formatter</span>: <span class="yellow">function (value) {
						&nbsp;&nbsp;this.demo.demo5.processStyle.backgroundColor = `rgba(71, 113, 255, ${value / 100})`
						&nbsp;&nbsp;return value
					}</span>}</code>
			</div>
		</section>
		<section data-title="Pretty slider" id="demo6">
			<div>
				<vue-slider ref="slider6" id="pretty-slider" v-bind="demo.demo6" v-model="demo.demo6.value"></vue-slider>
				<h3><small>Value: </small>{{ demo.demo6.value }}</h3>
				<div class="btn-group">
					<button @click="setValue('demo6', 100)">set value = 100</button>
					<button @click="setValue('demo6', [0, 200])">set value = [0, 200]</button>
					<button @click="setDisabled('demo6')">set disabled</button>
					<button @click="setTooltip('demo6')">switch tooltip</button>
					<button @click="getValue('slider6')">getValue()</button>
					<button @click="getIndex('slider6')">getIndex()</button>
				</div>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo6">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="DIY Tooltip" id="demo7">
			<div>
				<vue-slider ref="slider7" id="diy-tootip" v-bind="demo.demo7" v-model="demo.demo7.value">
					<template slot="tooltip" scope="tooltip">
						<div class="diy-tooltip">
							<img :src="tooltip.index === 1 ? black_cat : orange_cat" :width="tooltip.value"></img>
							{{ tooltip.value }}
						</div>
					</template>
				</vue-slider>
				<h3><small>Value: </small>{{ demo.demo7.value }}</h3>
				<div class="btn-group">
					<button @click="setValue('demo7', [50, 100])">set value = [50, 100]</button>
					<button @click="setDisabled('demo7')">set disabled</button>
					<button @click="setTooltip('demo7')">switch tooltip</button>
					<button @click="getValue('slider7')">getValue()</button>
					<button @click="getIndex('slider7')">getIndex()</button>
				</div>
			</div>
			<div>
				<pre class="language-html" v-html="diy_tooltip">
				</pre>
				<code>{
				<template v-for="(value, key, index) of demo.demo7">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Customize dot dimensions" id="demo8">
			<div>
				<vue-slider  @callback="cb" ref="slider" v-bind="demo.demo8" v-model="demo.demo8.value"></vue-slider>
				<h3><small>Value: </small>{{ demo.demo8.value }}</h3>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo8">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><small class="gray ml-sm">// {{ demo.annotation[key] }}</small><br>
				</template>}</code>
			</div>
		</section>
		<section data-title="Customize dot dimensions 2" id="demo9">
			<div>
				<vue-slider  @callback="cb" ref="slider" v-bind="demo.demo9" v-model="demo.demo9.value"></vue-slider>
				<h3><small>Value: </small>{{ demo.demo9.value }}</h3>
			</div>
			<div>
				<code>{
				<template v-for="(value, key, index) of demo.demo9">
					<span class="green">{{ key }}</span>: <span class="yellow preWrap">{{ format(value) }}</span><small class="gray ml-sm">// {{ demo.annotation[key] }}</small><br>
				</template>}</code>
			</div>
		</section>
	</div>
</template>

<script>
import vueSlider from './vue-slider/'

export default {
	components: {
		vueSlider
	},
	data () {
		return {
			black_cat: 'http://7xqnme.com1.z0.glb.clouddn.com/17-6-8/62223522.jpg',
			orange_cat: 'http://7xqnme.com1.z0.glb.clouddn.com/17-6-8/88421800.jpg',
			demo: {
				default: {
					value: 0,
					width: 'auto',
					height: 6,
					direction: 'horizontal',
					dotSize: 16,
					eventType: 'auto',
					min: 0,
					max: 100,
					interval: 1,
					disabled: false,
					show: true,
					realTime: false,
					tooltip: 'always',
					clickable: true,
					tooltipDir: 'top',
					piecewise: false,
					lazy: false,
					reverse: false,
					speed: 0.5,
					formatter: null,
					bgStyle: null,
					sliderStyle: null,
					tooltipStyle: null,
					processStyle: null,
					piecewiseStyle: null
				},
				demo1: {
					value: 1,
					width: 280,
					height: 8,
					dotSize: 20,
					min: 1,
					max: 25,
					interval: 4,
					disabled: false,
					show: true,
					speed: 0.3,
					reverse: false,
					lazy: true,
					tooltip: 'always',
					piecewise: true
				},
				demo2: {
					value: '2016-10-01',
					width: '80%',
					tooltip: 'always',
					disabled: false,
					piecewise: true,
					piecewiseLabel: true,
					style: {
						marginLeft: '10%'
					},
					data: [
						'2016-10-01',
						'2016-10-02',
						'2016-10-03',
						'2016-10-04',
						'2016-10-05',
						'2016-10-06',
						'2016-10-07'
					],
					piecewiseStyle: {
						backgroundColor: '#ccc',
						visibility: 'visible',
						width: '12px',
						height: '12px'
					},
					piecewiseActiveStyle: {
						backgroundColor: '#3498db'
					},
					labelActiveStyle: {
						color: '#3498db'
					}
				},
				demo3: {
					value: [0, 100],
					width: '100%',
					height: 8,
					dotSize: 16,
					min: 0,
					max: 500,
					disabled: false,
					show: true,
					tooltip: 'always',
					formatter: '¥{value}',
					bgStyle: {
						backgroundColor: '#fff',
						boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
					},
					tooltipStyle: {
						backgroundColor: '#666',
						borderColor: '#666'
					},
					processStyle: {
						backgroundColor: '#999'
					}
				},
				demo4: {
					value: ['10-01', '10-05'],
					width: '100%',
					height: 4,
					dotSize: 14,
					min: 1,
					max: 100,
					interval: 3,
					disabled: false,
					show: true,
					tooltip: 'always',
					piecewise: true,
					data: [
						'10-01',
						'10-02',
						'10-03',
						'10-04',
						'10-05',
						'10-06',
						'10-07',
						'10-08',
						'10-09',
						'10-10',
						'10-11',
						'10-12',
						'10-13',
						'10-14',
						'10-15',
						'10-16',
						'10-17',
						'10-18',
						'10-19',
						'10-20'
					]
				},
				demo5: {
					value: 0,
					width: 4,
					height: 300,
					dotSize: 22,
					eventType: 'auto',
					min: 0,
					max: 100,
					interval: 1,
					disabled: false,
					show: true,
					tooltip: 'always',
					piecewise: false,
					style: {
						display: 'inline-block',
						marginLeft: '30px'
					},
					class: 'star-slider',
					direction: 'vertical',
					speed: 0.5,
					processStyle: {
						backgroundColor: '#fff'
					}
				},
				demo6: {
					value: [0, 200],
					width: '100%',
					height: 8,
					dotSize: 20,
					min: 0,
					max: 200,
					disabled: false,
					show: true,
					tooltip: 'always',
					tooltipDir: ['bottom', 'top'],
					piecewise: false,
					style: {
						marginBottom: '30px'
					},
					bgStyle: {
						backgroundColor: '#fff',
						boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
					},
					sliderStyle: [{
						backgroundColor: '#f05b72'
					}, {
						backgroundColor: '#3498db'
					}],
					tooltipStyle: [{
						backgroundColor: '#f05b72',
						borderColor: '#f05b72'
					}, {
						backgroundColor: '#3498db',
						borderColor: '#3498db'
					}],
					processStyle: {
						backgroundImage: '-webkit-linear-gradient(left, #f05b72, #3498db)'
					}
				},
				demo7: {
					width: '100%',
					show: true,
					value: [0, 20],
					min: 0,
					max: 100,
					disabled: false,
					tooltip: 'always'
				},
				demo8: {
					value: 0,
					width: 'auto',
					height: 6,
					direction: 'horizontal',
					dotWidth: 16,
					dotHeight: 24,
					eventType: 'auto',
					min: 0,
					max: 100,
					interval: 1,
					disabled: false,
					show: true,
					realTime: false,
					tooltip: 'always',
					clickable: true,
					tooltipDir: 'top',
					piecewise: false,
					lazy: false,
					reverse: false,
					speed: 0.5,
					formatter: null,
					bgStyle: null,
					sliderStyle: null,
					tooltipStyle: null,
					processStyle: null,
					piecewiseStyle: null
				},
				demo9: {
					value: 0,
					width: 6,
					height: 300,
					direction: 'vertical',
					dotWidth: 24,
					dotHeight: 16,
					eventType: 'auto',
					min: 0,
					max: 100,
					interval: 1,
					disabled: false,
					show: true,
					realTime: false,
					tooltip: 'always',
					clickable: true,
					tooltipDir: 'top',
					piecewise: false,
					lazy: false,
					reverse: false,
					speed: 0.5,
					formatter: null,
					bgStyle: null,
					sliderStyle: null,
					tooltipStyle: null,
					processStyle: null,
					piecewiseStyle: null
				},
				annotation: {
					width: '组件宽度',
					height: '组件高度',
					direction: '组件方向',
					eventType: '事件类型',
					dotSize: '滑块大小',
					min: '最小值',
					max: '最大值',
					interval: '分段间隔',
					disabled: '是否不可用',
					clickable: '是否可点击的',
					show: '是否显示组件',
					realTime: '是否实时计算组件布局',
					speed: '动画速度',
					tooltip: '是否显示工具提示',
					lazy: '是否在拖拽结束后同步值',
					tooltipDir: '工具提示方向',
					tooltipStyle: '工具提示样式',
					piecewise: '是否显示分段样式',
					reverse: '是否反向组件',
					formatter: '格式化tooltip的值',
					processStyle: '进度条样式',
					sliderStyle: '滑块样式',
					bgStyle: '组件背景样式',
					piecewiseStyle: '分割点的样式',
					value: '值'
				}
			},
			diy_tooltip: ''
		}
	},
	methods: {
		format (value) {
			return value === null ? 'null' : (typeof value === 'string' ? `"${value}"` : value)
		},
		formatting (value) {
			this.demo.demo5.processStyle.backgroundColor = `rgba(71, 113, 255, ${value / 100})`
			return value
		},
		setDisabled (name) {
			let obj = this.demo[name]
			obj.disabled = !obj.disabled
		},
		setTooltip (name) {
			let obj = this.demo[name]
			obj.tooltip = obj.tooltip === 'hover' ? 'always' : 'hover'
		},
		setValue (name, num) {
			let obj = this.demo[name]
			obj.value = num
		},
		setIndex (name, num) {
			let slider = this.$refs[name]
			slider.setIndex(num)
		},
		getValue (name) {
			let slider = this.$refs[name]
			alert(slider.getValue())
		},
		getIndex (name) {
			let slider = this.$refs[name]
			alert(slider.getIndex())
		},
		dragStart () {
			this.demo.demo5.speed = 0
		},
		dragEnd () {
			this.demo.demo5.speed = 0.5
		},
		cb (val) {
			// console.log(val)
		}
	},
	mounted () {
		let code = `<!-- In vue2.5 above, please use slot-scope instead of scope -->
<template slot="tooltip" scope="tooltip">
	<div class="diy-tooltip">
		<img :src="tooltip.index === 1 ? black_cat : orange_cat" :width="tooltip.value"></img>
		{{ tooltip.value }}
	</div>
</template>`
		this.diy_tooltip = Prism.highlight(code, Prism.languages.html)
	}
}
</script>

<style scope>
.container {
	width: 100%;
	overflow: hidden;
	background-color: #f4f4f4;
}

.container h1 {
	font-size: 50px;
	text-align: center;
	padding-top: 200px;
	color: #2980b9;
}

.container code {
    padding: 10px 20px;
    margin: 0;
    display: block;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
    white-space: pre-line;
}

section {
	padding: 70px 20px 20px 20px;
	margin: 50px auto;
	box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, .36);
	max-width: 800px;
	background-color: #fff;
	position: relative;
}


section::after {
	content: attr(data-title);
	position: absolute;
	left: 10px;
	top: 10px;
	font-size: 18px;
	font-weight: bold;
	color: #f05b72;
}


.btn-group {
	margin: 10px 0;
}

.btn-group button, .upload-group label {
    padding: 8px 12px;
    display: inline-block;
    border: none;
    background-color: #ccc;
    border-radius: 3px;
    margin: 5px 10px 5px 0;
}

.red {
	color: #d93a49;
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

.preWrap {
	white-space: pre-wrap;
}

.ml-sm {
	margin-left: 5px;
}

.star-slider .vue-slider .vue-slider-dot {
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABdElEQVRIS63VXU6DQBQF4HOwJia2yA6sK7CvxkjpTroD6wqkK9AdqCvpjzG+4grEFYilTZqa9hogVGQQhmpfmfv1cO/MQGj+5PmgjeUyYA+BTgl1FskIFgzzFRSPdtjTqdGDJ6YL4joGuenxYj6uwivh77SwEkzGOqmr4WzaNKZG6lJYTZvK1anL4aK0mqljON5Kn41jiNGBAQsiDoQWiE75kCQaYgDSw0Z8UHys5y/RlqRMWx7A06op13x+FcF9gHc1C39fLvhAY+0krfgvPEXPF952eH/GM2h8jrLvtDOeQxV4p7YUoMVwdOHsme/6w5QJ7dDJr1cOiDw2HYgx0ocB2jPFUeGpOQBwUwfG/uqEZ0s/W6PCk+YtaFzWggsupYLErTHAbg5+A8SFsA1gAOLox3PBkN2ZW5HYDDKFMUg7vN/ea8nXJGpX5g/kgXbYL4enpgBQwHxrkiu16SZtU3eG2oqnww5WC1/3oxnfjNFJyw3vC/6grFUpX2dVAAAAAElFTkSuQmCC') no-repeat;
	background-size: contain;
	box-shadow: none;
	border-radius: 0;
}

#pretty-slider .vue-slider-process {
	background-image: -webkit-linear-gradient(left, #f05b72, #3498db);
}

.diy-tooltip {
	text-align: center;
}

.diy-tooltip img {
	display: block;
}
</style>
