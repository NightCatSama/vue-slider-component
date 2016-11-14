'use strict';

const _default = {
	width: document.body.offsetWidth,
	height: document.body.offsetHeight,
	txt: 'NightCat',
	time: 3,
	font: 'normal 60px Segoe UI',
	colors: ['rgba(6, 219, 198, 1)', 'rgba(155, 89, 182, 1)', 'rgba(52, 152, 255, 1)', 'rgba(253, 99, 53, 1)', 'rgba(253, 236, 53, 1)', 'rgba(102, 219, 6, 1)']
}

var MyCanvas = function(id, option) {
	Object.assign(this, _default, option)
	this.canvas = document.getElementById(id)
	this.canvas.width = this.width
	this.canvas.height = this.height
	this.Gradient = 0

	this.context = this.canvas.getContext('2d')
}

MyCanvas.prototype = {

	render: function() {
		this.context.clearRect(0, 0, this.width, this.height)
		this.writeName()
	},
	writeName: function() {
		let cxt = this.context
		let grad = cxt.createLinearGradient(0, 0, this.width, this.height)

		this.Gradient += (1 / 60 / this.time)
		let differ = 1 / this.colors.length
		let value
		Array.from(this.colors, (color, index) => {
			value = this.Gradient + differ * index
			if (value > 1) value = value % 1
			grad.addColorStop(value, color)
		})

		cxt.font = this.font
		cxt.textAlign = "center"
		cxt.fillStyle = grad
		cxt.shadowColor = '#000'
		cxt.shadowOffsetX = 5
		cxt.shadowOffsetY = 5
		cxt.shadowBlur = 3
		cxt.fillText(this.txt, this.width / 2, this.height / 2)
		cxt.globalCompositeOperation = "source-over"
	},
	start: function() {
		const step = () => {
			this.render()
			requestAnimationFrame(step)
		}
		requestAnimationFrame(step)
	}
}

export default MyCanvas