# vue-slider-component
Can use the slider in vue1.x and  vue2.x

[Live Demo](https://nightcatsama.github.io/vue-slider-component/example/)

## Install
``` bash
npm install vue-slider-component
```

## Example
``` bash
cd example/

# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev
```

## Update

 - Remove class-name & styles (can use vue native props [style, class])
 - Remove val prop, use v-model set value (Don't need to manually two-way binding)
 - Optimize the click range
 - Add lazy Prop
 - Support array setIndex method parameters

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
    <vue-slider v-ref:slider :value.sync="value"></vue-slider>
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
    value: 1
  }
});
</script>
```
<br>
Use in vue2.x

e.g:
```html
<template>
  <div>
    <vue-slider ref="slider" v-model="value"></vue-slider>
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component'

new Vue({
  el: '#app',
  components: {
    vueSlider
  },
  data: {
    value: 1
  }
});
</script>
```
<br>
Use with Browserify (vueify)
<br>Use this little fix:

e.g:
```js
import vueSlider from 'vue-slider-component/src/vue2-slider.vue'
```


## Options

### Props
| Props       | Type          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| direction   | String        | horizontal | set the direction of the component, optional value: ['horizontal', 'vertical'] |
| event-type  | String        | auto   | the event type, optional value: ['auto', 'touch', 'mouse', 'none'] |
| width       | Number[,String(in horizontal)] | 150      | width of the component |
| height      | Number[,String(in vertical)] | 4        | height of the component |
| dot-size    | Number        | 15       | size of the sliders |
| min         | Number        | 0        | the minimum value   |
| max         | Number        | 100      | the maximum value   |
| interval    | Number        | 1        | the gap between the values |
| show        | Boolean       | true     | display of the component |
| speed       | Number        | 0.5      | transition time |
| lazy        | Boolean       | false    | only support vue2, at the end of the drag and drop, to synchronization value (if each update to high consumption of operation (such as Ajax), it is more useful) |
| disabled    | Boolean       | false    | whether to disable components |
| piecewise   | Boolean       | false    | display of the piecewise |
| tooltip     | String,Boolean| false    | control the tooltip, optional value: ['hover', 'always', false] |
| tooltip-dir | String        | top(in horizontal)or left(in vertical) | set the direction of the tooltip, optional value: ['top', 'bottom', 'left', 'right'] |
| reverse     | Boolean       | false    | whether the component reverse (such as Right to left, Top to bottom) |
| value       | Number,Array  | 0        | initial value (if the value for the array open range model) |
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
