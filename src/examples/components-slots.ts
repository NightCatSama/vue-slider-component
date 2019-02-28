export default {
  example1: `
<template>
  <div>
    <vue-slider
      v-model="value"
      :tooltip="'none'"
      :process-style="{ backgroundColor: 'pink' }"
      :tooltip-style="{ backgroundColor: 'pink', borderColor: 'pink' }"
    >
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
  example2: `
<template>
  <div>
    <vue-slider v-model="value" :tooltip="'always'">
      <template v-slot:tooltip="{ value, focus }">
        <div :class="['custom-tooltip', { focus }]">{{ value }}</div>
      </template>
    </vue-slider>
  </div>
</template>

<style>
  .custom-tooltip {
    transform: translateY(5px);
  }
  .custom-tooltip.focus {
    font-weight: bold;
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
  example3: `
<template>
  <div>
    <vue-slider v-model="value" :marks="marks">
      <template v-slot:label="{ label, active }">
        <div :class="['vue-slider-mark-label', 'custom-label', { active }]">{{ label }}</div>
      </template>
    </vue-slider>
  </div>
</template>

<style>
  .custom-label {
  }
  .custom-label.active {
    color: #3498db;
  }
</style>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0,
        marks: val => val % 20 === 0
      }
    }
  }
</script>
  `,
  example4: `
<template>
  <div>
    <vue-slider v-model="value" :marks="marks">
      <template v-slot:step="{ label, active }">
        <div :class="['custom-step', { active }]"></div>
      </template>
    </vue-slider>
  </div>
</template>

<style>
  .custom-step {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #ccc;
    background-color: #fff;
  }
  .custom-step.active {
    box-shadow: 0 0 0 3px #3498db;
    background-color: #3498db;
  }
</style>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0,
        marks: val => val % 20 === 0
      }
    }
  }
</script>
  `,
}
