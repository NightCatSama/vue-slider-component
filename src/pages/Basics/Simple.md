# Common usage

### Single slider

<example :value="example1"></example>

### Multiple sliders

<example :value="example2"></example>

### Set the range of values

<example :value="example3"></example>

### Set the slider direction

<example :value="example4"></example>

::: tip
  - `ltr` stands for `left to right`, the horizontal slider from left to right. `rtl/btt/ttb` is the same
  - When the value of `direction` is `btt` or `ttb`, you need to set the component height
:::

### Lazy

The value will only be updated when the drag is over

<example :value="example5"></example>

::: tip
  If you need to use the internal value of the component when dragging, you can listen to the `dragging` event or use the `default slot`.
:::

### Disabled slider

You can disable the entire component with `disabled` or disable the slider separately with `dot-options`

<example :value="example6"></example>

::: warning
  When disabling a single slider, use `order = false` or `enableCross = true`.
:::

### Adsorb

When `adsorb` is set to `true`, the slider automatically adsorb to the nearest value.

<example :value="example7"></example>

### Contained

By default, the center of the `dot` is used to align the edge.

When `contained` is set to `true`, the edge of the `dot` is used to align.

<example :value="example8"></example>

### DragOnClick

When `drag-on-click` is set to `true`, can drag the slider directly when pressing the process.

<example :value="example9"></example>

::: example simple :::
