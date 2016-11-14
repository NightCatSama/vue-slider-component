<template>
	<div id="app">
		<div class="header" ref="header">
			<canvas id="canvas">
				你的浏览器不支持canvasr
			</canvas>
			<div class="link-group">
				<a href="https://github.com/NightCatSama/vue-slider-component">View Github</a>
			</div>
		</div>
		<demo></demo>
	</div>
</template>

<script>
import demo from './demo.vue'
import MyCanvas from './canvas.js'

export default {
	components: {
		demo
	},
	data () {
		return {
		}
	},
	mounted() {
		this.$nextTick(() => {
			let header = this.$refs.header
			var myCanvas = new MyCanvas('canvas', {
				width:  header.offsetWidth,
				height: header.offsetHeight,
				txt: 'Vue-Slider-Component'
			})
			myCanvas.start()
		})
	}
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.header {
	height: 100vh;
	position: relative;
	width:  100%;
	background: #151515; /* fallback for old browsers */
	background: -webkit-linear-gradient(-98deg, #000 , #434343); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(-98deg, #000 , #434343); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	color: #fff;
	text-align: center;
}

.header h1 {
	font-size: 50px;
	padding-top: 200px;
}

canvas {
	z-index: 999;
}

.link-group {
	position: absolute;
	top: 70%;
	left: 50%;
	transform: translate(-50%, 0);
}

.link-group a {
	font-size: 25px;
	text-shadow: 6px 6px 5px rgba(0, 0, 0, .86);
	color: #fff;
}
</style>
