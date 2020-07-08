# Custom Data

### When `data` is `Array<string>` type

<example :value="example1"></example>

### When `data` is `Array<object>` type

Modify the `data-label` and `data-value` to change the field of the bound value and the displayed field.

<example :value="example2"></example>

::: warning
  In theory, `value` supports the object type, but you must ensure that the object references are consistent, otherwise the component cannot judge whether the two objects are equal.
:::

### When `data` is `object` type

<example :value="example3"></example>

::: warning
  Because the key of the object is a string type, `v-model` can only pass the string type.

  But using `@change` can easily convert to a numeric type:
  ```html
  <vue-slider
    :value="''+ value"
    @change="val => value = +val"
  />
  ```
:::

::: example data :::