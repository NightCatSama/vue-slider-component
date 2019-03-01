# 方法

### getValue()

- **返回值**：

  - `{number | string | number[] | string[]} value` 滑块的值

- **用法**：

  得到滑块的值。

  一般情况下，返回的值等于参数的 `value`。

  只有当 `lazy = true` 并且在拖拽状态中时，他们才可能不相等。

  ```html
  <vue-slider ref="slider"/>

  this.$refs.slider.getValue()
  ```

### getIndex()

- **返回值**：

  - `{number | number[]} index` 滑块的索引

- **用法**：

  得到滑块的索引。

  一般情况下, 返回的索引等于 `(value - min) / interval`。

  当设置了 `data` 时，返回的索引是值在 `data` 中的索引。

  ```html
  <vue-slider ref="slider"/>

  this.$refs.slider.getIndex()
  ```

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