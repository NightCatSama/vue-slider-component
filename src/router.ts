import Vue from 'vue'
import Router from 'vue-router'

import { routes } from './nav/'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes,
})

export default router
