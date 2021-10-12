# Process

## process

### When the type of `process` is `Boolean`

<example :value="example1"></example>

### When the type of `process` is `Function`

When `process` is a function, the argument is an array (from smallest to largest slider position), and the function must return an array that can contain any number of progress arrays.

Each progress array represents a segment of the progress bar, and the progress array must contain a start point (index 0) and an end point (index 1), and an optional progress style (index 2).

The position is expressed as a percentage, with `0` representing the start point and `100` representing the end point.

This function is called whenever the value of the slider changes.

<example :value="example2"></example>

::: example process :::