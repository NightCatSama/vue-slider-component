# 快速开始

## 安装

```bash
# npm install vue-slider-component@beta --save
yarn add vue-slider-component@beta
```

## 使用

1. 全局引用

```js
// main.js
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)
```

2. 局部引用

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
