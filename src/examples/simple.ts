export default {
  example1: `
<template>
  <div>
    <vue-slider v-model="value"></vue-slider>
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
</script>
  `,
  example2: `
<template>
  <div>
    <vue-slider v-model="value_2"></vue-slider>
    <vue-slider v-model="value_3"></vue-slider>
    <vue-slider v-model="value_4"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value_2: [0, 50],
        value_3: [0, 50, 80],
        value_4: [0, 50, 80, 100],
      }
    }
  }
</script>
  `,
  example3: `
<template>
  <div>
    <vue-slider
      v-model="value"
      :min="0"
      :max="1"
      :interval="0.01"
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
        value: 0
      }
    }
  }
</script>
  `,
  example4: `
<template>
  <div class="flex">
    <vue-slider v-model="value"></vue-slider>
    <vue-slider v-model="value" direction="rtl"></vue-slider>
    <vue-slider
      v-model="value"
      direction="btt"
      :height="300"
      style="display: inline-block; margin: 30px;"
    ></vue-slider>
    <vue-slider
      v-model="value"
      direction="ttb"
      style="display: inline-block; margin: 30px 0; height: 300px;"
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
        value: 0
      }
    }
  }
</script>
  `,
  example5: `
<template>
  <div>
    <div>value: {{ value }}</div>
    <vue-slider v-model="value" :lazy="true"></vue-slider>
  </div>
</template>

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
  example6: `
<template>
  <div>
    <vue-slider v-model="value1" :disabled="true"></vue-slider>
    <vue-slider
      v-model="value2"
      :dot-options="dotOptions"
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
        value1: 0,
        value2: [0, 50],
        dotOptions: [{
          disabled: false
        }, {
          disabled: true
        }]
      }
    }
  }
</script>
  `,
}
