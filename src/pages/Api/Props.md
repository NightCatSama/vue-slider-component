# Props

### value

- **Type**: `number | Array<number> | string | Array<string>`

- **Default**: `0`

- **Usage**:

  ```html
  <vue-slider v-model="value" />
  ```

  The value of the slider, by default only the `number` type can be used.

  ::: tip
    The `string` type is only supported when `data` is set.
  :::

### dotSize

- **Type**: `number | Array<number, number>`

- **Default**: `14`

- **Usage**:

  The slider size, when the value is an array, represents `[width, height]`.

### width

- **Type**: `number`

- **Default**: `undefined`

- **Usage**:

  The width of the component (unit `px`) defaults to `auto` in the horizontal direction and `4` in the vertical direction.

### height

- **Type**: `number`

- **Default**: `undefined`

- **Usage**:

  The height of the component (unit `px`), which defaults to `4` in the horizontal direction.

### direction

- **Type**: `'ltr' | 'rtl' | 'ttb' | 'bbt'`

- **Default**: `ltr`

- **Usage**:

  The direction of the component

  `ltr` means `Left to Right`, Other similarity.

  When the value is `ltr` or `rtl`, it is horizontal, and when it is `ttb` or `bbt`, it is vertical.

  ::: warning
    In the vertical direction, you need to set the component height, otherwise it will not render properly.
  :::

### data

- **Type**: `Array<number> | Array<string>`

- **Default**: `undefined`

- **Usage**:

  Custom data.

  ```html
  <vue-slider :data="['A', 'B', 'C', 'D']" v-model="value" />
  ```

- **See also**: <router-link :to="$route.meta.lang + 'basics/data'">Data</router-link>

### min

- **Type**: `number`

- **Default**: `0`

- **Usage**:

  Minimum value.

### max

- **Type**: `number`

- **Default**: `100`

- **Usage**:

  Maximum value

### interval

- **Type**: `number`

- **Default**: `1`

- **Usage**:

  The interval between two values.

  ::: tip
    The value must be greater than 0 and can be divisible by (max - min).
  :::

### disabled

- **Type**: `boolean`

- **Default**: `false`

- **Usage**:

  Whether to disable the component.

### clickable

- **Type**: `boolean`

- **Default**: `true`

- **Usage**:

  Whether to allow changes to values by clicking.

### duration

- **Type**: `number`

- **Default**: `0.5`

- **Usage**:

  The transition time of the slide, in units of `s`.

### lazy

- **Type**: `boolean`

- **Default**: `false`

- **Usage**:

  Is it lazy to update the value.

  Useful whenever you need to consume a high-loss operation (e.g. Ajax).

  If you set `lazy` and still need to listen for changes in the value, you can listen to the event `dragging`.

  ```html
  <vue-slider
    v-model="value"
    :lazy="true"
    @dragging="val => // do something"
  />
  ```

### tooltip

- **Type**: `'none' | 'always' | 'focus'`

- **Default**: `'focus'`

- **Usage**:

  Control Tooltip display.

  When the value is `none`, the Tooltip is never displayed;

  When the value is `always`, the Tooltip is always displayed;

  When the value is `focus`, the Tooltip will only be displayed when the slider has focus. And when `useKeyboard` is `true`, the end of the drag will still get the focus.

### tooltipPlacement

- **Type**: `'top' | 'right' | 'bottom' | 'left'`

- **Default**: `'top'` (on horizontal) or `'left'` (on vertical)

- **Usage**:

  The placement of the Tooltip.

### tooltipFormatter

- **Type**: `string | (val: number | number) => string`

- **Default**: `undefined`

- **Usage**:

  Format the value of the Tooltip. When the type is `string`, `{value}` will be replaced with the value of Tooltip.

  ```html
    <!-- 0% -->
    <vue-slider v-model="value" :tooltip-formatter="'{value}%'"/>

    <!-- A/B/C/D -->
    <vue-slider
      v-model="value"
      :data="['a', 'b', 'c', 'd']"
      :tooltip-formatter="val => val.toUpperCase()"
    />
  ```

### useKeyboard

- **Type**: `boolean`

- **Default**: `false`

- **Usage**:

  Keyboard control, when the value is `true`, the drag end slider still gets the focus.

### enableCross

- **Type**: `boolean`

- **Default**: `true`

- **Usage**:

  Whether to allow sliders to cross, only valid for multiple sliders.

- **See also**: <router-link :to="$route.meta.lang + 'basics/range'">Range mode</router-link>

### fixed

- **Type**: `boolean`

- **Default**: `false`

- **Usage**:

  Whether to fix the slider spacing, only valid for multiple sliders.

- **See also**: <router-link :to="$route.meta.lang + 'basics/range'">Range mode</router-link>

### minRange

- **Type**: `number`

- **Default**: `undefined`

- **Usage**:

  Minimum distance between sliders, only valid for multiple sliders.

### maxRange

- **Type**: `number`

- **Default**: `undefined`

- **Usage**:

  Maximum distance between sliders, only valid for multiple sliders.

- **See also**: <router-link :to="$route.meta.lang + 'basics/range'">Range mode</router-link>

### order

- **Type**: `boolean`

- **Default**: `true`

- **Usage**:

  Whether to sort values, only valid for multiple sliders.

  For example, when the value is `false`, `[50, 30]` will not be automatically sorted to `[30, 50]`.

  This is effective when distinguishing multiple sliders.

  ::: warning
    When the value is `false`, the parameters `minRange`, `maxRange`, `fixed`, `enableCross` are invalid.
  :::

- **See also**: <router-link :to="$route.meta.lang + 'advanced/order'">Disorderly slider</router-link>

### marks

- **Type**: `boolean | Marks | Array<number | string> | MarksFunction`

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

- **Default**: `undefined`

- **Usage**:

  Used to control the Mark of the display.

### included

- **Type**: `boolean`

- **Default**: `false`

- **Usage**:

  Only valid if `marks` is not empty.

  If the value is `true`, `value` will automatically set to the nearest mark.

- **See also**: <router-link :to="$route.meta.lang + 'basics/marks'">Mark</router-link>

### dotOptions

- **Type**: `DotOption | DotOption[]`

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

- **Default**: `undefined`

- **Usage**:

  Slider settings, multiple sliders can be distinguished by array type.

### process

- **Type**: `boolean | ProcessFunc`

  ```ts
  type ProcessFunc = (dotsPos: Array<number>) => Array<Array<number, number, Styles?>>
  ```

- **Default**: `true`

- **Usage**:

  Control the display of the process and support multiple processs.

  ::: tip
    When multiple sliders, the default is from the first to the last.
  :::

- **See also**: <router-link :to="$route.meta.lang + 'basics/process'">Process</router-link>

### dotStyle

- **Type**: `Object`

- **Default**: `null`

- **Usage**:

  Slider style.

  ::: tip
    If you need to set the `active` or `disabled` style. Please use the `dotOptions` parameter.

    And `dotOptions` can set multiple sliders separately.
  :::

### railStyle

- **Type**: `Object`

- **Default**: `null`

- **Usage**:

  Background style.

### processStyle

- **Type**: `Object`

- **Default**: `null`

- **Usage**:

  The style of the progress bar.

  ::: tip
    If multiple process bar styles need to distinguish settings, use the `process` parameter.
  :::

### tooltipStyle

- **Type**: `Object`

- **Default**: `null`

- **Usage**:

  The style of the tooltip.

### stepStyle

- **Type**: `Object`

- **Default**: `null`

- **Usage**:

  The style of the step.

### stepActiveStyle

- **Type**: `Object`

- **Default**: `null`

- **Usage**:

  The style of the step activation state.

### labelStyle

- **Type**: `Object`

- **Default**: `null`

- **Usage**:

  The style of the label.

### labelActiveStyle

- **Type**: `Object`

- **Default**: `null`

- **Usage**:

  The style of the label activation state.