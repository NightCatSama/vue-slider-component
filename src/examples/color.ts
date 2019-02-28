export default {
  example1: `
<template>
  <div>
    <vue-slider
      v-model="value"
      class="color-slider"
      :process="false"
      :tooltip="'always'"
    >
      <template v-slot:dot>
        <div class="custom-dot" :style="{ borderColor: color }"></div>
      </template>
      <template v-slot:tooltip>
        <div class="custom-tooltip" :style="{ backgroundColor: color }"></div>
      </template>
    </vue-slider>
  </div>
</template>

<style>
  .color-slider .vue-slider-rail {
    background: linear-gradient(to right,
      rgb(255,0,0),
      rgb(255,255,0),
      rgb(0,255,0),
      rgb(0,255,255),
      rgb(0,0,255),
      rgb(255,0,255),
      rgb(255,0,0)
    );
  }
  .color-slider .custom-dot {
    width: 100%;
    color: 100%;
    background-color: #fff;
    border: 2px solid #fff;
  }
  .color-slider .custom-tooltip {
    width: 24px;
    color: 24px;
    border-radius: 50%;
  }
</style>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0
      }
    },
    computed: {
      color () {
        var hue = ((this.value / 100) * 360).toFixed(0)
        var hex = this.hsl2Hex(hue, 100, 50)
        return hex
      }
    },
    methods: {
      hsl2Rgb(h, s, l) {
        s = s / 100
        l = l / 100
        var c, x, m, rgb
        c = (1 - Math.abs(2 * l - 1)) * s
        x = c * (1 - Math.abs(((h / 60) % 2) - 1))
        m = l - c / 2
        if (h >= 0 && h < 60) rgb = [c, x, 0]
        if (h >= 60 && h < 120) rgb = [x, c, 0]
        if (h >= 120 && h < 180) rgb = [0, c, x]
        if (h >= 180 && h < 240) rgb = [0, x, c]
        if (h >= 240 && h < 300) rgb = [x, 0, c]
        if (h >= 300 && h <= 360) rgb = [c, 0, x]

        return rgb.map(function (v) {
          return 255 * (v + m) | 0
        })
      },
      rgb2Hex(r, g, b) {
        var rgb = b | (g << 8) | (r << 16)
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
      },
      hsl2Hex(h, s, l) {
        var rgb = this.hsl2Rgb(h, s, l)
        return this.rgb2Hex(rgb[0], rgb[1], rgb[2])
      }
    }
  }
</script>
  `,
}
