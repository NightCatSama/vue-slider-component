# 自定义数据

### 当 data 为字符串数组类型

<example :value="example1"></example>

### 当 data 为对象数组类型

修改 data-label 和 data-value 可以改变绑定值的字段和展示的字段。

<example :value="example2"></example>

::: warning
  理论上 value 支持对象类型，但是得确保对象的引用是一致的，否则组件无法判断两个对象是否相等。
:::

::: example data :::