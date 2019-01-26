<template>
  <div id="app">
    <vue-slider
      class="slider"
      v-model="value"
      v-bind="sliderOptions"
      @error="({ type, message }) => log('error', type, message)"
      @dragStart="setSpeed(0)"
      @dragEnd="setSpeed(0.5)"
      @change="val => log('change', val)"
    >
    </vue-slider>
    <vue-slider
      v-show="show"
      class="slider"
      v-model="value"
      :direction="'rtl'"
      :disabled="true"
      v-bind="sliderOptions"
      @error="({ type, message }) => log('error', type, message)"
      @dragStart="setSpeed(0)"
      @dragEnd="setSpeed(0.5)"
    />
    <div style="display: flex">
      <vue-slider
        v-show="show"
        class="slider"
        v-model="value"
        :height="sliderOptions.width"
        :width="sliderOptions.height"
        :direction="'ttb'"
        v-bind="sliderOptions"
        @error="({ type, message }) => log('error', type, message)"
        @dragStart="setSpeed(0)"
        @dragEnd="setSpeed(0.5)"
      >
      </vue-slider>
      <vue-slider
        v-show="show"
        class="slider"
        v-model="value"
        :height="sliderOptions.width"
        :width="sliderOptions.height"
        :direction="'btt'"
        v-bind="sliderOptions"
        @error="({ type, message }) => log('error', type, message)"
        @dragStart="setSpeed(0)"
        @dragEnd="setSpeed(0.5)"
      />
    </div>
    <h1 @click="show = !show">{{ value }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueSlider, { VueSliderMark } from '../lib'
import '../lib/theme/material.scss'

@Component({
  components: {
    VueSlider,
    VueSliderMark
  },
})
export default class App extends Vue {
  // value = 0
  value = [120, 100]
  // value = ['01', '03']
  show = false

  sliderOptions = {
    width: 320,
    // height: 8,
    // width: 6,
    // height: 380,
    // dotSize: 20,
    min: -30,
    max: 180,
    interval: 1,
    speed: .5,
    // tooltip: 'always',
    // tooltipFormatter: (val: string) => `${val}℃`,
    // tooltipPlacement: 'bottom',
    // useKeyboard: false,
    order: false,
    // disabled: true,
    // enableCross: false,
    // direction: 'ttb',
    // fixed: true,
    // lazy: true,
    minRange: 5,
    maxRange: 60,
    // interval: 2,
    // data: ['01', '02', '03', '04', '05', '06'],
    // process: (dots: any) => [[0, dots[0], {
    //   backgroundColor: 'blue'
    // }], [dots[1], 100, {
    //   backgroundColor: 'red'
    // }]],
    // included: true,
    // marks: true,
    // marks: (value: number) => value % 20 === 0 && ({ label: value, stepStyle: { height: '20px', width: '20px' }}),
    marks: {
      '-30': {
        label: '-30℃',
        labelStyle: {
          color: 'blue'
        }
      },
      '0': '0℃',
      '26': '26℃',
      '60': '60℃',
      '180': {
        label: '180℃',
        labelStyle: {
          color: 'red',
        },
      },
    },
    // marks: [0, 20, 40, 60, 80, 100],
    // hideLabel: true,
    // marks: [-20, 300, 1000, 2000],
    // marks: (value: number) =>
    //   [-20, 300, 1000, 2000].indexOf(value) > -1 ?
    //     { label: value + '℃', style: { color: 'pink' }} :
    //     false,
    // tailStyle: {
    //   backgroundColor: '#ccc',
    //   boxShadow: 'inset 1px 1px 0 0 rgba(0, 0, 0, .26)'
    // },
    // dotStyle: {
    //   style: {
    //     borderColor: 'pink'
    //   }
    // },
    // dotOptions: [
    //   {
    //     disabled: false
    //   },
    //   {
    //     disabled: true
    //   }
    // ],
    // enableCross: false
    // dotOptions: [
    //   {
    //     disabledStyle: {
    //       opacity: .6
    //     },
    //     style: {
    //       backgroundColor: 'pink',
    //       border: 'none'
    //     },
    //   },
    //   {
    //     disabledStyle: {
    //       opacity: .6
    //     },
    //     style: {
    //       backgroundColor: 'blue',
    //       border: 'none'
    //     },
    //   },
    //   {
    //     disabled: true,
    //     disabledStyle: {
    //       opacity: .6
    //     },
    //     style: {
    //       backgroundColor: 'green',
    //       border: 'none'
    //     },
    //   },
    // ],
  }

  log(name: string, ...args: any[]) {
    // console.log(`[${name} Log]:`, JSON.stringify(args))
  }

  setSpeed(speed: number) {
    this.sliderOptions.speed = speed
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.slider {
  margin: 40px;
}
</style>
