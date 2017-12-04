# vue-slider-component

[![downloads](https://img.shields.io/npm/dt/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![npm-version](https://img.shields.io/npm/v/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![license](https://img.shields.io/npm/l/express.svg)]()

Can use the slider in vue1.x and vue2.x

[Demo](https://nightcatsama.github.io/vue-slider-component/example/)

[Live Demo](https://jsfiddle.net/2xy72dod/167/)

## Install
``` bash
npm install vue-slider-component --save
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
 - `tooltipDir` and `sliderStyle` and `tooltipStyle` prop support type: Array
 - Add `real-time` prop for real-time computing the layout of the components
 - Add labels of piecewise, and the style of the corresponding
 - Add Tooltip slot ([#Scoped-Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots) only vue 2.1.0+)
 - The `event-type` prop no longer supports `mouse` and `touch` (bind touch and mouse events by default)

## Todo

- [x] Basis
- [x] Display maximum value & minimum value
- [x] piecewise style
- [x] Compatible with PC and mobile terminal
- [x] Tooltip
- [x] The custom data
- [x] Range
- [x] The vertical component


## Run example
``` bash
cd example/

# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev
```

## Usage

#### Use in vue1.x:

```html
<template>
  <div>
    <vue-slider v-ref:slider :value.sync="value"></vue-slider>
  </div>
</template>
<script>
// Used only in vue1.x version
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

#### Use in vue2.x:

```html
<template>
  <div>
    <vue-slider ref="slider" v-model="value"></vue-slider>
  </div>
</template>
<script>
// Used only in vue2.x version
import vueSlider from 'vue-slider-component'
// or
// import vueSlider from 'vue-slider-component/src/vue2-slider.vue'

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

#### Use with Browserify (vueify):

```js
import vueSlider from 'vue-slider-component/src/vue2-slider.vue'
```


## Options

### Props
| Props       | Type          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| direction   | String        | horizontal | set the direction of the component, optional value: ['horizontal', 'vertical'] |
| event-type  | String        | auto   | the event type, optional value: ['auto', 'none'] |
| width       | Number[,String(in horizontal)] | auto | width of the component |
| height      | Number[,String(in vertical)] | 6        | height of the component |
| dot-size    | Number        | 16       | determines width and height of the sliders. to set different values of `width` & `height` use `dot-width` & `dot-height` props |
| dot-width   | Number        | value of `dot-size` prop | width of sliders. if specified, overrides value of `dot-size` |
| dot-height  | Number        | value of `dot-size` prop | height of sliders. if specified, overrides value of `dot-size` |
| min         | Number        | 0        | the minimum value   |
| max         | Number        | 100      | the maximum value   |
| interval    | Number        | 1        | the gap between the values |
| show        | Boolean       | true     | display of the component |
| speed       | Number        | 0.5      | transition time |
| disabled    | Boolean       | false    | whether to disable components |
| piecewise   | Boolean       | false    | whether to display the piecewise |
| piecewise-label*   | Boolean  | false  | whether to display the label. [demo here](https://nightcatsama.github.io/vue-slider-component/example/#demo2) |
| tooltip     | String, Boolean | always    | control the tooltip, optional value: ['hover', 'always', false] |
| tooltip-dir | String[,Array(in range model) | top(in horizontal)or left(in vertical) | set the direction of the tooltip, optional value: ['top', 'bottom', 'left', 'right'] |
| reverse     | Boolean       | false    | whether the component reverse (such as Right to left, Top to bottom) |
| value       | Number,Array  | 0        | initial value (if the value for the array open range model) |
| data        | Array         | null     | the custom data. |
| clickable   | Boolean       | true     | Whether or not the slider is clickable as well as drag-able |
| stop-propagation*  | Boolean       | false    | All events call `stopPropagation` |
| real-time*  | Boolean       | false    | Whether the real-time computing the layout of the components |
| lazy*       | Boolean       | false    | At the end of the drag and drop, to synchronization value (if each update to high consumption of operation (such as Ajax), it is more useful) |
| formatter*        | String,Function | null   | Formatting a tooltip values, Example: `formatter='¥{value}'` or `` formatter: (v) => `¥${v}` ``. [demo here](https://nightcatsama.github.io/vue-slider-component/example/#demo3) |
| bg-style*         | Object | null  | The style of the background. |
| slider-style*     | Object[,Array(in range model), Function<Value, Index>] | null  | The style of the slider. |
| process-style*    | Object | null  | The style of the process bar. |
| piecewise-style*  | Object | null  | The style of the piecewise dot. |
| piecewise-active-style*  | Object | null  | The style of the piecewise dot in the activated state. |
| tooltip-style*    | Object[,Array(in range model), Function<Value, Index>] | null  | The style of the tooltip. |
| label-style*      | Object | null  | The style of the label. |
| label-active-style*      | Object | null  | The style of the label in the activated state. |

prop*: [only support vue2]

### Function
| Name        | Type           | Description                |
| ----------- |:---------------| ---------------------------|
| setValue    | Params: value [, noCallback] | set value of the component |
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
| drag-start    | Params: context[Object]| Drag the start event |
| drag-end      | Params: context[Object]| Drag the end event |

### Slot
| Name          | Description  |
| --------------|--------------|
| tooltip       | Customize the tooltip slot. optional value: [`value`, `index`(only range model)] |
| piecewise     | Customize the piecewise slot. optional value: [`label`, `index`, `active`, `first`, `last`] |
| label         | Customize the label slot. optional value: [`label`, `index`, `active`, `first`, `last`] |

[#](https://vuejs.org/v2/guide/components.html#Scoped-Slots) When using the template element as a slot, can add special properties `scope` or `slot-scope` to get the value.

e.g.
```html
<vue-slider v-model="value">
  <template slot="tooltip" scope="{ value }">
    <div class="diy-tooltip">
      {{ value }}
    </div>
  </template>
</vue-slider>

<!-- In vue2.5 above, please use slot-scope instead of scope -->
<vue-slider v-model="value">
  <div class="diy-tooltip" slot="tooltip" slot-scope="{ value }">
    {{ value }}
  </div>
</vue-slider>
```

## Exceptions
if the component initialization in a `v-show="false" / display: none` container or use `transform / animation` to appear component, there may be an exception ( The slider cannot be used, because the component can not initialize the size or slider position ).

The solution:
 1. using `v-if` instead of `v-show` or `display: none`.
 2. use prop `show` to control display.
 3. After the component appears, to call the `refresh` method.

Example: <https://jsfiddle.net/2xy72dod/254/>

## Using it with NUXT.js

This hack is just to avoid the server side 'document' error when using it with Nuxt.js.
Use it if you don't need to have this component rendered on the server side.

1. Install [this](https://github.com/egoist/vue-no-ssr) and add it to the variable `components`. i.e.
```js
import NoSSR from 'vue-no-ssr'

let components = {
    /**
     * Add No Server Side Render component
     * to make client DOM math the server DOM
     */
    'no-ssr': NoSSR
}
```

2. In your template, encapsulate 'vue-slider-component' into the 'no-ssr' component to avoid redner the html on the server like this:
```html
<no-ssr>
    <vue-slider ref="slider"></vue-slider>
</no-ssr>
```

3. Require the library just for client side and add the 'vue-slider-component' component to the template component list
```js
if (process.browser) {
    // in older versions of nuxt, it's process.BROWSER_BUILD
    let VueSlider = require('vue-slider-component')
    components['vue-slider'] = VueSlider
}
```

4. Apply the components
```js
export default {
    components
}
```

## License

[MIT](LICENSE)
