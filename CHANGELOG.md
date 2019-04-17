# CHANGELOG

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
  - `tooltipPlacement` not support array string. [#338](https://github.com/NightCatSama/vue-slider-component/issues/338)

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
