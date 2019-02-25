# Simple

### 单个滑块

<example :value="example1"></example>

### 多个滑块

<example :value="example2"></example>

### 设置滑块范围

<example :value="example3"></example>

### 控制滑块方向

<example :value="example4"></example>

::: tip
 - `ltr` 代表着 `left to right`，即自左向右的水平滑块。`rtl/btt/ttb` 同理
 - 当 `direction` 的值为 `btt` 或 `ttb` 时，需要给定组件一个高度
:::

### 懒更新

只有当拖拽结束后，值才会更新

<example :value="example5"></example>

<script>
  export default {
    data () {
      return {
        example1: `
<template>
  <div>
    <vue-slider v-model="value"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0,
      }
    }
  }
        `,
        example2: `
<template>
  <div>
    <vue-slider v-model="value_2"></vue-slider>
    <vue-slider v-model="value_3"></vue-slider>
    <vue-slider v-model="value_4"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value_2: [0, 50],
        value_3: [0, 50, 80],
        value_4: [0, 50, 80, 100],
      }
    }
  }
        `,
        example3: `
<template>
  <div>
    <vue-slider
      v-model="value"
      :min="0"
      :max="1"
      :interval="0.01"
    ></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0
      }
    }
  }
        `,
        example4: `
<template>
  <div class="flex">
    <vue-slider v-model="value"></vue-slider>
    <vue-slider v-model="value" direction="rtl"></vue-slider>
    <vue-slider
      v-model="value"
      direction="btt"
      :height="300"
      style="display: inline-block; margin: 30px;"
    ></vue-slider>
    <vue-slider
      v-model="value"
      direction="ttb"
      style="display: inline-block; margin: 30px 0; height: 300px;"
    ></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0
      }
    }
  }
        `,
        example5: `
<template>
  <div>
    <div>value: {{ value }}</div>
    <vue-slider v-model="value" :lazy="true"></vue-slider>
  </div>
</template>

<script>
  module.exports = {
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0
      }
    }
  }
      `,
      }
    }
  }
</script>