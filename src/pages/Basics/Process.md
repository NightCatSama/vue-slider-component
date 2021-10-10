# Process

## process

### When the type of `process` is `Boolean`

<example :value="example1"></example>

### When the type of `process` is `Function`

When `process` is a function, it must return an array of spans inside `0` and `100` inclusive, where 0 is the start of the slider and 100 is the end. It's called whenever the slider's values change. This can be used to show multiple spans inside of one slider. The number of items in the returned array does not need to match the number of draggable dots on the slider.

<example :value="example2"></example>

::: example process :::