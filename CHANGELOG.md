# CHANGELOG

## v3.2.11

> `2020-11-20`

### 🐞 Bug Fixes
  - In Order mode, `setValue` will not sort. [#507](https://github.com/NightCatSama/vue-slider-component/issues/507)

## v3.2.10

> `2020-10-29`

### 🐞 Bug Fixes
  - Add `zoom` prop to support zoomed scenes.

## v3.2.7

> `2020-10-15`

### 🐞 Bug Fixes
  - The `focus` method method parameter error.

## v3.2.6

> `2020-10-12`

### 🐞 Bug Fixes
  - When `contained` is `true`, slider position is out of sync with mouse position.

## v3.2.5

> `2020-08-20`

### 🐞 Bug Fixes
  - An error occurred in ie11. [#482](https://github.com/NightCatSama/vue-slider-component/issues/482)

## v3.2.4

> `2020-08-12`

### 🎉 Feature
  - Added `dotAttrs` prop to support setting custom attributes on the slider. [document](https://nightcatsama.github.io/vue-slider-component/#/api/props?hash=dotattrs) [#481](https://github.com/NightCatSama/vue-slider-component/issues/481)

## v3.2.3

> `2020-08-07`

### 🐞 Bug Fixes
  - When `data` is `Array<Object>` type, an exception occurs when change the `data`. [#479](https://github.com/NightCatSama/vue-slider-component/issues/479)

## v3.2.2

> `2020-07-08`

### 🎉 Feature
  - `data` supports `object` type. [example](https://nightcatsama.github.io/vue-slider-component/#/basics/data?hash=when-data-is-object-type)

## v3.2.1

> `2020-07-08`

### 🎉 Feature
  - Allow keyboard tab to access slider. [#470](https://github.com/NightCatSama/vue-slider-component/issues/470) [#402](https://github.com/NightCatSama/vue-slider-component/issues/402)
  - `useKeyboard` default parameters changed from `false` to `true`.

## v3.2.0

> `2020-07-06`

### 🎉 Feature
  - `data` supports `Array<object>` type, and adds `data-value` and `data-label` parameters. [#471](https://github.com/NightCatSama/vue-slider-component/issues/471) [document](https://nightcatsama.github.io/vue-slider-component/#/api/props?hash=data) [example](https://nightcatsama.github.io/vue-slider-component/#/basics/data?hash=when-data-is-arrayobject-type)

## v3.1.5

> `2020-06-01`

### 🐞 Bug Fixes
  - Import component error in AMD-Environment. [#410](https://github.com/NightCatSama/vue-slider-component/issues/410) [#379](https://github.com/NightCatSama/vue-slider-component/issues/379)

## v3.1.4

> `2020-05-27`

### 🎉 Feature
  - Added `value` parameter for default scope slot. [#459](https://github.com/NightCatSama/vue-slider-component/pull/459)

## v3.1.3

> `2020-05-10`

### 🎉 Feature
  - Added `index` parameter for drag events and `@change`. [#456](https://github.com/NightCatSama/vue-slider-component/issues/456) [document](https://nightcatsama.github.io/vue-slider-component/#/api/events)

## v3.1.2

> `2020-04-16`

### 🐞 Bug Fixes
  - Optimize the error message. [#438](https://github.com/NightCatSama/vue-slider-component/issues/438)
  - The slider position is incorrect when the range is too large. [#449](https://github.com/NightCatSama/vue-slider-component/issues/449)

## v3.1.1

> `2020-02-14`

### 🐞 Bug Fixes
  - `onValueChanged` may be called before control is created. [#436](https://github.com/NightCatSama/vue-slider-component/pull/436)

## v3.1.0

> `2019-12-09`

### 🎉 Feature
  - `tooltip` supports `hover` and `active` parameter. [#423](https://github.com/NightCatSama/vue-slider-component/issues/423)
  - `tooltip` default parameters changed from `focus` to `active`. [document](https://nightcatsama.github.io/vue-slider-component/#/api/props?hash=tooltip)

## v3.0.46

> `2019-12-08`

### 🐞 Bug Fixes
  - Cannot drag when included and lazy are both equal to true. [#421](https://github.com/NightCatSama/vue-slider-component/issues/421)

## v3.0.45

> `2019-12-07`

### 🐞 Bug Fixes
  - Fix label still clickable when `clickable=true`. [#422](https://github.com/NightCatSama/vue-slider-component/issues/422)

## v3.0.44

> `2019-11-29`

### 🐞 Bug Fixes
  - Fixing `will-change` will blur tooltips. [#418](https://github.com/NightCatSama/vue-slider-component/issues/418)

## v3.0.43

> `2019-11-14`

### 🐞 Bug Fixes
  - Fix `minRange`, `maxRange` cannot be calculated correctly. [#414](https://github.com/NightCatSama/vue-slider-component/issues/414)

## v3.0.42

> `2019-10-03`

### 🐞 Bug Fixes
  - Can't scroll on mobile devices. [#413](https://github.com/NightCatSama/vue-slider-component/issues/413)

## v3.0.41

> `2019-09-27`

### 🎉 Feature
  - Add Prop `dragOnClick` to allow the user to drag the slider directly when pressing the process. [PR#404](https://github.com/NightCatSama/vue-slider-component/pull/404)

## v3.0.40

> `2019-09-01`

### 🎉 Feature
  - Slot `process` add parameter `index`.

## v3.0.39

> `2019-08-28`

### 🐞 Bug Fixes
  - Keyboard control is abnormal with `included = true`. [#395](https://github.com/NightCatSama/vue-slider-component/issues/395)

## v3.0.38

> `2019-08-13`

### 🐞 Bug Fixes
  - `useKeyboard` does not work. [#389](https://github.com/NightCatSama/vue-slider-component/issues/389)

## v3.0.37

> `2019-08-13`

### 🎉 Feature
  - Export mark component and dot component.
  - Support `default` slot.

## v3.0.35

> `2019-08-12`

### 🐞 Bug Fixes
  - Remove `.vue-slider-sr-only`. [#68](https://github.com/NightCatSama/vue-slider-component/issues/68)

## v3.0.34

> `2019-08-04`

### 🐞 Bug Fixes
  - Compatible screen reader.
  - The cursor does not display the disabled flag when `disabled: true`

## v3.0.33

> `2019-06-27`

### 🎉 Feature
  - Add prop `keydownHook`. [#377](https://github.com/NightCatSama/vue-slider-component/issues/377)

### 🐞 Bug Fixes
  - Tooltip is not displayed correctly in lazy mode. [#375](https://github.com/NightCatSama/vue-slider-component/issues/375)

## v3.0.32

> `2019-06-04`

### 🐞 Bug Fixes
  - Fix `mark` rendering order is not correct. [#370](https://github.com/NightCatSama/vue-slider-component/issues/370)

## v3.0.31

> `2019-04-30`

### 🐞 Bug Fixes
  - Fix IE does not support `Array.from`. [#353](https://github.com/NightCatSama/vue-slider-component/issues/353)

## v3.0.30

> `2019-04-22`

### 🐞 Bug Fixes
  - Fix when the `mark` is an object, `include` does not work.

## v3.0.29

> `2019-04-21`

### 🎉 Feature
  - `tooltipFormatter` support array type. [#349](https://github.com/NightCatSama/vue-slider-component/issues/349)

## v3.0.28

> `2019-04-17`

### 🐞 Bug Fixes
  - Fix typescript declaration file conflict. [#346](https://github.com/NightCatSama/vue-slider-component/issues/346)

## v3.0.27

> `2019-04-16`

### 🐞 Bug Fixes
  - Fix `MouseEvent` is not available in `cypress`. [#345](https://github.com/NightCatSama/vue-slider-component/issues/345)

## v3.0.26

> `2019-04-09`

### 🎉 Feature
  - `dotOptions` support sliding range limit (`min` and `max`).

## v3.0.25

> `2019-04-04`

### 🐞 Bug Fixes
  - `tooltipPlacement` not support array type. [#338](https://github.com/NightCatSama/vue-slider-component/issues/338)

## v3.0.24

> `2019-04-04`

### 🎉 Feature
  - Support scss variable to override default style

## v3.0.23

> `2019-04-03`

### 🎉 Feature
  - Add prop `contained` to support for two alignment modes. [#337](https://github.com/NightCatSama/vue-slider-component/issues/337)

## v3.0.22

> `2019-04-01`

### 🐞 Bug Fixes
  - Use `indexOf` instead of `includes`, fix [#334](https://github.com/NightCatSama/vue-slider-component/issues/334)

## v3.0.21

> `2019-03-28`

### 🐞 Bug Fixes
  - Mouse/Touch position calculation error

## v3.0.19

> `2019-03-28`

### 🎉 Feature
  - Add Prop `adsorb` to control the slider to automatically adsorb to the nearest value

## v3.0.18

> `2019-03-28`

### 🎉 Feature
  - Add extraction css, support server-side rendering

## v3.0.17

> `2019-03-27`

### 🎉 Feature
  - Add Slot (`process`)

## v3.0.16

> `2019-03-19`

### 🎉 Feature
  - Add Methods (`setValue` and `setIndex`)
  - Add Prop `silent` to suppress all warnings.

## v3.0.15

> `2019-03-15`

### 🐞 Bug Fixes
  - Calculation error when using BigNumber

## v3.0.13

> `2019-03-14`

### 🐞 Bug Fixes
  - Typescript Compile Error, fix [#321](https://github.com/NightCatSama/vue-slider-component/issues/321)

## v3.0.12

> `2019-03-14`

### 🎉 Feature
  - `width` and `height` support `String` type

## v3.0.11

> `2019-03-13`

### 🔧 Chore
  - Optimize package size
  - Upgrade vue-property-decorator, fix [#320](https://github.com/NightCatSama/vue-slider-component/issues/320)

## v3.0.8

> `2019-03-11`

### 🐞 Bug Fixes
  - Component not updated when array length changes

## v3.0.5

> `2019-03-02`

### 🎉 Feature
  - Add Methods (`getValue` and `getIndex`)

## v3.0.3

> `2019-03-01`

### 🐞 Bug Fixes
  - Typescript type error

## v3.0.2

> `2019-02-28`

### 🎉 Feature
  - More customizable (`style`/`slot`)
  - Multiple style themes
  - Support for more sliders (Countless)
  - Add marks
  - Support SSR
  - Support Typescript

### 🐞 Bug Fixes
  - Fix v2.x exception. (No longer need to call refresh)
