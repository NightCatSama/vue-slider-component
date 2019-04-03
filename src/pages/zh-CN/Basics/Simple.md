# 一般用法

### 单个滑块

<example :value="example1"></example>

### 多个滑块

<example :value="example2"></example>

### 设置值的范围

<example :value="example3"></example>

### 设置滑块方向

<example :value="example4"></example>

::: tip
 - `ltr` 代表着 `left to right`，即自左向右的水平滑块。`rtl/btt/ttb` 同理
 - 当 `direction` 的值为 `btt` 或 `ttb` 时，需要给定组件一个高度
:::

### 懒更新

只有当拖拽结束后，值才会更新。

<example :value="example5"></example>

### 禁用滑块

可以使用 `disabled` 禁用整个组件，也可以使用 `dot-options` 单独禁用滑块。

<example :value="example6"></example>

::: warning
  禁用单个滑块时，请使用 `order = false` 或者 `enableCross = true`。
:::

### 吸附效果

设置 `adsorb` 为 `true` 时，滑块自动吸附到最近的值。

<example :value="example7"></example>

### 边缘对齐

默认情况下使用 `dot` 的中心来对齐边界。

当 `contained` 设置为 `true`，则使用 `dot` 的边缘对齐。

<example :value="example8"></example>

::: example simple :::