/**
 * @description i18配置的状态管理
 */
import { getLocalStorage } from '@/utils/localStorage'
import {
	i18n,
} from '@/config'
import router from '@/router'

const { language } = getLocalStorage('language')
const state = () => ({
	// 多语言默认类型
	language: language || i18n,
})
const getters = {
	language: state => state.language
}
const mutations = {
	changeLanguage(state, language) {
		state.language = language
		localStorage.setItem('language', `{"language":"${language}"}`)
	}
}
const actions = {
	changeLanguage: ({ commit }, language) => {
		commit('changeLanguage', language)
	}
}
export default { state, getters, mutations, actions }
