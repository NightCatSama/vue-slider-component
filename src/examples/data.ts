export default {
  example1: `
<template>
  <div>
    <div>value: {{ value }}</div>
    <vue-slider
      v-model="value"
      :data="data"
      :marks="true"
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
        value: 'A',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      }
    }
  }
</script>
        `,
}
