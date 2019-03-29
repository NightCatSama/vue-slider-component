import { RouteConfig } from 'vue-router'

import nav from './nav.json'
import navZhCN from './zh-CN.nav.json'

export interface Nav {
  name: string
  route: string
  component: string
}

export interface NavObj {
  [key: string]: Nav[]
}

export const enum LANG {
  ENGLISH = '/',
  ZH_CN = '/zh-CN/',
}

export const getNavObj = (lang: LANG): NavObj => {
  switch (lang) {
    case LANG.ENGLISH:
      return nav
    case LANG.ZH_CN:
      return navZhCN
    default:
      return nav
  }
}

export const getRoutes = (obj: NavObj, prefix: LANG): RouteConfig[] =>
  Object.values(obj)
    .map(navList =>
      navList.map(
        item =>
          ({
            path: prefix + item.route,
            meta: {
              lang: prefix,
              title: item.name,
              route: item.route,
            },
            component: resolve => require([`@/pages${prefix + item.component}`], resolve),
          } as RouteConfig),
      ),
    )
    .flatMap(s => s)
    .map((route, index, arr) => ({
      ...route,
      meta: {
        ...route.meta,
        prev: arr[index - 1],
        next: arr[index + 1],
      },
    }))

export const routes = [...getRoutes(nav, LANG.ENGLISH), ...getRoutes(navZhCN, LANG.ZH_CN)]
