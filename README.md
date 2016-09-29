# vue-slider-component
Can use the slider in vue1.x and  vue2.x

[demo](https://nightcatsama.github.io/vue-slider-component/example/)

## Install
```
    npm install vue-slider-component
```

## Todo

- [x] Basis
- [x] Display maximum value & minimum value
- [x] piecewise style
- [x] Compatible with PC and mobile terminal
- [x] Tooltip
- [ ] The custom data
- [ ] Range

## usage
Use in vue1.x

e.g:
```
<template>
    <div>
        <vue-slider v-ref:slider :value.sync="val" @callback="getValue"></vue-slider>
    </div>
</template>
<script>
import { vueSlider }  from 'vue-slider-component';

new Vue({
  el: '#app',
  components: {
    vueSlider
  },
  data: {
    val: 1
  }
  methods: {
    getValue(val) {
      console.log(val)
    },
    setValue(num) {
      this.$refs.slider.setValue(num)
    }
  }
});
</script>
```
<br>
Use in vue2.x 
<br>Because```.sync``` are deprecated. Props are now always one-way down. So in order to realize the two-way, Can be set in the @callback 

e.g:
```
<template>
    <div>
        <vue-slider ref="slider" :val="val" @callback="getValue"></vue-slider>
    </div>
</template>
<script>
// import { vue2Slider as vueSlider } from 'vue-sliders-component';
import vueSlider from 'vue-sliders-component/vue2-sliders.vue'

new Vue({
  el: '#app',
  components: {
    vueSlider
  },
  data: {
    val: 1
  }
  methods: {
    getValue(value) {
      this.val = value
    },
    setValue(num) {
      this.val = num
      this.$refs.slider.setValue(num)
    }
  }
});
</script>
```

## Options

### Props
| Props       | Type          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| width       | Number,String | 150      | width of the component |
| height      | Number        | 4        | height of the component |
| dotSize     | Number        | 15       | size of the sliders |
| min         | Number        | 0        | The minimum value   |
| max         | Number        | 100      | The maximum value   |
| interval    | Number        | 1        | The gap between the values |
| show        | Boolean       | true     | display of the component |
| disabled    | Boolean       | false    | whether to disable components |
| piecewise   | Boolean       | false    | display of the piecewise |
| tooltip     | String,Boolean| false    | control the tooltip ['hover', 'always', false] |
| val (vue>=2)| Number        | 1        | initial value (only vue2.x)|
| value (vue>=1)| Number      | 1        | initial value, Two-way binding please use ```.sync``` (only vue1.x)|

### Function
| Name        | Params&Type   | Description  |
| ----------- |:--------------| ---------|--------------|
| setValue    | value[Number] | set value of the component |
| refresh     | null          | Refresh the component      |


### Events
| Name        | Params&Type   | Description  |
| ----------- |:--------------|--------------|
| callback    | value[Number] | values change when the callback function |

### Slot

default:
```
<slot name="left">{{ min }}</slot>
<slot name="right">{{ max }}</slot>
```

custom:
```
<template>
  <vue-slider ref="slider" :min="minimum" :max="maximum" :val="val" @callback="getValue">
    <p slot="left">${{ minimum }}.00</p>
    <p slot="right">${{ maximum }}.00</p>
    <!-- or -->
    <!--
      <span slot="left"></span>
      <p slot="right">value: {{ val }}</p>
    -->
  </vue-slider>
</template>
```
