export default {
  example1: `
<template>
  <div>
    <vue-slider v-model="value" :enable-cross="false"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: [0, 30],
      }
    }
  }
</script>
  `,
  example2: `
<template>
  <div>
    <vue-slider
      v-model="value1"
      :min-range="20"
      :max-range="50"
    ></vue-slider>
    <vue-slider v-model="value2" :fixed="true"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value1: [0, 30],
        value2: [0, 30],
      }
    }
  }
</script>
  `,
}
