# Methods

### getValue()

- **Return**:

  - `{number | string | number[] | string[]} value` Slider value

- **Usage**：

  Get the value of the component.

  In general, the returned value is equal to the `value` of prop.

  Only when `lazy = true` and in the drag state, it is possible to be not equal.

  ```html
  <vue-slider ref="slider"/>

  this.$refs.slider.getValue()
  ```

### getIndex()

- **Return**:

  - `{number | number[]} index` Slider index

- **Usage**：

  Get the index of the component.

  In general, returned index is equal to `(value - min) / interval`.

  When `data` is set, returned index is the index to the `data`.

  ```html
  <vue-slider ref="slider"/>

  this.$refs.slider.getIndex()
  ```

### focus([index])

- **Arguments**:

  - `{number} index` Slider index

- **Usage**：

  get focus

  ```html
  <vue-slider
    ref="slider"
    v-model="value"
    :use-keyboard="true"
  />

  this.$refs.slider.focus()
  ```

### blur()

- **Usage**：

  remove focus

  ```html
  <vue-slider
    ref="slider"
    v-model="value"
    :use-keyboard="true"
  />

  this.$refs.slider.blur()
  ```