import Vue from 'vue'
import Router from 'vue-router'

import { routes } from './nav/'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Vue Slider Component`
  next()
})

export default router
