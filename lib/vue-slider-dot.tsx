import { Prop } from 'vue-property-decorator'
import { Value, Styles, Position, TooltipProp, TooltipFormatter } from './typings'

import './styles/dot.scss'
import { Options, Vue } from 'vue-class-component'
import { Slot } from 'vue'

@Options({
  name: 'VueSliderDot',
  emits: ['DragStart'],
})
export default class VueSliderDot extends Vue {
  $refs!: {
    dot: HTMLDivElement
  }

  @Prop({ default: 0 })
  value!: Value

  @Prop() tooltip!: TooltipProp

  @Prop() dotStyle?: Styles

  @Prop() tooltipStyle?: Styles

  @Prop({
    type: String,
    validator: (val: string) => ['top', 'right', 'bottom', 'left'].indexOf(val) > -1,
    required: true,
  })
  tooltipPlacement!: Position

  @Prop({ type: [String, Function] })
  tooltipFormatter?: TooltipFormatter

  @Prop({ type: Boolean, default: false })
  focus!: boolean

  @Prop({ default: false })
  disabled!: boolean

  @Prop(Object)
  dotSlot!: Slot

  @Prop(Object)
  tooltipSlot!: Slot

  get dotClasses() {
    return [
      'vue-slider-dot',
      {
        'vue-slider-dot-hover': this.tooltip === 'hover' || this.tooltip === 'active',
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
      [`vue-slider-dot-tooltip-${this.tooltipPlacement}`],
      {
        'vue-slider-dot-tooltip-show': this.showTooltip,
      },
    ]
  }

  get tooltipInnerClasses() {
    return [
      'vue-slider-dot-tooltip-inner',
      [`vue-slider-dot-tooltip-inner-${this.tooltipPlacement}`],
      {
        'vue-slider-dot-tooltip-inner-disabled': this.disabled,
        'vue-slider-dot-tooltip-inner-focus': this.focus,
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
      case 'active':
        return !!this.focus
      default:
        return false
    }
  }

  get tooltipValue(): Value {
    if (this.tooltipFormatter) {
      return typeof this.tooltipFormatter === 'string'
        ? this.tooltipFormatter.replace(/\{value\}/, String(this.value))
        : this.tooltipFormatter(this.value)
    } else {
      return this.value
    }
  }

  dragStart(e: MouseEvent | TouchEvent) {
    if (this.disabled) {
      return false
    }

    this.$emit('DragStart')
  }

  render() {
    return (
      <div
        ref="dot"
        class={this.dotClasses}
        aria-valuetext={this.tooltipValue}
        onMousedown={this.dragStart}
        onTouchstart={this.dragStart}
      >
        {this.dotSlot || <div class={this.handleClasses} style={this.dotStyle} />}
        {this.tooltip !== 'none' ? (
          <div class={this.tooltipClasses}>
            {this.tooltipSlot || (
              <div class={this.tooltipInnerClasses} style={this.tooltipStyle}>
                <span class={'vue-slider-dot-tooltip-text'}>{this.tooltipValue}</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    )
  }
}
