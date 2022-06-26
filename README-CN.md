# vue-slider-component

[![downloads](https://img.shields.io/npm/dm/vue-slider-component.svg)][npm]
[![npm-version](https://img.shields.io/npm/v/vue-slider-component.svg)][npm]
[![license](https://img.shields.io/npm/l/express.svg)]()

> 🎚 一个高度定制化的滑块组件

[English][en] | 简体中文 | [Русский][ru]

## 🍉 Vue3.x

目前仍然是测试版本，可能存在意想不到的 bug，请谨慎使用。

#### 安装

```bash
$ yarn add vue-slider-component@next
# npm install vue-slider-component@next --save
```

#### API 变化

- `value` -> `modelValue`. ([官方 API 变化](https://v3-migration.vuejs.org/breaking-changes/v-model.html#v-model))

## ✨ 新特性

- 🍖 更加可定制化
- 👗 多种样式主题
- 🐳 支持更多的滑块
- 📌 增加标志设置
- 🎉 支持 SSR
- 🍒 支持 Typescript

## 📚 文档

在线文档：<https://nightcatsama.github.io/vue-slider-component/#/zh-CN/>

在线例子：<https://jsfiddle.net/NightCatSama/2xy72dod/10547/>

## 🎯 安装

```bash
$ yarn add vue-slider-component
# npm install vue-slider-component --save
```

## 🚀 使用

<details><summary>Vue 2</summary>

```vue
<template>
  <vue-slider v-model="value" />
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    VueSlider,
  },

  data() {
    return {
      value: 0,
    }
  },
}
</script>
```

</details>

<details><summary>Vue 3</summary>

```vue
<template>
  <vue-slider v-model="value" />
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  setup() {
    const data = reactive({ value: 0 })
    return toRefs(data)
  },
}
</script>
```

</details>

## 更新日志

每个版本的[更新日志](https://github.com/NightCatSama/vue-slider-component/blob/master/CHANGELOG.md)。

## 支持

如果你喜欢这个组件，你也可以请我喝[咖啡](https://imgchr.com/i/ErWs1J) ☕。

## License

[MIT](https://github.com/NightCatSama/vue-slider-component/blob/master/LICENSE)

[npm]: https://www.npmjs.com/package/vue-slider-component
[en]: https://github.com/NightCatSama/vue-slider-component/blob/master/README.md
[ch]: https://github.com/NightCatSama/vue-slider-component/blob/master/README-CN.md
[ru]: https://github.com/NightCatSama/vue-slider-component/blob/master/README-RU.md
