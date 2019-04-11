# 事件

### change

- **类型**：`(value) => void`

- **参数**

  - `{number | string | number[] | string[]} value`

- **用法**：

  当值改变时触发的事件。

### drag-start

- **类型**：`() => void`

- **用法**：

  当鼠标/手指按下滑块时触发的事件。

### dragging

- **类型**：`(value) => void`

- **参数**

  - `{number | string | number[] | string[]} value`

- **用法**：

  拖拽滑块时触发的事件。

  `value` 是滑块内部的值，在 `lazy = true` 的时候可以取得内部值。

### drag-end

- **类型**：`() => void`

- **用法**：

  拖拽结束触发的事件。

### error

- **类型**：`(type, message) => void`

- **参数**

  - `{ERROR_TYPE} type` 错误类型

  - `{string} message` 错误消息

  ```ts
    enum ERROR_TYPE {
      VALUE = 1, // value 不合法
      INTERVAL = 2, // interval 无法被 (max - min) 整除
      MIN, // value 小于 min
      MAX, // value 大于 max
      ORDER, // 当 order 为 false 时，仍然设置了 minRange/maxRange/enableCross/fixed
    }
  ```

- **用法**：

  当组件发生错误时触发的事件

- **参考**：<router-link :to="$route.meta.lang + 'advanced/input'">可输入的滑块值</router-link>

