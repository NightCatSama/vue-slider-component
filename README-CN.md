# vue-slider-component

[![downloads](https://img.shields.io/npm/dm/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![npm-version](https://img.shields.io/npm/v/vue-slider-component.svg)](https://www.npmjs.com/package/vue-slider-component)
[![license](https://img.shields.io/npm/l/express.svg)]()

> 🎚 一个高度定制化的滑块组件

[English](https://github.com/NightCatSama/vue-slider-component/blob/master/README.md) | 简体中文

如果你不需要新的特性，也可以使用更稳定的版本 [v2.x](https://github.com/NightCatSama/vue-slider-component/tree/v2)

## ✨ 新特性(v3.x)
- 🔧 修复了[异常](https://github.com/NightCatSama/vue-slider-component/tree/v2#exceptions)
- 🍖 更加可定制化
- 👗 多种样式主题
- 🐳 支持更多的滑块
- 📌 增加标志设置
- 🎉 支持 SSR
- 🍒 支持 Typescript

## 📚 文档

在线文档：<https://nightcatsama.github.io/vue-slider-component/#/zh-CN/>

在线例子：<https://jsfiddle.net/NightCatSama/2xy72dod/10339/>


## 🎯 安装
```bash
$ yarn add vue-slider-component
# npm install vue-slider-component --save
```


## 🚀 使用
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

## 更新日志

每个版本的[更新日志](https://github.com/NightCatSama/vue-slider-component/blob/master/CHANGELOG.md).

## License

[MIT](https://github.com/NightCatSama/vue-slider-component/blob/master/LICENSE)