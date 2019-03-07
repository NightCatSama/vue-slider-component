# Style theme

## Built-in theme

The component comes with three themes.

  - `default`
  - `antd`
  - `material`

> If you have a better idea, feel free to submit a pull request to provide a new theme.

### Using `import`

```ts
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
```

### Using `require`

```ts
const VueSlider = require('vue-slider-component')
require('vue-slider-component/theme/default.css')
```

### Using `cdn`

```ts
<link ref="stylesheel" href="https://cdn.jsdelivr.net/npm/vue-slider-component@latest/theme/default.css">
```

## Self-built theme

You can create a new style file or download the built-in theme from github and modify it yourself.

You can easily implement the style you want by building your own theme.

## Set styles by parameters

- `dotStyle` Set the slider style, more styles can be set by `dotOptions`

- `railStyle` Track style

- `processStyle` Progress bar style, multi-section setting can be set by `process`

- `tooltipStyle` Tooltip styles, more styles can be set via `dotOptions`

- `stepStyle` Step style, multi-section setting can be set by `Marks`

- `stepActiveStyle` Step style in the active, multi-section setting can be set by `Marks`

- `labelStyle` Label style, multi-section setting can be set by `Marks`

- `labelActiveStyle` Label style in the active, multi-section setting can be set by `Marks`

::: tip
  If the style changes a lot, the best way is to build a theme yourself.
:::

## Set styles by slots

By setting up slots you can render components more personally, and you can add other elements (such as images).

Refer to <router-link :to="$route.meta.lang + 'api/slots'">Slots</router-link>