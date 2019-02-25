# 样式主题

## 内置主题

组件默认自带三种主题
  - `default`
  - `antd`
  - `material`

> 如何你有更好的想法，欢迎提交 pull request 提供新的主题

### 使用 `import` 导入样式

```ts
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
```

### 使用 `require` 导入样式

```ts
const VueSlider = require('vue-slider-component')
require('vue-slider-component/theme/default.css')
```

### 使用 `cdn` 导入样式

> TODO

```ts
<link ref="stylesheel" href="/">
```

## 自建主题

你可以自建新建一个主题文件，或者从 github 上下载内置主题再自己修改。

通过自建主题你可以很轻松的实现你想要的样式

## 通过组件参数设置

组件暴露了多种参数可供设置样式

- `dotStyle` 设置滑块样式，更多样式可通过 `dotOptions` 设置

- `railStyle` 轨道样式

- `processStyle` 进度条样式，多段区分设置可通过 `process` 设置，详情看 API 文档

- `tooltipStyle` 工具提示样式，更多样式可通过 `dotOptions` 设置

- `stepStyle` 步长样式

- `stepActiveStyle` 步长激活状态下的样式

- `labelStyle` 标签样式

- `labelActiveStyle` 标签激活状态下的样式

::: tip
如果样式改动很大，最好的方法还是自建一个主题
:::
