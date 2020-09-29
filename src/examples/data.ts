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
  example2: `
<template>
  <div>
    <div>value: {{ value }}</div>
    <vue-slider
      v-model="value"
      :data="data"
      :data-value="'id'"
      :data-label="'name'"
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
        value: 1,
        data: [{
          id: 1,
          name: 'A',
        }, {
          id: 2,
          name: 'B',
        }, {
          id: 3,
          name: 'C',
        }, {
          id: 4,
          name: 'D',
        }]
      }
    }
  }
</script>
        `,
  example3: `
<template>
  <div>
    <div>value: {{ value }}</div>
    <vue-slider v-model="value" :data="data" />
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: '1', // Must be string
        data: {
          '1': 'A',
          '2': 'B',
          '3': 'C',
          '4': 'D',
          '5': 'E',
          '6': 'F',
          '7': 'G',
        }
      }
    }
  }
</script>
        `,
}
