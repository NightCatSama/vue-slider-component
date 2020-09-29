export default {
  example1: `
<template>
  <div>
    <vue-slider
      v-model="value"
      :interval="10"
      :marks="true"
    ></vue-slider>
    <vue-slider
      v-model="value2"
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
        value: 0,
        value2: 'a',
        data: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      }
    }
  }
</script>
  `,
  example2: `
<template>
  <div>
    <vue-slider v-model="value1" :marks="marks1"></vue-slider>
    <vue-slider v-model="value2" :marks="marks2"></vue-slider>
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
        value2: 0,
        marks1: {
          '0': '😭',
          '30': '😢',
          '60': '😑',
          '80': '😊',
          '100': '😆'
        },
        marks2: {
          '0': {
            label: '0℃',
            style: {
              width: '8px',
              height: '8px',
              display: 'block',
              backgroundColor: '#69c0ff',
              transform: 'translate(-2px, -2px)'
            },
            labelStyle: {
              color: '#69c0ff'
            }
          },
          '26': '26℃',
          '37': '37℃',
          '100': {
            label: '100℃',
            style: {
              width: '8px',
              height: '8px',
              display: 'block',
              backgroundColor: 'red',
              transform: 'translate(-2px, -2px)'
            },
            labelStyle: {
              color: 'red'
            }
          },
        },
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
      :marks="marks"
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
        marks: [0, 20, 40, 60, 80, 100]
      }
    }
  }
</script>
  `,
  example4: `
<template>
  <div>
    <vue-slider v-model="value1" :marks="marks1"></vue-slider>
    <vue-slider v-model="value2" :marks="marks2"></vue-slider>
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
        marks1: val => val % 20 === 0,
        value2: 0,
        marks2: val => val % 10 === 0 ? ({
          label: \`\${val}%\`,
          labelStyle: {
            opacity: val * 0.01 * 0.7 + 0.3
          },
          labelActiveStyle: {
            color: '#3498db'
          }
        }) : false
      }
    }
  }
</script>
  `,
  example5: `
<template>
  <div>
    <vue-slider
      v-model="value"
      :marks="marks"
      :included="true"
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
        marks: [0, 10, 30, 50, 100]
      }
    }
  }
</script>
  `,
  example6: `
<template>
  <div>
    <vue-slider
      v-model="value"
      :interval="10"
      :marks="marks"
      :hide-label="true"
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
        marks: true
      }
    }
  }
</script>
  `,
}
