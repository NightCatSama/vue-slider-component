# Data

## 自定义数据

<example :value="example1"></example>

<script>
  export default {
    data () {
      return {
        example1: `
<template>
  <div>
    <div>value: {{ value }}</div>
    <vue-slider v-model="value" :data="data"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: '2016-10-01',
        data: [
          '2016-10-01',
          '2016-10-02',
          '2016-10-03',
          '2016-10-04',
          '2016-10-05',
          '2016-10-06',
          '2016-10-07'
        ]
      }
    }
  }
        `
      }
    }
  }
</script>