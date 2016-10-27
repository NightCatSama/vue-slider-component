# vue-slider-component
Can use the slider in vue1.x and  vue2.x

[Live Demo](https://nightcatsama.github.io/vue-slider-component/example/)

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
- [x] Range
- [x] The vertical component

## Example

```
cd vue-slider-component/example
```
```
npm install
```
```
npm run dev
```
```
npm run build
```


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
import vueSlider from 'vue-slider-component/src/vue-slider.vue';

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
<br>Because```.sync``` was deprecated. Props are now always one-way down. So in order to realize the two-way, Can be set in the @callback

e.g:
```html
<template>
    <div>
        <vue-slider ref="slider" :val="val" @callback="getValue"></vue-slider>
    </div>
</template>
<script>
import vueSlider from 'vue-slider-component'
/*
  because in the runtime-only build doesn't work
  The solution is as follows

  1. in webpack config
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },

  2. using
  import vueSlider from 'vue-slider-component/src/vue2-slider.vue'
*/

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
| direction   | String        | horizontal | set the direction of the component, optional value: ['horizontal', 'vertical'] |
| eventType   | String        | auto   | the event type, optional value: ['auto', 'touch', 'mouse', 'none'] |
| width       | Number[,String(in horizontal)] | 150      | width of the component |
| height      | Number[,String(in vertical)] | 4        | height of the component |
| dotSize     | Number        | 15       | size of the sliders |
| min         | Number        | 0        | the minimum value   |
| max         | Number        | 100      | the maximum value   |
| interval    | Number        | 1        | the gap between the values |
| show        | Boolean       | true     | display of the component |
| speed       | Number        | 0.5      | transition time |
| disabled    | Boolean       | false    | whether to disable components |
| piecewise   | Boolean       | false    | display of the piecewise |
| tooltip     | String,Boolean| false    | control the tooltip, optional value: ['hover', 'always', false] |
| tooltipDir  | String        | top(in horizontal)or left(in vertical) | set the direction of the tooltip, optional value: ['top', 'bottom', 'left', 'right'] |
| val         | Number,Array  | 0        | initial value (if the value for the array open range model) |
| data        | Array         | null     | the custom data |


### Function
| Name        | Type                         | Description  |
| ----------- |:-----------------------------| -------------|
| setValue    | Params: value[Number, Array] | set value of the component |
| setIndex    | Params: index*[Number]       | set index of the component  |
| getValue    | Return: value[Number, Array] | get value of the component |
| getIndex    | Return: index*[Number]       | get index of the component |
| refresh     | null                         | Refresh the component      |

* [ index ] is the index to the array in the custom data model *
* [ index ] is equal to (( value - min ) / interval ) in normal mode *

### Events
| Name          | Type          | Description  |
| --------------|:--------------|--------------|
| callback      | Params: value[Number]  | values change when the callback function |
| drag-start    | Params: context[Object]| Drag the start event |
| drag-end      | Params: context[Object]| Drag the end event |


## License

[The MIT License](https://nightcatsama.github.io/vue-slider-component/LICENSE)