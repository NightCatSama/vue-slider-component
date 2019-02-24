import { Component, Prop, Vue } from 'vue-property-decorator'
import { Mark, Styles } from './typings'

import './styles/mark.scss'

@Component
export default class VueSlideMark extends Vue {
  @Prop({ required: true })
  mark!: Mark

  @Prop(Boolean) hideLabel?: boolean

  @Prop() stepStyle?: Styles

  @Prop() stepActiveStyle?: Styles

  @Prop() labelStyle?: Styles

  @Prop() labelActiveStyle?: Styles

  get marksClasses() {
    return [
      'vue-slider-mark',
      {
        'vue-slider-mark-active': this.mark.active,
      },
    ]
  }

  get stepClasses() {
    return [
      'vue-slider-mark-step',
      {
        'vue-slider-mark-step-active': this.mark.active,
      },
    ]
  }

  get labelClasses() {
    return [
      'vue-slider-mark-label',
      {
        'vue-slider-mark-label-active': this.mark.active,
      },
    ]
  }

  labelClickHandle(e: MouseEvent | TouchEvent) {
    e.stopPropagation()
    this.$emit('pressLabel', this.mark.pos)
  }

  render() {
    const mark = this.mark
    return (
      <div class={this.marksClasses}>
        {this.$slots.step || (
          <div
            class={this.stepClasses}
            style={[
              this.stepStyle,
              mark.style,
              mark.active ? this.stepActiveStyle : null,
              mark.active ? mark.activeStyle : null,
            ]}
          />
        )}
        {!this.hideLabel
          ? this.$slots.label || (
              <div
                class={this.labelClasses}
                style={[
                  this.labelStyle,
                  mark.labelStyle,
                  mark.active ? this.labelActiveStyle : null,
                  mark.active ? mark.labelActiveStyle : null,
                ]}
                onClick={this.labelClickHandle}
              >
                {mark.label}
              </div>
            )
          : null}
      </div>
    )
  }
}
