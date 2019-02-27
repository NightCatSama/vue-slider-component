# Disorderly slider

By default, the sliders are ordered.

The slider can be made unordered by setting `order = false`. This is very useful when you need to distinguish the effects of multiple sliders.

::: warning
  When the value of `order` is `false`, the parameter <`minRange`|`maxRange`|`enableCross`|`fixed`> is invalid.
:::

### Usage

<example :value="example1"></example>

### Independent slider

<example :value="example2"></example>

::: tip
  `v-slot:` (Symbol `#`) can only be used above `vue` version 2.6.0, otherwise use `slot` and `slot-scope`.

  See also [Official Document](https://vuejs.org/v2/guide/components-slots.html#Named-Slots-Shorthand)
:::

::: example order :::