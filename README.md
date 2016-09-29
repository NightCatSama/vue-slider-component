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
- [x] The custom data
- [ ] Range

## usage
Use in vue1.x

e.g:
```html
<template>
    <div>
        <vue-slider v-ref:slider :val.sync="val" @callback="getValue"></vue-slider>
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
      this.val = num
    }
  }
});
</script>
```
<br>
Use in vue2.x 
<br>Because```.sync``` are deprecated. Props are now always one-way down. So in order to realize the two-way, Can be set in the @callback 

e.g:
```html
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
      /* Two-way */
      this.val = value
    },
    setValue(num) {
      this.val = num
    }
  }
});
</script>
```

## Options

### Props
| Props       | Type          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| class-name  | String        | null     | the custom class |
| styles      | Object        | null     | the custom styles |
| width       | Number,String | 150      | width of the component |
| height      | Number        | 4        | height of the component |
| dotSize     | Number        | 15       | size of the sliders |
| min         | Number        | 0        | the minimum value   |
| max         | Number        | 100      | the maximum value   |
| interval    | Number        | 1        | the gap between the values |
| show        | Boolean       | true     | display of the component |
| disabled    | Boolean       | false    | whether to disable components |
| piecewise   | Boolean       | false    | display of the piecewise |
| tooltip     | String,Boolean| false    | control the tooltip ['hover', 'always', false] |
| val         | Number        | 0        | initial value |
| data        | Array         | null     | the custom data |


### Function
| Name        | Params&Type   | Description  |
| ----------- |:--------------| ---------|--------------|
| setValue    | value[Number] | set value of the component |
| setIndex    | index[Number] | set index of the component (Particularly useful in [used piecewise] or [the custom data]) |
| refresh     | null          | Refresh the component      |


### Events
| Name        | Params&Type   | Description  |
| ----------- |:--------------|--------------|
| callback    | value[Number] | values change when the callback function |

### Slot

default:
```html
<slot name="left">{{ min }}</slot>
<slot name="right">{{ max }}</slot>
```

custom:
```html
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
