
# Vue-slider-component

[![downloads](https://img.shields.io/npm/dt/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![npm-version](https://img.shields.io/npm/v/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![license](https://img.shields.io/npm/l/express.svg)]()

> 🎚 A highly customized slider component

English | [简体中文](https://github.com/NightCatSama/vue-slider-component/blob/refactor/README-CN.md)


## ✨ New Features (v3.x)
- 🔧 Fix [exceptions](https://github.com/NightCatSama/vue-slider-component#exceptions)
- 🍖 More customizable
- 👗 Multiple style themes
- 🐳 Support for more sliders
- 📌 Add marks
- 🎉 Support SSR
- 🍒 Support Typescript


## 🎯 install
```bash
$ yarn add vue-slider-component
```


## 🚀 Usage
```vue
<template>
  <vue-slider v-model="value" />
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    VueSlider
  },
  data () {
    return {
      value: 0
    }
  }
}
</script>
```

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/NightCatSama/vue-slider-component/blob/master/CHANGELOG.md).

## License

[MIT](https://github.com/NightCatSama/vue-slider-component/blob/master/LICENSE)