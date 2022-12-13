<template>
  <div
    :class="marksClasses"
  >
    <slot name="step">
      <div
        :class="stepClasses"
        :style="[
          stepStyle,
          mark.style || {},
          mark.active && stepActiveStyle ? stepActiveStyle : {},
          mark.active && mark.activeStyle ? mark.activeStyle : {},
        ]"
      />
    </slot>

    <slot name="label" v-if="!hideLabel">
      <div
        :class="labelClasses"
        :style="[
          labelStyle,
          mark.labelStyle || {},
          mark.active && labelActiveStyle ? labelActiveStyle : {},
          mark.active && mark.labelActiveStyle ? mark.labelActiveStyle : {},
        ]"
        @click="labelClickHandle"
      >
        {{ mark.label }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Mark, Styles } from './typings'

import './styles/mark.scss';

export default defineComponent({
  name: 'VueSliderMark',
  emits: ['press-label'],
  props: {
    mark: {
      type: Object as PropType<Mark>,
      required: true,
    },

    hideLabel: { type: Boolean },

    stepStyle: { type: Object as PropType<Styles>, default: () => ({}) },

    stepActiveStyle: { type: Object as PropType<Styles>, default: () => ({}) },

    labelStyle: { type: Object as PropType<Styles>, default: () => ({}) },

    labelActiveStyle: { type: Object as PropType<Styles>, default: () => ({}) },
  },
  computed: {
    marksClasses() {
      return [
        'vue-slider-mark',
        {
          'vue-slider-mark-active': this.mark.active,
        },
      ]
    },
    stepClasses() {
      return [
        'vue-slider-mark-step',
        {
          'vue-slider-mark-step-active': this.mark.active,
        },
      ]
    },
    labelClasses() {
      return [
        'vue-slider-mark-label',
        {
          'vue-slider-mark-label-active': this.mark.active,
        },
      ]
    },
  },
  methods: {
    labelClickHandle(e: MouseEvent | TouchEvent) {
      e.stopPropagation()
      this.$emit('press-label', this.mark.pos)
    },
  }
})
</script>