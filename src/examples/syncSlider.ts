export default {
  example1: `
<template>
  <div>
    <vue-slider
      v-for="n in 4"
      :key="n"
      v-model="value"
      :duration="inDragging ? 0 : 0.5"
      @drag-start="() => inDragging = true"
      @drag-end="() => inDragging = false"
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
        value: 0,
        inDragging: false
      }
    }
  }
</script>
  `,
}
