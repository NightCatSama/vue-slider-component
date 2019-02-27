import VueSlider, { ERROR_TYPE } from '../lib/vue-slider'

declare module 'vue-slider-component' {
  export { ERROR_TYPE }
  export default VueSlider
}
