/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
// import Vue from 'vue'
const Vue = require('vue')
import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
// 引入渲染路由函数
import { convertRouter } from '@/utils/routes'
// 引入路由模式配置项
import { authentication } from '@/config'
import { isArray } from '@/utils/verify'

const state = () => ({
	routes: constantRoutes||[],
	activeName: '',
	currentRouteTitle: '',
	storeId: '',
	applicationChildrenRoutes: []
})
const getters = {
	routes: state => state.routes,
	activeName: state => state.activeName,
}
const mutations = {
	/**
	 * @description 多模式设置路由
	 * @param {*} state
	 * @param {*} routes
	 */
	setRoutes(state, routes) {
		state.routes = routes
	},
	setApplicationChildrenRoutes(state, applicationChildrenRoutes) {
		state.applicationChildrenRoutes = applicationChildrenRoutes
	},
	/**
	 * @description 修改Meta
	 * @param {*} state
	 * @param options
	 */
	changeMenuMeta(state, options) {
		function handleRoutes(routes) {
			return routes.map(route => {
				if (route.name === options.name) Object.assign(route.meta, options.meta)
				if (route.children && route.children.length) route.children = handleRoutes(route.children)
				return route
			})
		}
		state.routes = handleRoutes(state.routes)
	},
	/**
	 * @description 修改 activeName
	 * @param {*} state
	 * @param activeName 当前激活菜单
	 */
	changeActiveName(state, activeName) {
		state.activeName = activeName
	},
}
const actions = {
	/**
	 * @description 多模式设置路由
	 * @param {*} { commit }
	 * @param obj
	 * @returns
	 */
	async setRoutes({ commit }, obj) {
		// 默认前端路由
		let routes = [...asyncRoutes]
		// 设置后端路由,需自定义获取路由的方式，此处仅作示范(不需要可以删除)
		if (authentication === 'all') {
			const list = []
			if (!isArray(list)) Vue.prototype.$baseMessage('路由格式返回有误！', 'error')
			routes = convertRouter(list)
		}
		// 设置菜单所需路由
		commit('setRoutes', routes)
		// 根据可访问路由重置Vue Router并设置默认路由
		await resetRouter([{ path: '/', redirect: routes[0].path }, ...accessRoutes])
	},
	/**
	 * @description 修改Route Meta
	 * @param {*} { commit }
	 * @param options
	 */
	changeMenuMeta({ commit }, options = {}) {
		commit('changeMenuMeta', options)
	},
	/**
	 * @description 修改 activeName
	 * @param {*} { commit }
	 * @param activeName 当前激活菜单
	 */
	changeActiveName({ commit }, activeName) {
		commit('changeActiveName', activeName)
	},
}

export default { state, getters, mutations, actions }
