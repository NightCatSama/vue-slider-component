# 进度条

## process

### 当值的类型为 `Boolean`

<example :value="example1"></example>

### 当值的类型为 `Function`

当`process`是一个函数时，参数是一个数组（从小到大的滑块位置），函数必须返回一个数组，里面可以包含任意个进度条数组。

每个进度条数组代表一段进度条，进度数组必须包含起点（索引0）和终点（索引1），和可选的进度条样式（索引2）。

位置是以百分比表示，`0`代表起点，`100`代表终点。

每当滑块的值发生变化时，该函数就会被调用。

<example :value="example2"></example>

::: example process :::