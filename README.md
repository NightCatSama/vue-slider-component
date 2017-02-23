# vue-slider-component

[![build](https://img.shields.io/wercker/ci/wercker/docs.svg)](https://github.com/NightCatSama/vue-slider-component)
[![build](https://img.shields.io/badge/npm-1.0.4-blue.svg)](https://github.com/NightCatSama/vue-slider-component)
[![build](https://img.shields.io/npm/l/express.svg)](https://github.com/NightCatSama/vue-slider-component)

Can use the slider in vue1.x and vue2.x

[Live Demo](https://nightcatsama.github.io/vue-slider-component/example/)

## Install
``` bash
npm install vue-slider-component
```

## Update

 - Remove class-name & styles (can use vue native props [style, class])
 - Remove val prop, use v-model set value (Don't need to manually two-way binding)
 - Optimize the click range
 - No longer update vue1.x, but still can be normal use
 - Add `lazy` prop
 - Support array setIndex method parameters
 - Support ie 9+
 - Add props `*-style` for the custom style
 - Add `formatter` prop
 - Add `clickable` prop

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
``` bash
cd example/

# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev
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
| width       | Number[,String(in horizontal)] | auto | width of the component |
| height      | Number[,String(in vertical)] | 6        | height of the component |
| dot-size    | Number        | 16       | size of the sliders |
| min         | Number        | 0        | the minimum value   |
| max         | Number        | 100      | the maximum value   |
| interval    | Number        | 1        | the gap between the values |
| show        | Boolean       | true     | display of the component |
| speed       | Number        | 0.5      | transition time |
| disabled    | Boolean       | false    | whether to disable components |
| clickable   | Boolean       | true     | whether to clickable components |
| piecewise   | Boolean       | false    | display of the piecewise |
| tooltip     | String,Boolean| false    | control the tooltip, optional value: ['hover', 'always', false] |
| tooltip-dir | String        | top(in horizontal)or left(in vertical) | set the direction of the tooltip, optional value: ['top', 'bottom', 'left', 'right'] |
| reverse     | Boolean       | false    | whether the component reverse (such as Right to left, Top to bottom) |
| value       | Number,Array  | 0        | initial value (if the value for the array open range model) |
| data        | Array         | null     | the custom data. |
| lazy*       | Boolean       | false    | At the end of the drag and drop, to synchronization value (if each update to high consumption of operation (such as Ajax), it is more useful) |
| formatter*     | String,Function | null   | Formatting a tooltip values, Example: `formatter='¥{value}'` or `` formatter: (v) => `¥${v}` ``. [demo here](https://nightcatsama.github.io/vue-slider-component/example/#demo4) |
| bg-style*     | Object | null  | The style of the background. |
| slider-style*     | Object | null  | The style of the slider. |
| process-style*     | Object | null  | The style of the process bar. |
| piecewise-style*     | Object | null  | The style of the piecewise dot. |
| tooltip-style*     | Object | null  | The style of the tooltip. |

prop*: [only support vue2]

### Function
| Name        | Type           | Description                |
| ----------- |:---------------| ---------------------------|
| setValue    | Params: value  | set value of the component |
| setIndex    | Params: index* | set index of the component |
| getValue    | Return: value  | get value of the component |
| getIndex    | Return: index* | get index of the component |
| refresh     | null           | Refresh the component      |

* [ index ] is the index to the array in the custom data model *
* [ index ] is equal to (( value - min ) / interval ) in normal mode *

### Events
| Name          | Type          | Description  |
| --------------|:--------------|--------------|
| callback      | Params: value[Number]  | values change when the callback function |
| drag-start    | Params: context[Object]| Drag the staUnable to initialize the width componentsrt event |
| drag-end      | Params: context[Object]| Drag the end event |

## Exceptions
if the component initialization in a `v-show="false"` container, will appear exception( The slider cannot be used, because the component unable to initialize the size in `display: none` ).

The solution:
 1. using `v-if` instead of `v-show`.
 2. use prop `show` to control display.
 3. After the set `v-show="true"`, to call the `refresh` method.

for example:
```
this.show = true
this.$nextTick(() => {
    this.$refs.slider.refresh()
})
```

## License

[MIT](https://github.com/NightCatSama/vue-slider-component/blob/master/LICENSE)
