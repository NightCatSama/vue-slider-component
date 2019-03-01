import { Vue } from 'vue-property-decorator'
import {
  Value,
  MarksProp,
  Styles,
  DotOption,
  Dot,
  Direction,
  Position,
  ProcessProp,
  TooltipProp,
  TooltipFormatter,
} from './typings'
import Control from './utils/control'
import State, { StateMap } from './utils/state'
import './styles/slider.scss'
export declare const SliderState: StateMap
export default class VueSlider extends Vue {
  control: Control
  states: State
  scale: number
  focusDotIndex: number
  $refs: {
    container: HTMLDivElement
  }
  $el: HTMLDivElement
  value: Value | Value[]
  direction: Direction
  width?: number
  height?: number
  dotSize: [number, number] | number
  min: number
  max: number
  interval: number
  disabled: boolean
  clickable: boolean
  duration: number
  data?: Value[]
  lazy: boolean
  tooltip: TooltipProp
  tooltipPlacement?: Position
  tooltipFormatter?: TooltipFormatter
  useKeyboard?: boolean
  enableCross: boolean
  fixed: boolean
  order: boolean
  minRange?: number
  maxRange?: number
  marks?: MarksProp
  process?: ProcessProp
  included?: boolean
  hideLabel?: boolean
  dotOptions?: DotOption | DotOption[]
  railStyle?: Styles
  processStyle?: Styles
  dotStyle?: Styles
  tooltipStyle?: Styles
  stepStyle?: Styles
  stepActiveStyle?: Styles
  labelStyle?: Styles
  labelActiveStyle?: Styles
  readonly tailSize: number
  readonly containerClasses: (
    | string
    | string[]
    | {
        'vue-slider-disabled': boolean
      })[]
  readonly containerStyles: {
    padding: string
    width: string
    height: string
  }
  readonly processBaseStyleArray: Styles[]
  readonly dotBaseStyle: {
    width: string
    height: string
  }
  readonly mainDirection: string
  readonly isHorizontal: boolean
  readonly isReverse: boolean
  readonly tooltipDirections: Position[]
  readonly dots: Dot[]
  readonly animateTime: number
  readonly canSort: boolean
  onValueChanged(): void
  created(): void
  mounted(): void
  beforeDestroy(): void
  bindEvent(): void
  unbindEvent(): void
  setScale(): void
  initControl(): void
  isDisabledByDotIndex(index: number): boolean
  private syncValueByPos
  private readonly isNotSync
  private isDiff
  private emitError
  /**
   * Get the drag range of the slider
   *
   * @private
   * @param {number} index slider index
   * @returns {[number, number]} range [start, end]
   * @memberof VueSlider
   */
  private readonly dragRange
  private dragStart
  private dragMove
  private isCrossDot
  private dragEnd
  private blurHandle
  private clickHandle
  focus(index?: number): void
  blur(): void
  setValueByPos(pos: number): false | undefined
  keydownHandle(e: KeyboardEvent): false | undefined
  private getPosByEvent
  private renderSlot
  render(): JSX.Element
}
