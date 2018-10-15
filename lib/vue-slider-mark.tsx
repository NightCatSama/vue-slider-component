import { Component, Prop, Vue } from 'vue-property-decorator'
import { Mark, Styles } from './typings'

import './styles/mark.scss'

@Component
export default class VueSlideMark extends Vue {
  // 显示标识
  @Prop({ required: true })
  mark!: Mark

  // 是否显示 label
  @Prop(Boolean) hideLabel?: boolean

  // step style
  @Prop() stepStyle?: Styles

  // step active style
  @Prop() stepActiveStyle?: Styles

  // label style
  @Prop() labelStyle?: Styles

  // label active style
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

  render() {
    const mark = this.mark
    return (
      <div class={this.marksClasses}>
        {this.$scopedSlots.step || (
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
          ? this.$scopedSlots.label || (
              <div
                class={this.labelClasses}
                style={[
                  this.labelStyle,
                  mark.labelStyle,
                  mark.active ? this.labelActiveStyle : null,
                  mark.active ? mark.labelActiveStyle : null,
                ]}
              >
                {mark.label}
              </div>
            )
          : null}
      </div>
    )
  }
}
