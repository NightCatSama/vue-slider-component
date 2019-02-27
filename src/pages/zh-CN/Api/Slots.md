# 插槽

## dot

- **作用域**：

  - `{number} pos` 在组件中的位置，按百分比计算

  - `{number} index` 滑块的索引

  - `{number | string} value` 滑块的值

  - `{boolean} focus` 是否处于焦点状态

  - `{boolean} disabled` 是否处于禁用状态

- **用法**：

  滑块的插槽

  ```html
  <vue-slider v-model="value">
    <template v-slot:dot>
      <img :src="imgUrl" class="custom-dot"/>
    </template>
  </vue-slider>
  ```