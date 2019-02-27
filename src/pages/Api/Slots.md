# Slots

## dot

- **Scoped**:

  - `{number} pos` Position in the component, calculated as a percentage

  - `{number} index` Slider index

  - `{number | string} value` Slider value

  - `{boolean} focus` Whether the slider is in focus

  - `{boolean} disabled` Whether the slider is disabled

- **Usage**:

  ```html
  <vue-slider v-model="value">
    <template v-slot:dot>
      <img :src="imgUrl" class="custom-dot"/>
    </template>
  </vue-slider>
  ```

## tooltip

- **Scoped**:

  - `{number} pos` Position in the component, calculated as a percentage

  - `{number} index` Slider index

  - `{number | string} value` Slider value

  - `{boolean} focus` Whether the slider is in focus

  - `{boolean} disabled` Whether the slider is disabled

- **Usage**:

  ```html
  <vue-slider v-model="value">
    <template v-slot:tooltip="{ value }">
      <div class="custom-tooltip">{{ value }}</div>
    </template>
  </vue-slider>
  ```

## label

- **Scoped**:

  - `{number | string} label` label

  - `{number} pos` Position in the component, calculated as a percentage

  - `{number | string} value` Slider value

  - `{boolean} active` Whether the location is active (in the progress bar range)

- **Usage**:

  ```html
  <vue-slider v-model="value" :marks="true" :interval="10">
    <template v-slot:label="{ active, value }">
      <div :class="['vue-slider-mark-label', 'custom-label', { active }]">{{ value }}</div>
    </template>
  </vue-slider>
  ```

  ::: tip
    If you don't add `.vue-slider-mark-label`, you need to calculate the position yourself.
  :::

## step

- **Scoped**:

  - `{number | string} label` label

  - `{number} pos` Position in the component, calculated as a percentage

  - `{number | string} value` Slider value

  - `{boolean} active` Whether the location is active (in the progress bar range)

- **Usage**:

  ```html
  <vue-slider v-model="value" :marks="true" :interval="10">
    <template v-slot:step="{ active, value }">
      <div :class="['vue-slider-mark-label', 'custom-label', { active }]">{{ value }}</div>
    </template>
  </vue-slider>
  ```

## mark

- **Scoped**:

  - `{number | string} label` label

  - `{number} pos` Position in the component, calculated as a percentage

  - `{number | string} value` Slider value

  - `{boolean} active` Whether the location is active (in the progress bar range)

- **Usage**:

  The slot of the mark (including `label` and `step`), need to set the location of the mark in the component.

  ```html
  <vue-slider v-model="value" :marks="true" :interval="10">
    <template v-slot:mark="{ pos, label }">
      <div class="custom-mark" :style="{ left: `${pos}%` }">
        {{ label }}
      </div>
    </template>
  </vue-slider>

  <style>
    .custom-mark {
      position: absolute;
      top: 10px;
      transform: translateX(-50%);
      white-space: nowrap;
    }
  </style>
  ```