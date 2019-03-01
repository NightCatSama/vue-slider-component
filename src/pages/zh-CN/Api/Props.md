# 参数

### value

- **类型**：`number | Array<number> | string | Array<string>`

- **默认值**：`0`

- **用法**：

  ```html
  <vue-slider v-model="value" />
  ```

  滑块的值，默认只可使用 `number` 类型。

  ::: tip
    只有当设置了 `data` 时，才支持 `string` 类型。
  :::

### dotSize

- **类型**：`number | Array<number, number>`

- **默认值**：`14`

- **用法**：

  滑块大小，当值为数组时，代表着 `[width, height]`。

### width

- **类型**：`number`

- **默认值**：`undefined`

- **用法**：

  组件的宽度（单位 `px`），水平方向时默认为 `auto`，垂直方向时默认为 `4`。

### height

- **类型**：`number`

- **默认值**：`undefined`

- **用法**：

  组件的高度（单位 `px`），水平方向时默认为 `4`。

### direction

- **类型**：`'ltr' | 'rtl' | 'ttb' | 'bbt'`

- **默认值**：`ltr`

- **用法**：

  组件的方向。

  `ltr` 的意思是 Left to Right，其他同理。

  当值为 `ltr` 或者 `rtl` 时为水平方向，为 `ttb` 或 `bbt` 时为垂直方向。

  ::: warning
    垂直方向时，需给定组件一个高度，否则会无法正常渲染。
  :::

### data

- **类型**：`Array<number> | Array<string>`

- **默认值**：`undefined`

- **用法**：

  自定义数据。

  ```html
  <vue-slider :data="['A', 'B', 'C', 'D']" v-model="value" />
  ```

- **参考**：<router-link :to="$route.meta.lang + 'basics/data'">自定义数据</router-link>

### min

- **类型**：`number`

- **默认值**：`0`

- **用法**：

  最小值，不能大于 `value`。

### max

- **类型**：`number`

- **默认值**：`100`

- **用法**：

  最大值，不能小于 `value`。

### interval

- **类型**：`number`

- **默认值**：`1`

- **用法**：

  两个值的间隔。

  ::: tip
    取值必须大于 0，并且可被 (max - min) 整除。
  :::

### disabled

- **类型**：`boolean`

- **默认值**：`false`

- **用法**：

  是否禁用组件。

### clickable

- **类型**：`boolean`

- **默认值**：`true`

- **用法**：

  是否允许点击更改值。

### duration

- **类型**：`number`

- **默认值**：`0.5`

- **用法**：

  滑动的过渡时间，单位 `s`。

### lazy

- **类型**：`boolean`

- **默认值**：`false`

- **用法**：

  是否懒更新值。

  在拖拽结束时同步 `value`，在每次更新值都需要高消耗操作的时候很有用（例如会发起 Ajax）。

  如果设置了 `lazy` 仍需要监听值的变化，可以监听事件 `dragging`。

  ```html
  <vue-slider
    v-model="value"
    :lazy="true"
    @dragging="val => // do something"
  />
  ```

### tooltip

- **类型**：`'none' | 'always' | 'focus'`

- **默认值**：`'focus'`

- **用法**：

  控制 Tooltip 显示。

  当值为 `none` 时，Tooltip 始终不显示；

  当值为 `always` 时，Tooltip 会始终显示；

  当值为 `focus` 时，仅当滑块获得焦点时，Tooltip 才会显示。且当 `useKeyboard` 为 `true` 时，拖拽结束仍会获得焦点。

### tooltipPlacement

- **类型**：`'top' | 'right' | 'bottom' | 'left'`

- **默认值**：`'top'` (on horizontal) or `'left'` (on vertical)

- **用法**：

  Tooltip 的出现的方位。

### tooltipFormatter

- **类型**：`string | (val: number | number) => string`

- **默认值**：`undefined`

- **用法**：

  格式化 Tooltip 的值，当类型为 `string` 时，`{value}` 会被替换成 Tooltip 的值。

  ```html
    <!-- 将会显示 100%  -->
    <vue-slider v-model="value" :tooltip-formatter="'{value}%'"/>

    <!-- 将会显示 A/B/C/D  -->
    <vue-slider
      v-model="value"
      :data="['a', 'b', 'c', 'd']"
      :tooltip-formatter="val => val.toUpperCase()"
    />
  ```

### useKeyboard

- **类型**：`boolean`

- **默认值**：`false`

- **用法**：

  键盘控制，当值为 `true` 时，拖拽结束滑块仍然获取焦点。

### enableCross

- **类型**：`boolean`

- **默认值**：`true`

- **用法**：

  是否允许滑块交叉，仅在多个滑块时有效。

- **参考**：<router-link :to="$route.meta.lang + 'basics/range'">范围模式</router-link>

### fixed

- **类型**：`boolean`

- **默认值**：`false`

- **用法**：

  是否固定滑块间隔，仅在多个滑块时有效。

- **参考**：<router-link :to="$route.meta.lang + 'basics/range'">范围模式</router-link>

### minRange

- **类型**：`number`

- **默认值**：`undefined`

- **用法**：

  滑块之间的最小距离，仅在多个滑块时有效。

- **参考**：<router-link :to="$route.meta.lang + 'basics/range'">范围模式</router-link>

### maxRange

- **类型**：`number`

- **默认值**：`undefined`

- **用法**：

  滑块之间的最大距离，仅在多个滑块时有效。

- **参考**：<router-link :to="$route.meta.lang + 'basics/range'">范围模式</router-link>

### order

- **类型**：`boolean`

- **默认值**：`true`

- **用法**：

  是否排序值，仅在多个滑块时有效。

  例如 当值为 `false` 时，`[50, 30]` 将不会自动排序为 `[30, 50]`。

  在区分多个滑块时，这很有效

  ::: warning
    当值为 `false` 时，参数 `minRange`，`maxRange`，`fixed`，`enableCross` 无效。
  :::

- **参考**：<router-link :to="$route.meta.lang + 'advanced/order'">无序滑块</router-link>

### marks

- **类型**：`boolean | Marks | Array<number | string> | MarksFunction`

  ```ts
  interface Mark {
    key: string]: string | MarkOption
  }
  interface MarkOption {
    label: Value
    style?: Styles
    activeStyle?: Styles
    labelStyle?: Styles
    labelActiveStyle?: Styles
  }
  type MarksFunction = (value: Value) => boolean | MarkOption
  ```

- **默认值**：`undefined`

- **用法**：

  用于控制标志的显示。

- **参考**：<router-link :to="$route.meta.lang + 'basics/marks'">刻度标记</router-link>

### included

- **类型**: `boolean`

- **默认值**: `false`

- **用法**:

  仅在 `marks` 不为空时有效。

  如果值为 `true`，`value` 会自动选择最近的 mark。

- **See also**: <router-link :to="$route.meta.lang + 'basics/marks'">刻度标记</router-link>

### dotOptions

- **类型**：`DotOption | DotOption[]`

  ```ts
  interface DotOption {
    disabled: boolean
    tooltip: 'none' | 'always' | 'focus'
    style: Object
    focusStyle: Object
    disabledStyle: Object
    tooltipStyle: Object
    tooltipFocusStyle: Object
    tooltipDisabledStyle: Object
  }
  ```

- **默认值**：`undefined`

- **用法**：

  滑块设置，多个滑块时可以用数组类型分别设置。

### process

- **类型**：`boolean | ProcessFunc`

  ```ts
  type ProcessFunc = (dotsPos: Array<number>) => Array<Array<number, number, Styles?>>
  ```

- **默认值**：`true`

- **用法**：

  控制轨道的显示，支持多段轨道。

  ::: tip
    当多个滑块时，默认从第一个连接到最后一个。
  :::

### dotStyle

- **类型**：`Object`

- **默认值**：`null`

- **用法**：

  滑块样式。

  ::: tip
    如果需要设置 `active` 或 `disabled` 样式。请使用 `dotOptions` 参数。

    并且 `dotOptions` 可以分别设置多个滑块
  :::

### railStyle

- **类型**：`Object`

- **默认值**：`null`

- **用法**：

  轨道的样式。

### processStyle

- **类型**：`Object`

- **默认值**：`null`

- **用法**：

  进度条的样式。

  ::: tip
    如果多条进度条样式需要区分设置，请使用 `process` 参数。
  :::

### tooltipStyle

- **类型**：`Object`

- **默认值**：`null`

- **用法**：

  工具提示的样式。

### stepStyle

- **类型**：`Object`

- **默认值**：`null`

- **用法**：

  步长的样式。

### stepActiveStyle

- **类型**：`Object`

- **默认值**：`null`

- **用法**：

  步长激活状态下的样式。

### labelStyle

- **类型**：`Object`

- **默认值**：`null`

- **用法**：

  标签的样式。

### labelActiveStyle

- **类型**：`Object`

- **默认值**：`null`

- **用法**：

  标签激活状态下的样式。