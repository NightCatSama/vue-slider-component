# 方法

### focus([index])

- **参数**：

  - `{number} index` 滑块的索引

- **用法**：

  滑块获取焦点

  ```html
  <vue-slider
    ref="slider"
    v-model="value"
    :use-keyboard="true"
  />

  this.$refs.slider.focus()
  ```

### blur()

- **用法**：

  失去焦点

  ```html
  <vue-slider
    ref="slider"
    v-model="value"
    :use-keyboard="true"
  />

  this.$refs.slider.blur()
  ```