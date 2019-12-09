
# vue-slider-component

[![downloads](https://img.shields.io/npm/dm/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![npm-version](https://img.shields.io/npm/v/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![license](https://img.shields.io/npm/l/express.svg)]()

> 🎚 A highly customized slider component

English | [简体中文](https://github.com/NightCatSama/vue-slider-component/blob/master/README-CN.md)

## ✨ Features
- 🍖 More customizable
- 👗 Multiple style themes
- 🐳 Support for more sliders
- 📌 Add marks
- 🎉 Support SSR
- 🍒 Support Typescript

## 📚 Documentation

Document: <https://nightcatsama.github.io/vue-slider-component>

Live Demo: <https://jsfiddle.net/NightCatSama/2xy72dod/10520/>


## 🎯 install
```bash
$ yarn add vue-slider-component
# npm install vue-slider-component --save
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

## Support

If you like this component, you can ask me to drink [coffee](https://www.paypal.me/nightcatsama) ☕️.

## License

[MIT](https://github.com/NightCatSama/vue-slider-component/blob/master/LICENSE)