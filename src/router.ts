import Vue from 'vue'
import Router from 'vue-router'

import { routes } from './nav/'
import { getQuery } from './utils'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta?.title || ''} | Vue Slider Component`
  next()
})

router.afterEach(route => {
  if (route.query.hash) {
    setTimeout(() => {
      const elem = document.getElementById(route.query.hash as string)
      if (elem) {
        elem.scrollIntoView()
      }
    })
  }
})

export default router
