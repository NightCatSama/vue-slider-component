export default {
  example1: `
<template>
  <div>
    <vue-slider v-model="value1" :tooltip="'none'"></vue-slider>
    <vue-slider v-model="value2" :tooltip="'always'"></vue-slider>
    <vue-slider v-model="value3" :tooltip="'focus'"></vue-slider>
    <vue-slider v-model="value4" :tooltip="'focus'" :use-keyboard="true"></vue-slider>
    <vue-slider v-model="value5" :dot-options="dotOptions"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: [0, 50, 100],
        dotOptions: [{
          tooltip: 'always'
        }, {
          tooltip: 'none'
        }, {
          tooltip: 'always'
        }]
      }
    }
  }
</script>
  `,
  example2: `
<template>
  <div>
    <vue-slider v-model="value1" :tooltip="'always'" :tooltip-placement="'top'"></vue-slider>
    <vue-slider v-model="value2" :tooltip="'always'" :tooltip-placement="['top', 'bottom']"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value1: 0,
        value2: [0, 50],
      }
    }
  }
</script>
  `,
  example3: `
<template>
  <div>
    <vue-slider v-model="value1" :tooltip-formatter="formatter1"></vue-slider>
    <vue-slider
      v-model="value2"
      :min="0"
      :max="1000000"
      :interval="100"
      :tooltip-formatter="formatter2"
    ></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value1: 0,
        formatter1: '{value}%',
        value2: 0,
        formatter2: ${
          localStorage.getItem('theme') === 'material'
            ? `v =>
            v === 1000000 ?
              '1M' :
              ~~(v / 1000) + (v / 1000 >= 1 ? 'K' : '')
          `
            : `v => \`$\${('' + v).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}\``
        },
      }
    }
  }
</script>
  `,
}
