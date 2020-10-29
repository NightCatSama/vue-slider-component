# Props

### value

- **Type**: `Value | Array<Value>`

  ```ts
  type Value = number | string
  ```

- **Default**: `0`

- **Usage**:

  ```html
  <vue-slider v-model="value" />
  ```

  The value of the slider.

  When the `value` is an array type, it corresponds to multiple sliders.

  ::: tip
    By default, only the `number` type is supported. The `string` type is only supported when `data` is set.
  :::

### dotSize

- **Type**: `number | Array<number, number>`

- **Default**: `14`

- **Usage**:

  The slider size, when the value is an array, represents `[width, height]`.

### width

- **Type**: `number | string`

- **Default**: `undefined`

- **Usage**:

  The width of the component (unit `px`) defaults to `auto` in the horizontal direction and `4` in the vertical direction.

### height

- **Type**: `number | string`

- **Default**: `undefined`

- **Usage**:

  The height of the component (unit `px`), which defaults to `4` in the horizontal direction.

### silent

- **Type**: `boolean`

- **Default**: `false`

- **Usage**:

  Set to `true` to turn off console errors.

### contained

- **Type**: `boolean`

- **Default**: `false`

- **Usage**:

  Whether or not the slider should be fully contained within its containing element.

- **See also**: <router-link :to="$route.meta.lang + 'basics/simple?hash=contained'">Common usage > Contained</router-link>

### direction

- **Type**: `'ltr' | 'rtl' | 'ttb' | 'btt'`

- **Default**: `ltr`

- **Usage**:

  The direction of the component

  `ltr` means `Left to Right`, Other similarity.

  When the value is `ltr` or `rtl`, it is horizontal, and when it is `ttb` or `btt`, it is vertical.

  ::: warning
    In the vertical direction, you need to set the component height, otherwise it will not render properly.
  :::

### data

- **Type**: `Array<number> | Array<string> | Array<object> | object`

- **Default**: `undefined`

- **Usage**:

  Custom data.

  ```html
  <vue-slider :data="['A', 'B', 'C', 'D']" v-model="value" />
  ```

  The object type is supported after version 3.2.0+.

  Which is actually a simplified writing of `data & marks & tooltipFormatter`.

  Specific usage can refer to the example.

- **See also**: <router-link :to="$route.meta.lang + 'basics/data'">Custom Data</router-link>

### data-value

::: version
  New in 3.2.0+
:::

- **Type**: `string`

- **Default**: `value`

- **Usage**:

  Only valid when `data` is `Array<object>`.

  Read the field in the object and bind it to `value`.

- **See also**: <router-link :to="$route.meta.lang + 'basics/data'">Custom Data</router-link>

### data-label

::: version
  New in 3.2.0+
:::

- **Type**: `string`

- **Default**: `label`

- **Usage**:

  Only valid when `data` is `Array<object>`.

  Read the field in the object and bind it to `label`.

  ::: tip
    Actually automatically converted to `marks` and `tooltipFormatter` inside the component.
    So setting `marks` or `tooltipFormatter` will overwrite the effect.
  :::

- **See also**: <router-link :to="$route.meta.lang + 'basics/data'">Custom Data</router-link>

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

### dragOnClick

::: version
  New in 3.0.41+
:::

- **Type**: `boolean`

- **Default**: `false`

- **Usage**:

  Whether to allow dragging the slider when pressing the process.

- **See also**: <router-link :to="$route.meta.lang + 'basics/simple?hash=dragonclick'">Common usage > DragOnClick</router-link>

### duration

- **Type**: `number`

- **Default**: `0.5`

- **Usage**:

  The transition time of the slide, in units of `s`.

### adsorb

- **Type**：`boolean`

- **Default**：`false`

- **Usage**：

  Whether the slider automatically adsorb to the nearest value.

- **See also**: <router-link :to="$route.meta.lang + 'basics/simple?hash=adsorb'">Common usage > Adsorb</router-link>


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

- **See also**: <router-link :to="$route.meta.lang + 'basics/simple?hash=lazy'">Common usage > Lazy</router-link>

### tooltip

- **Type**: `'none' | 'always' | 'hover' | 'focus' | 'active'`

- **Default**: `'active'`

- **Usage**:

  Control Tooltip display.

  When the value is `none`, the Tooltip is never displayed;

  When the value is `always`, the Tooltip is always displayed;

  When the value is `hover`, the Tooltip will be displayed when the slider get hover;

  When the value is `focus`, the Tooltip will only be displayed when the slider has focus. And when `useKeyboard` is `true`, the end of the drag will still get the focus.

  When the value is `active`, the Tooltip have both `hover` and `focus`;

- **See also**: <router-link :to="$route.meta.lang + 'basics/tooltip?hash=tooltip'">Tooltip > tooltip</router-link>

### tooltipPlacement

- **Type**: `Position | Array<Position>`

  ```ts
  type Position = 'top' | 'right' | 'bottom' | 'left'
  ```

- **Default**: `'top'` (on horizontal) or `'left'` (on vertical)

- **Usage**:

  The placement of the Tooltip.

- **See also**: <router-link :to="$route.meta.lang + 'basics/tooltip?hash=tooltipplacement'">Tooltip > tooltipPlacement</router-link>

### tooltipFormatter

- **type**：`TooltipFormatter | Array<TooltipFormatter>`

  ```ts
  type TooltipFormatter = string | (val: Value) => string
  ```

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

- **See also**: <router-link :to="$route.meta.lang + 'basics/tooltip?hash=tooltipformatter'">Tooltip > tooltipFormatter</router-link>

### useKeyboard

- **Type**: `boolean`

- **Default**: `true`

- **Usage**:

  Keyboard control, when the value is `false`, the slider cannot be controlled by the keyboard.

### keydownHook

::: version
  New in 3.0.33+
:::

- **Type**: `(e: KeyboardEvent) => HandleFunction | boolean`

  ```ts
  // @Param {index} Index of the active slider
  // @Return New index
  type HandleFunction = (index: number) => number
  ```

- **Default**: `undefined`

- **Usage**:

  Keyboard controlled hook function.

  When the function returns `false`, the value does not change.

  If `true` is returned, the [default action](https://github.com/NightCatSama/vue-slider-component/blob/master/lib/utils/index.ts) is used.

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

- **See also**: <router-link :to="$route.meta.lang + 'basics/range'">Range mode</router-link>

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

- **See also**: <router-link :to="$route.meta.lang + 'basics/marks?hash=use-with-included'">Mark > Use with `included`</router-link>

### dotOptions

- **Type**: `DotOption | DotOption[]`

  ```ts
  interface DotOption {
    disabled: boolean
    tooltip: 'none' | 'always' | 'hover' | 'focus' | 'active'
    min: Value
    max: Value
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

### dotAttrs

::: version
  New in 3.2.4+
:::

- **Type**：`object`

- **Default**：`undefined`

- **Usage**：

  Set custom attributes on the slider.

  ```html
    <vue-slider :dot-attrs="{ 'aria-label': 'Select your age' }" />
  ```

### process

- **Type**: `boolean | ProcessFunc`

  ```ts
  type ProcessFunc = (dotsPos: Array<number>) => Array<Array<number, number, Styles?>>
  ```

- **Default**: `true`

- **Usage**:

  Control the display of the process and support multiple process.

  ::: tip
    When multiple sliders, the default is from the first to the last.
  :::

- **See also**: <router-link :to="$route.meta.lang + 'basics/process'">Process</router-link>

### zoom

::: version
  New in 3.2.10+
:::

- **Type**：`number`

- **Default**：`undefined`

- **Usage**：

  If the slider is using CSS3 scale transform to scale or is in a scaled container, this parameter needs to be set to correct the calculation within the component.

  ```html
    <div style="transform: scale(1.1)">
      <vue-slider :zoom="1.1" />
    </div>
  ```

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