# 快速开始

## 安装

```bash
# npm install vue-slider-component --save
yarn add vue-slider-component
```

## 引入

1. 全局引入

```js
// main.js
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)
```

2. 局部引入

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

3. 使用`<script>`引入

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

## 使用

```html
<vue-slider v-model="value"></vue-slider>
```