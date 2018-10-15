import { Component, Prop, Vue } from 'vue-property-decorator'
import { TValue, Styles } from './typings'

import './styles/dot.scss'

@Component
export default class VueSliderDot extends Vue {
  $refs!: {
    dot: HTMLDivElement
  }

  // slider value
  @Prop({ default: 0 })
  value!: TValue

  // 滑块大小
  @Prop({ default: 16 })
  dotSize!: number | [number, number]

  // dot 样式
  @Prop() dotStyle?: Styles

  @Prop(Boolean) focus?: boolean = false

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
      >
        {this.$slots.default || <div class={this.handleClasses} style={this.dotStyle} />}
      </div>
    )
  }
}
