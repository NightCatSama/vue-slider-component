# 插槽

## dot

- **作用域**：

  - `{number} pos` 在组件中的位置，按百分比计算

  - `{number} index` 滑块的索引

  - `{number | string} value` 滑块的值

  - `{boolean} focus` 是否处于焦点状态

  - `{boolean} disabled` 是否处于禁用状态

- **用法**：

  ```html
  <vue-slider v-model="value">
    <template v-slot:dot>
      <img :src="imgUrl" class="custom-dot"/>
    </template>
  </vue-slider>
  ```

## tooltip

- **作用域**：

  - `{number} pos` 在组件中的位置，按百分比计算

  - `{number} index` 滑块的索引

  - `{number | string} value` 滑块的值

  - `{boolean} focus` 是否处于焦点状态

  - `{boolean} disabled` 是否处于禁用状态

- **用法**：

  ```html
  <vue-slider v-model="value">
    <template v-slot:tooltip="{ value }">
      <div class="custom-tooltip">{{ value }}</div>
    </template>
  </vue-slider>
  ```

## label

- **作用域**：

  - `{number | string} label` 标签

  - `{number} pos` 在组件中的位置，按百分比计算

  - `{number | string} value` 滑块的值

  - `{boolean} active` 是否处于激活状态

- **用法**：

  ```html
  <vue-slider v-model="value" :marks="true" :interval="10">
    <template v-slot:label="{ active, value }">
      <div :class="['vue-slider-mark-label', 'custom-label', { active }]">{{ value }}</div>
    </template>
  </vue-slider>
  ```

  ::: tip
    如果没有加 `.vue-slider-mark-label`，则需要自己计算位置。
  :::

## step

- **作用域**：

  - `{number | string} label` 标签

  - `{number} pos` 在组件中的位置，按百分比计算

  - `{number | string} value` 滑块的值

  - `{boolean} active` 是否处于激活状态

- **用法**：

  ```html
  <vue-slider v-model="value" :marks="true" :interval="10">
    <template v-slot:step="{ active, value }">
      <div :class="['vue-slider-mark-label', 'custom-label', { active }]">{{ value }}</div>
    </template>
  </vue-slider>
  ```

## mark

- **作用域**：

  - `{number | string} label` 标签

  - `{number} pos` 在组件中的位置，按百分比计算

  - `{number | string} value` 滑块的值

  - `{boolean} active` 是否处于激活状态

- **用法**：

  标志的插槽（包含 `label` 和 `step`），需要自己设置位置。

  ```html
  <vue-slider v-model="value" :marks="true" :interval="10">
    <template v-slot:mark="{ pos, label }">
      <div class="custom-mark" :style="{ left: `${pos}%` }">
        {{ label }}
      </div>
    </template>
  </vue-slider>

  <style>
    .custom-mark {
      position: absolute;
      top: 10px;
      transform: translateX(-50%);
      white-space: nowrap;
    }
  </style>
  ```

## process

- **作用域**:

  - `{number} start` 进度条开始的位置

  - `{number} end` 进度条结束的位置

  - `{number} index` 进度条的索引（可在多段进度条时使用）

  - `{object} style` 进度条样式，包括组件内部已经计算好的样式（宽高、位置等等）

- **用法**:

  进度条插槽。

  ```html
  <vue-slider v-model="value">
    <template v-slot:process="{ start, end, style, index }">
      <div class="vue-slider-process custom-class" :style="[style, customStyle]">
        <!-- Can add custom elements here -->
      </div>
    </template>
  </vue-slider>
  ```


## default

- **作用域**:

  - `{number | string | number[] | string[]} value`

- **用法**:

  当 `lazy = true`, `value` 是内部值.

  ```html
  <vue-slider v-model="value">
    <template v-slot="{ value: innerValue }">
      内部值: {{ innerValue }}
    </template>
  </vue-slider>
  ```