/* tslint:disable:import-spacing */
import VueSlider from './vue-slider'
import VueSliderMark from './vue-slider-mark'
import VueSliderDot from './vue-slider-dot'
import { ERROR_TYPE } from './utils/control'
;(VueSlider as any).VueSliderMark = VueSliderMark
;(VueSlider as any).VueSliderDot = VueSliderDot

export default VueSlider
export { ERROR_TYPE, VueSliderMark, VueSliderDot }
