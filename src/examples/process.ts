export default {
  example1: `
<template>
  <div>
    <vue-slider v-model="value" :process="true"></vue-slider>
    <vue-slider v-model="value2" :process="true"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0,
        value2: [0, 50],
      }
    }
  }
  `,
  example2: `
<template>
  <div>
    <vue-slider v-model="value1" :process="process1"></vue-slider>
    <vue-slider v-model="value2" :process="process2"></vue-slider>
    <vue-slider v-model="value3" :process="process3"></vue-slider>
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
        process1: dotsPos => [[50, dotsPos[0]]],
        value2: [0, 30, 50],
        process2: dotsPos => [
          [dotsPos[0], dotsPos[1], { backgroundColor: 'pink' }],
          [dotsPos[1], dotsPos[2], { backgroundColor: 'blue' }]
        ],
        value3: 50,
        process3: _ => []
      }
    }
  }
  `,
}
