var vueSlider = require('./vue2-slider')

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  function install (Vue) {
    Vue.component('vue-slider', vueSlider);
  }

  window.Vue.use(install)
}

module.exports = vueSlider
