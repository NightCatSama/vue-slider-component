import { RouteConfig } from 'vue-router'

import nav from './nav.json'
import navZhCN from './zh-CN.nav.json'

export const enum LANG {
  ENGLISH = 'english',
  ZH_CN = '简体中文',
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

export const getRoutes = (obj: NavObj, lang: LANG, prefix = ''): RouteConfig[] =>
  Object.values(obj)
    .map(navList =>
      navList.map(
        item =>
          ({
            name: item.name,
            path: item.route,
            meta: {
              lang,
            },
            component: resolve => require([`@/pages${prefix + '/' + item.component}`], resolve),
          } as RouteConfig),
      ),
    )
    .flat()

export const routes = [...getRoutes(nav, LANG.ENGLISH), ...getRoutes(navZhCN, LANG.ZH_CN, '/zh-CN')]
