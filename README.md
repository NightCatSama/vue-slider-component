# vue-slider-component

[![downloads](https://img.shields.io/npm/dt/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![npm-version](https://img.shields.io/npm/v/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![license](https://img.shields.io/npm/l/express.svg)]()

Can use the slider in vue1.x and vue2.x. (No longer update vue1.x, but still can be normal use)

[Demo](https://nightcatsama.github.io/vue-slider-component/example/)

[Live Demo](https://jsfiddle.net/2xy72dod/1240/)

## [Changelog](https://github.com/NightCatSama/vue-slider-component/blob/master/CHANGELOG.md)

## Todo

- [x] Basis
- [x] Display maximum value & minimum value
- [x] piecewise style
- [x] Compatible with PC and mobile terminal
- [x] Tooltip
- [x] The custom data
- [x] Range
- [x] The vertical component

## Install
``` bash
npm install vue-slider-component --save
```

## Exceptions
if the component initialization in a `v-show="false" / display: none` container or use `transform / animation / margin` to change the location of the component, there may be an exception ( The slider cannot be used, because the component can not initialize the size or slider position ).

The solution:
 1. using `v-if` instead of `v-show` or `display: none`.
 2. use prop `show` to control display.
 3. After the component appears, to call the `refresh` method.

Example: <https://jsfiddle.net/2xy72dod/254/>

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
| direction   | String        | horizontal | Set the direction of the component, optional value: ['horizontal', 'vertical'] |
| event-type  | String        | auto   | The event type, optional value: ['auto', 'none'] |
| width       | Number[,String(in horizontal)] | auto | Width of the component |
| height      | Number[,String(in vertical)] | 6        | Height of the component |
| dot-size    | Number        | 16       | Determines width and height of the sliders. to set different values of `width` & `height` use `dot-width` & `dot-height` props |
| dot-width   | Number        | value of `dot-size` prop | Width of sliders. If specified, overrides value of `dot-size` |
| dot-height  | Number        | value of `dot-size` prop | Height of sliders. If specified, overrides value of `dot-size` |
| min         | Number        | 0        | The minimum numerical value that can be selected  |
| max         | Number        | 100      | The maximum numerical value that can be selected  |
| interval    | Number        | 1        | The gap between the values |
| show        | Boolean       | true     | Display of the component |
| speed       | Number        | 0.5      | Transition time |
| disabled    | Boolean[, Array<Boolean>(in range model)]  | false    | Whether to disable the component |
| debug       | Boolean       | true | If you do not need to print errors in the production environment, can be set to `process.env.NODE_ENV !== 'production'` |
| piecewise   | Boolean       | false    | Whether to display sub-values as as piecewise nodes |
| piecewise-label*   | Boolean  | false  | Whether to display the label. [Example](https://nightcatsama.github.io/vue-slider-component/example/#demo2) |
| tooltip     | String, Boolean | always    | Control the tooltip, optional value: ['hover', 'always', false] |
| tooltip-dir | String[,Array(in range model) | top(in horizontal)or left(in vertical) | Set the direction of the tooltip, optional value: ['top', 'bottom', 'left', 'right'] |
| reverse     | Boolean       | false    | Whether the component reverse (such as Right to left, Top to bottom) |
| value       | Number, String, Array, Object  | 0        | Initial value (if the value for the array open range model) |
| data        | Array         | null     | The custom data. |
| clickable   | Boolean       | true     | Whether or not the slider is clickable as well as drag-able |
| startAnimation | Boolean    | false    | Whether to enable the initial animation |
| tooltip-merge* | Boolean       | true    | Whether to merge with tooltip overlap |
| merge-formatter* | String, Function  | null    | Formatting of the merged value, for example: `merge-formatter="¥{value1} ~ ¥{value2}"` or `` merge-formatter: (v1, v2) => `¥${v1} ~ ¥${v2}` ``. |
| stop-propagation*  | Boolean       | false    | All events call `stopPropagation` |
| real-time*  | Boolean       | false    | Whether the real-time computing the layout of the components |
| lazy*       | Boolean       | false    | At the end of the drag and drop, to synchronization value (if each update to high consumption of operation (such as Ajax), it is more useful) [Example](https://nightcatsama.github.io/vue-slider-component/example/#demo1) |
| fixed*  | Boolean       | false    | Fixed distance between two values (valid only in range mode). [Example]
| process-dragable*  | Boolean       | false    | Whether the process bar is draggable (valid only in range mode). [Example](https://nightcatsama.github.io/vue-slider-component/example/#demo9) |
| formatter*        | String,Function | null   | Formatting of a tooltip's values, for example: `formatter='¥{value}'` or `` formatter: (v) => `¥${v}` ``. [Example](https://nightcatsama.github.io/vue-slider-component/example/#demo3) |
| use-keyboard*        | Boolean | false   | Whether to open the keyboard control (Only support the arrow keys). [Example](https://nightcatsama.github.io/vue-slider-component/example/#demo3) |
| actions-keyboard*        | Array | `[(i) => i - 1, (i) => i + 1]`  | In the keyboard control mode, reduce(←, ↓) and increase(→, ↑) the calling method.(`i` is the index value) |
| bg-style*         | Object | null  | The style of the background. |
| slider-style*     | Object[, Array(in range model), Function<Value, Index>] | null  | The style of the slider. |
| disabled-style*   | Object | null  | The style of the slider in disabled state. |
| disabled-dot-style*   | Object, Array, Function<Value, Index>] | null  | The style of the dot in disabled state. |
| process-style*    | Object | null  | The style of the process bar. |
| piecewise-style*  | Object | null  | The style of the piecewise dot. |
| piecewise-active-style*  | Object | null  | The style of the piecewise dot in the activated state. |
| tooltip-style*    | Object[, Array(in range model), Function<Value, Index>] | null  | The style of the tooltip. |
| label-style*      | Object | null  | The style of the label. |
| label-active-style*      | Object | null  | The style of the label in the activated state. |
| focus-style*     | Object[, Array(in range model), Function<Value, Index>] | null  | The style of the slider when it is focused. (Works only when `use-keyboard` is `true`) |

prop*: [only supported in vue2]

### Function
| Name        | Type           | Description                |
| ----------- |:---------------| ---------------------------|
| setValue    | Params: value [, noCallback: boolean, speed: number] | set value of the component |
| setIndex    | Params: index* | set index of the component |
| getValue    | Return: value  | get value of the component |
| getIndex    | Return: index* | get index of the component |
| refresh     | null           | Refresh the component      |

* [ index ] is the index to the array in the custom data model *
* [ index ] is equal to (( value - min ) / interval ) in normal mode *

### Events
| Name          | Type          | Description  |
| --------------|:--------------|--------------|
| callback      | Params: value[Number \| Array]  | values change when the callback function. (Changes in the direct assignment value will not trigger the callback, it is recommended to use `setValue` method) |
| drag-start    | Params: context[Object]| Drag the start event |
| drag-end      | Params: context[Object]| Drag the end event |
| on-keypress   | Params: value[Number \| Array]| keyboard event |

### Slot
| Name          | Description  |
| --------------|--------------|
| tooltip       | Customize the tooltip slot. optional value: [`value`, `index`, `disabled`(only range model), `merge`(only tooltipMerge is `true`)] |
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
