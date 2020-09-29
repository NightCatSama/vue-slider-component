export default {
  example1: `
<template>
  <div>
    <div>value: {{ value }}</div>
    <vue-slider
      v-model="value"
      :order="false"
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
        value: [0, 50],
      }
    }
  }
</script>
  `,
  example2: `
<template>
  <div>
    <vue-slider
      v-model="value"
      :order="false"
      :tooltip="'always'"
      :process="false"
      :marks="marks"
    >
      <template #tooltip="{ index }">
        <div v-if="index === 1">🐰</div>
        <div v-else>🐢</div>
      </template>
    </vue-slider>
  </div>
</template>

<style>
  .theme-material .vue-slider-dot-tooltip {
    transform: translate(-50%, -100%);
    background: transparent;
  }
</style>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: [0, 50],
        marks: {
          '100': {
            label: '🏁',
            labelStyle: {
              left: '100%',
              margin: '0 0 0 10px',
              top: '50%',
              transform: 'translateY(-50%)'
            }
          }
        }
      }
    }
  }
</script>
  `,
}
