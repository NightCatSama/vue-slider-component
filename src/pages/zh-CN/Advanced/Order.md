# 无序滑块

默认状态下，滑块都是有序的。

通过设置 `order = false`，可以使得滑块变得无序。当你需要区分多个滑块的作用时，这将非常有用。

::: warning
  当 `order` 的值为 `false` 时，参数 <`minRange`|`maxRange`|`enableCross`|`fixed`>无效
:::

### 一般使用

<example :value="example1"></example>

### 相互独立的滑块

<example :value="example2"></example>

::: tip
  `v-slot:`（字符 `#`）仅在 `vue` 版本 2.6.0 以上才能使用，否则请使用 `slot` 和 `slot-scope`。

  详情可参阅 [官方文档](https://vuejs.org/v2/guide/components-slots.html#Named-Slots-Shorthand)
:::

::: example order :::