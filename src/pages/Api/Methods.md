# Methods

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