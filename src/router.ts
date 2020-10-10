import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import { routes } from './nav/'
import { getQuery } from './utils'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Vue Slider Component`
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
