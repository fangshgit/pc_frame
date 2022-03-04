import { resolve } from 'path'
import { recordRoute } from '@/config'
import qs from 'qs'

/**
 * @description all模式渲染后端返回路由,支持包含views路径的所有页面
 * @param asyncRoutes
 * @returns {*}
 */
export function convertRouter(asyncRoutes) {
  return asyncRoutes.map((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        // route.component = (resolve) => require(['@/vab/layouts'], resolve)
      } else {
        const index = route.component.indexOf('views')
        const path =
          index > 0 ? route.component.slice(index) : `views/${route.component}`
        route.component = (resolve) => require([`@/${path}`], resolve)
      }
    }
    if (route.children && route.children.length)
      route.children = convertRouter(route.children)
    delete route.redirect
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
}


/**
 * 根据path路径获取matched
 * @param routes 菜单routes
 * @param name 路由名
 * @returns {*} matched
 */
export function handleMatched(routes, name) {
  return routes
    .filter((route) => route.childrenNameList.indexOf(name) + 1)
    .flatMap((route) =>
      route.children ? [route, ...handleMatched(route.children, name)] : [route]
    )
}

/**
 * 根据当前route获取激活菜单
 * @param route 当前路由
 * @param isTab 是否是标签
 * @returns {string|*}
 */
export function handleActivePath(route, isTab = false) {
  const { meta, path } = route
  const rawPath = route.matched
    ? route.matched[route.matched.length - 1].path
    : path
  const fullPath =
    route.query && Object.keys(route.query).length
      ? `${route.path}&${qs.stringify(route.query)}`
      : route.path
  if (isTab) return meta.dynamicNewTab ? fullPath : rawPath
  if (meta.activeMenu) return meta.activeMenu
  return fullPath
}

/**
 * 返回登录页的路径，若开启了recordRoute，则记录当前页面的地址
 * @param currentPath 当前页面地址
 */
export function toLoginRoute(currentPath) {
  if (recordRoute && currentPath !== '/')
    return {
      path: '/login',
      query: { redirect: currentPath },
      replace: true,
    }
  else return { path: '/login', replace: true }
}
