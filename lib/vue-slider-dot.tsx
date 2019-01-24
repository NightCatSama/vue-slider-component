import { Component, Prop, Vue } from 'vue-property-decorator'
import { TValue, Styles, TooltipProp, TooltipFormatter } from './typings'

import './styles/dot.scss'

@Component
export default class VueSliderDot extends Vue {
  $refs!: {
    dot: HTMLDivElement
  }

  // slider value
  @Prop({ default: 0 })
  value!: TValue

  // tooltip 样式
  @Prop() tooltip!: TooltipProp

  // dot 样式
  @Prop() dotStyle?: Styles

  // tooltip 样式
  @Prop() tooltipStyle?: Styles

  // 格式化 tooltip
  @Prop({ type: [String, Function] })
  tooltipFormatter?: TooltipFormatter

  @Prop({ type: Boolean, default: false })
  focus!: boolean

  // 是否禁用状态
  @Prop({ default: false })
  disabled!: boolean

  get dotClasses() {
    return [
      'vue-slider-dot',
      {
        'vue-slider-dot-disabled': this.disabled,
        'vue-slider-dot-focus': this.focus,
      },
    ]
  }

  get handleClasses() {
    return [
      'vue-slider-dot-handle',
      {
        'vue-slider-dot-handle-disabled': this.disabled,
        'vue-slider-dot-handle-focus': this.focus,
      },
    ]
  }

  get tooltipClasses() {
    return [
      'vue-slider-dot-tooltip',
      {
        'vue-slider-dot-tooltip-disabled': this.disabled,
        'vue-slider-dot-tooltip-focus': this.focus,
        'vue-slider-dot-tooltip-show': this.showTooltip,
      },
    ]
  }

  get showTooltip(): boolean {
    switch (this.tooltip) {
      case 'always':
        return true
      case 'none':
        return false
      case 'focus':
        return !!this.focus
      default:
        return false
    }
  }

  get tooltipValue(): TValue {
    if (this.tooltipFormatter) {
      return typeof this.tooltipFormatter === 'string'
        ? this.tooltipFormatter.replace(/\{value\}/, String(this.value))
        : this.tooltipFormatter(this.value)
    } else {
      return this.value
    }
  }

  // 拖拽开始
  dragStart(e: MouseEvent | TouchEvent) {
    if (this.disabled) {
      return false
    }

    this.$emit('dragStart')
  }

  render() {
    return (
      <div
        ref="dot"
        class={this.dotClasses}
        onMousedown={this.dragStart}
        onTouchstart={this.dragStart}
        data-value={this.value}
      >
        {this.$slots.default || <div class={this.handleClasses} style={this.dotStyle} />}
        {this.$slots.tooltip || (
          <div class={this.tooltipClasses} style={this.tooltipStyle}>
            {this.tooltipValue}
          </div>
        )}
      </div>
    )
  }
}
