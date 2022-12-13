<template>
  <div
    ref="dot"
    :class="dotClasses"
    :aria-valuetext="tooltipValue?.toString()"
    @mousedown.passive="dragStart"
    @touchstart.passive="dragStart"
  >
    <slot name="dot">
      <div :class="handleClasses" :style="dotStyle" />
    </slot>
    <div :class="tooltipClasses" v-if="tooltip !== 'none'">
      <slot name="tooltip">
        <div :class="tooltipInnerClasses" :style="tooltipStyle">
          <span class="vue-slider-dot-tooltip-text">{{ tooltipValue }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Value, Styles, Position, TooltipProp, TooltipFormatter } from './typings'

import './styles/dot.scss';

export default defineComponent({
  name: 'VueSliderDot',
  emits: ['drag-start'],
  props: {
    value: { type: [String, Number] as PropType<Value>, default: 0 },

    tooltip: {
      type: String as PropType<TooltipProp>,
      required: true,
    },

    tooltipPlacement: {
      type: String as PropType<Position>,
      validator: (val: string) => ['top', 'right', 'bottom', 'left'].indexOf(val) > -1,
      required: true,
    },

    tooltipFormatter: {
      type: [String, Function] as PropType<TooltipFormatter>,
    },

    focus: { type: Boolean, default: false },

    disabled: { type: Boolean, default: false },

    dotStyle: { type: Object as PropType<Styles> },

    tooltipStyle: { type: Object as PropType<Styles> },
  },
  computed: {
    dotClasses() {
      return [
        'vue-slider-dot',
        {
          'vue-slider-dot-hover': this.tooltip === 'hover' || this.tooltip === 'active',
          'vue-slider-dot-disabled': this.disabled,
          'vue-slider-dot-focus': this.focus,
        },
      ]
    },
    handleClasses() {
      return [
        'vue-slider-dot-handle',
        {
          'vue-slider-dot-handle-disabled': this.disabled,
          'vue-slider-dot-handle-focus': this.focus,
        },
      ]
    },
    tooltipClasses() {
      return [
        'vue-slider-dot-tooltip',
        [`vue-slider-dot-tooltip-${this.tooltipPlacement}`],
        {
          'vue-slider-dot-tooltip-show': this.showTooltip,
        },
      ]
    },
    tooltipInnerClasses() {
      return [
        'vue-slider-dot-tooltip-inner',
        [`vue-slider-dot-tooltip-inner-${this.tooltipPlacement}`],
        {
          'vue-slider-dot-tooltip-inner-disabled': this.disabled,
          'vue-slider-dot-tooltip-inner-focus': this.focus,
        },
      ]
    },
    showTooltip(): boolean {
      switch (this.tooltip) {
        case 'always':
          return true
        case 'none':
          return false
        case 'focus':
        case 'active':
          return !!this.focus
        default:
          return false
      }
    },
    tooltipValue(): Value {
      if (this.tooltipFormatter) {
        return typeof this.tooltipFormatter === 'string'
          ? this.tooltipFormatter.replace(/\{value\}/, String(this.value))
          : this.tooltipFormatter(this.value)
      } else {
        return this.value
      }
    },
  },
  methods: {
    dragStart() {
      if (this.disabled) {
        return false
      }

      this.$emit('drag-start')
    },
  }
})
</script>