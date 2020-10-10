import 'core-js/modules/es.array.flat-map'
import 'core-js/modules/es.object.entries'
import 'core-js/modules/es.object.values'

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'

// import Vuep from 'vuep'
// import 'vuep/dist/vuep.css'

// import Example from './components/Example.vue'
import VueSlider from '../lib/vue-slider'
import { getTheme } from './utils'

const theme = getTheme()
switch (theme) {
  case 'antd':
    require('../lib/theme/antd.scss')
    break
  case 'material':
    require('../lib/theme/material.scss')
    break
  default:
    require('../lib/theme/default.scss')
}

const app = createApp(App)

app
  // .component('Example', Example)
  .component('VueSlider', VueSlider)
  // .use(router)
  .mount('#app')
