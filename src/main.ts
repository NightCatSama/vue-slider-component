import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueSlider, { VueSliderMark, VueSliderDot } from '../lib'
import '../lib/theme/default.scss'

Vue.component('VueSlider', VueSlider)
Vue.component('VueSliderMark', VueSliderMark)
Vue.component('VueSliderDot', VueSliderDot)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
