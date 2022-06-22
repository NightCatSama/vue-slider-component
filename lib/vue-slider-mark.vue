<template>
  <div
    :class="marksClasses"
  >
    <slot name="step">
      <div
        :class="stepClasses"
        :style="[
          stepStyle,
          mark.style,
          mark.active ? stepActiveStyle : null,
          mark.active ? mark.activeStyle : null,
        ]"
      />
    </slot>

    <slot name="label" v-if="!hideLabel">
      <div
        :class="labelClasses"
        :style="[
          labelStyle,
          mark.labelStyle,
          mark.active ? labelActiveStyle : null,
          mark.active ? mark.labelActiveStyle : null,
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
  emits: ['PressLabel'],
  props: {
    mark: {
      type: Object as PropType<Mark>,
      required: true,
    },

    hideLabel: { type: Boolean },

    stepStyle: { type: Object as PropType<Styles> },

    stepActiveStyle: { type: Object as PropType<Styles> },

    labelStyle: { type: Object as PropType<Styles> },

    labelActiveStyle: { type: Object as PropType<Styles> },
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
      this.$emit('PressLabel', this.mark.pos)
    },
  }
})
</script>