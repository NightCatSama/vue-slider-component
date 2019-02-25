# Tooltip

### tooltip

<example :value="example1"></example>

### tooltipPlacement

<example :value="example2"></example>

### tooltipFormatter

<example :value="example3"></example>

<script>
  export default {
    data () {
      return {
        example1: `
<template>
  <div>
    <vue-slider v-model="value1" :tooltip="'none'"></vue-slider>
    <vue-slider v-model="value2" :tooltip="'always'"></vue-slider>
    <vue-slider v-model="value3" :tooltip="'focus'"></vue-slider>
    <vue-slider v-model="value3" :tooltip="'focus'" :use-keyboard="true"></vue-slider>
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
      }
    }
  }
        `,
        example2: `
<template>
  <div>
    <vue-slider v-model="value" :tooltip-placement="'bottom'"></vue-slider>
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
      }
    }
  }
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
        formatter2: (v) => \`$\${('' + v).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}\`,
      }
    }
  }
        `,
      }
    }
  }
</script>