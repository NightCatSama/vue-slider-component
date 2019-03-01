# QuickStart

## Install

```bash
# npm install vue-slider-component --save
yarn add vue-slider-component
```

## Include

1. Global include

```js
// main.js
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)
```

2. Local include

```js
// App.vue
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    VueSlider
  }
}
```

3. Direct `<script>` Include

```html
<link ref="stylesheet" src="./node_modules/vue-slider-component/theme/default.css">
<script src="./node_modules/vue-slider-component/dist/vue-slider-component.umd.min.js"></script>
<script>
  new Vue({
    el: '#app',
    components: {
      VueSlider: window['vue-slider-component']
    }
  })
</script>
```

## Usage

```html
<vue-slider v-model="value"></vue-slider>
```