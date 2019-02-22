# API 参考

## Props

### value

- **类型**：`number | Array<number> | string | Array<string>`

- **默认值**：`0`

- **用法**：

  ```html
  <vue-slider v-model="value" />
  ```

  滑块的值，默认只可使用 `number` 类型，只有当 `data` 存在时，才支持 `string` 类型。

### direction

- **类型**：`'ltr' | 'rtl' | 'ttb' | 'bbt'`

- **默认值**：`ltr`

- **用法**：

  `ltr` 的意思是 Left to Right，其他同理

  组件的方向，当值为 `ltr` 或者 `rtl`，为水平方向，为 `ttb` 或 `bbt` 时为垂直方向

### dotSize

- **类型**：`number | Array<number, number>`

- **默认值**：`14`

- **用法**：

  滑块大小，当值为数组时，代表着 `[width, height]`

### width

- **类型**：`number`

- **默认值**：`undefined`

- **用法**：

  组件的宽度（单位 `px`），水平方向时默认为 `auto`，垂直方向时默认为 `4`.

### height

- **类型**：`number`

- **默认值**：`undefined`

- **用法**：

  组件的高度（单位 `px`），水平方向时默认为 `4`，垂直方向时必填，否则无法正常渲染.

### data

- **类型**：`Array<number> | Array<string>`

- **默认值**：`undefined`

- **用法**：

  自定义数据

  ```html
  <vue-slider :data="['A', 'B', 'C', 'D']" v-model="value" />
  ```

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

  两个值的间隔，必须能被最大值和最小值的差整除。

### disabled

- **类型**：`boolean`

- **默认值**：`false`

- **用法**：

  是否禁用组件

### duration

- **类型**：`number`

- **默认值**：`0.5`

- **用法**：

  滑动的过渡时间，单位 `s`。

### lazy

- **类型**：`boolean`

- **默认值**：`false`

- **用法**：

  是否懒更新值

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

  控制 Tooltip 显示

  当值为 `none` 时，Tooltip 始终不显示；

  当值为 `always` 时，Tooltip 会始终显示；

  当值为 `focus` 时，仅当滑块获得焦点时，Tooltip 才会显示。且当 `useKeyboard` 为 `true` 时，拖拽结束仍会获得焦点。

### tooltipPlacement

- **类型**：`'top' | 'right' | 'bottom' | 'left'`

- **默认值**：`'focus'`

- **用法**：

  Tooltip 的出现的方位

  当值为 `none` 时，Tooltip 始终不显示；

  当值为 `always` 时，Tooltip 会始终显示；

  当值为 `focus` 时，仅当滑块获得焦点时，Tooltip 才会显示。且当 `useKeyboard` 为 `true` 时，拖拽结束仍会获得焦点。

### tooltipFormatter

> 2.4.0 新增

- **类型**：`string | (val: number | number) => string`

- **默认值**：`undefined`

- **用法**：

  格式化 Tooltip 的值，当类型为 `string` 时，`{value}` 会被替换成 Tooltip 的值

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
