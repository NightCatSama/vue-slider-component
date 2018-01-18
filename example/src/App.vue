<template>
  <div id="app">
    <div class="header" ref="header">
      <canvas ref="canvas">
        你的浏览器不支持canvas
      </canvas>
      <div class="link-group">
        <a href="https://github.com/NightCatSama/vue-slider-component">View Github</a>
        <a href="#QuickStart">Quick start</a>
      </div>
    </div>
    <div id="QuickStart" class="QuickStart">
      <h1>Quick Start</h1>
      <div class="step">
        <h2>Installation</h2>
        <code>npm install vue-slider-component</code>
      </div>
      <div class="step">
        <h2>Usage</h2>
        <code class="language-html">&lt;template>
  &lt;div>
    &lt;vue-slider v-model="value">&lt;/vue-slider>
  &lt;/div>
&lt;/template>
&lt;script>
import vueSlider from 'vue-slider-component';

export default {
  components: {
    vueSlider
  },
  data () {
    return {
      value: 0
    }
  }
}
&lt;/script></code>
      </div>
    </div>
    <demo></demo>
  </div>
</template>

<script>
import demo from './demo'
import MyCanvas from './canvas'
const _isMobile = /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|Mobile)/i.test(navigator.userAgent)

export default {
  components: {
    demo
  },
  data () {
    return {
      scrollTop: 0,
      _offsetHeight: 0,
      myCanvas: null
    }
  },
  watch: {
    scrollTop: function (v) {
      this.isScreen(v)
    }
  },
  methods: {
    scroll (e) {
      this.scrollTop = document.body.scrollTop
    },
    isScreen (v) {
      if (v > this._offsetHeight) {
        this.myCanvas.stop()
      }
      else {
        this.myCanvas.start()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      let header = this.$refs.header
      this._offsetHeight = header.offsetHeight

      this.myCanvas = new MyCanvas(this.$refs.canvas, {
        width: header.offsetWidth,
        height: this._offsetHeight,
        txt: 'vue-slider-component',
        time: 3,
        font: _isMobile ? 'normal 30px Segoe UI' : 'normal 60px Segoe UI'
      })
      this.myCanvas.start()

      // this.isScreen(document.body.scrollTop)
      document.addEventListener('scroll', this.scroll, false)
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
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.header {
  height: 100vh;
  position: relative;
  width:  100%;
  background-color: #151515;
  background-image: -webkit-linear-gradient(-40deg, #000, #999);
  background-image: linear-gradient(-40deg, #000, #999);
  color: #fff;
  text-align: center;
  animation: mymove 2s linear 0s infinite;
}

canvas {
  z-index: 999;
}

.link-group {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, 0);
}

.link-group a {
  font-size: 25px;
  text-shadow: 6px 6px 5px rgba(0, 0, 0, .86);
  color: #fff;
  margin: 0 50px;
}

@media (max-width: 768px) {
  .link-group a {
    font-size: 16px;
    display: block;
    margin: 0 0 30px 0;
  }
}

.QuickStart {
  padding: 100px 20px 20px 20px;
  min-height: 100vh;
}

.QuickStart h1 {
  text-align: center;
  color: #2ecc71;
  font-size: 44px;
}

.step {
  margin: 30px auto;
  max-width: 1000px;
}

.step h2 {
  color: #333;
  margin-bottom: 10px;
}

.QuickStart .step code {
    padding: 10px 20px;
    margin: 0;
    display: block;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
  white-space: pre;
}
</style>
