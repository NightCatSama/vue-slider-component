'use strict'

const _default = {
  width: document.body.offsetWidth,
  height: document.body.offsetHeight,
  txt: 'NightCat',
  time: 5,
  font: 'normal 60px Segoe UI',
  colors: ['rgba(6, 219, 198, 1)', 'rgba(155, 89, 182, 1)', 'rgba(52, 152, 255, 1)', 'rgba(253, 99, 53, 1)', 'rgba(253, 236, 53, 1)', 'rgba(102, 219, 6, 1)']
}

const MyCanvas = function (el, option) {
  /*
   * Object.assign(this, _default, option)
   */
  for (let i in _default) {
    this[i] = option[i] || _default[i]
  }

  this.canvas = el
  this.canvas.width = this.width
  this.canvas.height = this.height
  this.Gradient = 0

  this.context = this.canvas.getContext('2d')
}

MyCanvas.prototype = {
  constructor: MyCanvas,
  render: function () {
    this.context.clearRect(0, 0, this.width, this.height)
    this.writeName()
  },
  writeName: function () {
    let cxt = this.context
    let grad = cxt.createLinearGradient(0, 0, this.width, this.height)

    this.Gradient += (1 / 60 / this.time)
    let differ = 1 / this.colors.length
    let value

    for (let i = 0; i < this.colors.length; i++) {
      value = this.Gradient + differ * i
      if (value > 1) value = value % 1
      grad.addColorStop(value, this.colors[i])
    }

    cxt.font = this.font
    cxt.textAlign = 'center'
    cxt.fillStyle = grad
    cxt.shadowColor = '#000'
    cxt.shadowOffsetX = 5
    cxt.shadowOffsetY = 5
    cxt.shadowBlur = 3
    cxt.fillText(this.txt, this.width / 2, this.height / 2)
    cxt.globalCompositeOperation = 'source-over'
  },
  start: function () {
    if (this.animate) return false
    this.animate = true
    const step = () => {
      if (!this.animate) return false
      this.render()
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  },
  stop: function () {
    this.animate = false
  }
}

export default MyCanvas
