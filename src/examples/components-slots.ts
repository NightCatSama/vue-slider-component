export default {
  example1: `
<template>
  <div>
    <vue-slider v-model="value" :process-style="{ backgroundColor: 'pink' }">
      <template v-slot:dot="{ value, focus }">
        <div :class="['custom-dot', { focus }]"></div>
      </template>
    </vue-slider>
  </div>
</template>

<style>
  .custom-dot {
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: pink;
    transition: all .3s;
  }
  .custom-dot:hover {
    transform: rotateZ(45deg);
  }
  .custom-dot.focus {
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
    }
  }
</script>
        `,
}
