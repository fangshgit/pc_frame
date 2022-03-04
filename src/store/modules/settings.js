/**
 * @description 全局配置的状态管理
 */
import {
	title
} from '@/config'

const state = () => ({
	//logo
	projectLogo: '',
	// 浏览器标题
	projectTitle: title,
})
const getters = {
	projectTitle: state => state.projectTitle,
	projectLogo: state => state.projectLogo,
}
const mutations = {
	setProjectTitle(state, title) {
		state.projectTitle = title
	},
	setProjectLogo(state, logo) {
		state.projectLogo = logo
	},
}
const actions = {
}
export default { state, getters, mutations, actions }
