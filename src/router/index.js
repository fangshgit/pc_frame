/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import { publicPath, routerMode } from '@/config/router.config'
import _asyncRoutes from './module'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/home'),
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
  }
]

export const asyncRoutes = _asyncRoutes

const router = createRouter()

// 将children转为一维数组
function fatteningRoutes(routes) {
  return new Promise((resolve, reject) => {
    routes.flatMap((route) => {
      return route.children ? fatteningRoutes(route.children) : route
    })
    resolve(routes)
  })
}
export function resetRouter(routes = constantRoutes) {
  routes.forEach(async (route) => {
    if (route.children) {
      route.children = await fatteningRoutes(route.children)
    }
  })
  router.matcher = createRouter(routes).matcher
}

function createRouter(routes = constantRoutes) {
  return new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: routes,
  })
}

// 重写VueRouter的push函数
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  // return originalPush.call(this, location).catch(err => err)
  return originalPush.call(this, location)
}

export default router
