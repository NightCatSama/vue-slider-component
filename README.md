![banner](https://raw.githubusercontent.com/NightCatSama/vue-slider-component/master/.github/banner.jpg)

[![downloads](https://img.shields.io/npm/dm/vue-slider-component.svg)][npm]
[![npm-version](https://img.shields.io/npm/v/vue-slider-component.svg)][npm]
[![license](https://img.shields.io/npm/l/express.svg)]()

> 🎚 A highly customized slider component

English | [简体中文][ch] | [Русский][ru]

## 🍉 Vue3.x

This is still in beta and may contain unexpected bugs, please use with caution.

#### install

```bash
$ yarn add vue-slider-component@next
# npm install vue-slider-component@next --save
```

#### Breaking Changes

- `value` -> `modelValue`. ([Official API Changes](https://v3-migration.vuejs.org/breaking-changes/v-model.html#v-model))

## ✨ Features

- 🍖 More customizable
- 👗 Multiple style themes
- 🐳 Support for more sliders
- 📌 Add marks
- 🎉 Support SSR
- 🍒 Support Typescript

## 📚 Documentation

Document: <https://nightcatsama.github.io/vue-slider-component>

Live Demo: <https://jsfiddle.net/NightCatSama/2xy72dod/10547/>

## 🎯 install

```bash
$ yarn add vue-slider-component
# npm install vue-slider-component --save
```

## 🚀 Usage

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

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/NightCatSama/vue-slider-component/blob/master/CHANGELOG.md).

## Support

If my code has helped you, please consider [buy me a coffee](https://www.buymeacoffee.com/nightcat) ☕.

## License

[MIT](https://github.com/NightCatSama/vue-slider-component/blob/master/LICENSE)

[npm]: https://www.npmjs.com/package/vue-slider-component
[en]: https://github.com/NightCatSama/vue-slider-component/blob/master/README.md
[ch]: https://github.com/NightCatSama/vue-slider-component/blob/master/README-CN.md
[ru]: https://github.com/NightCatSama/vue-slider-component/blob/master/README-RU.md
