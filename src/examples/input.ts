export default {
  example1: `
<template>
  <div>
    <div class="box">
      <input v-model="value" @input="clearErrorMsg" />
      <span style="color: red; margin-left: 20px;">{{ errorMsg }}</span>
    </div>
    <vue-slider
      v-model="value"
      :min="min"
      :max="max"
      :tooltip="errorMsg ? 'none' : 'always'"
      :marks="[100, 1000]"
      @error="error"
      @change="clearErrorMsg"
    ></vue-slider>
  </div>
</template>

<script>
  // import { ERROR_TYPE } from 'vue-slider-component'
  const ERROR_TYPE = {
    VALUE: 1,
    INTERVAL: 2,
    MIN: 3,
    MAX: 4,
    ORDER: 5,
  }
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 100,
        min: 100,
        max: 1000,
        errorMsg: ''
      }
    },
    methods: {
      error(type, msg) {
        switch (type) {
          case ERROR_TYPE.MIN:
            break
          case ERROR_TYPE.MAX:
            break
          case ERROR_TYPE.VALUE:
            break
        }
        this.errorMsg = msg
      },
      clearErrorMsg() {
        this.errorMsg = ''
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
