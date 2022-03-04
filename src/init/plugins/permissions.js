/**
 * @description 路由守卫，目两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/token'
import { title } from '@/config/setting.config.js'
// 进度条插件，用于切换路由时显示进度
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { toLoginRoute } from '@/utils/routes'
// 引入路由模式、登录拦截，白名单路由配置项
import {
  authentication,
  loginInterception,
  routesWhiteList,
} from '@/config/router.config.js'

VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})
router.beforeEach(async (to, from, next) => {
  VabProgress.start()
  let hasToken = getToken()
  if (!loginInterception) hasToken = true
  if (hasToken) {
	  // 如果用户已登录、或不需要登录拦截，则判断路由是否注册完成
    if (store.getters['routes/routes'].length) {
	  // 判断是否跳转到登录页，是则拦截该操作，禁止已登录用户返回登录页
      if (to.path === '/login') {
        // console.log('禁止已登录用户返回登录页...')
        next({ path: '/' })
        VabProgress.done()
      } else next()
    } else {
		// 路由若为空，则代表authentication是all，在此执行获取路由的操作
      try {
        // 获取用户信息
        // await store.dispatch('user/getUserInfo')
		
        next({ ...to, replace: true })
      } catch (err) {
        console.error('路由拦截报错:', err)
		// 获取出错则清除登录状态，执行toLoginRoute
        await store.dispatch('user/resetAll')
        next(toLoginRoute(to.path))
      }
    }
  } else {
    if (routesWhiteList.includes(to.path)) {
      next()
    } else next(toLoginRoute(to.path))
  }
})
router.afterEach((to) => {
  document.title = to.meta.title || title
  if (VabProgress.status) VabProgress.done()
})
