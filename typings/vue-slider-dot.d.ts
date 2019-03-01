import { Vue } from 'vue-property-decorator'
import { Value, Styles, Position, TooltipProp, TooltipFormatter } from './typings'
import './styles/dot.scss'
export default class VueSliderDot extends Vue {
  $refs: {
    dot: HTMLDivElement
  }
  value: Value
  tooltip: TooltipProp
  dotStyle?: Styles
  tooltipStyle?: Styles
  tooltipPlacement: Position
  tooltipFormatter?: TooltipFormatter
  focus: boolean
  disabled: boolean
  readonly dotClasses: (
    | string
    | {
        'vue-slider-dot-disabled': boolean
        'vue-slider-dot-focus': boolean
      })[]
  readonly handleClasses: (
    | string
    | {
        'vue-slider-dot-handle-disabled': boolean
        'vue-slider-dot-handle-focus': boolean
      })[]
  readonly tooltipClasses: (
    | string
    | string[]
    | {
        'vue-slider-dot-tooltip-show': boolean
      })[]
  readonly tooltipInnerClasses: (
    | string
    | string[]
    | {
        'vue-slider-dot-tooltip-inner-disabled': boolean
        'vue-slider-dot-tooltip-inner-focus': boolean
      })[]
  readonly showTooltip: boolean
  readonly tooltipValue: Value
  dragStart(e: MouseEvent | TouchEvent): false | undefined
  render(): JSX.Element
}
