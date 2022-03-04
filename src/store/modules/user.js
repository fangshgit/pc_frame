/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import Vue from 'vue'
import { getUserInfo } from 'api/user'
import { login, logout } from 'api/login'
import { removeToken } from '@/utils/token'
import { resetRouter } from '@/router'
import { isArray, isString } from '@/utils/verify'
import { title, tokenName } from '@/config/setting.config'

const state = () => ({
  username: '',
  avatar: require('@/assets/frame/default_avatar.png'),
})
const getters = {
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}
const mutations = {
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  }
}
const actions = {
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const data = await login(userInfo)
    const token = data.data.access_token
    if (token) {
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      const err = `登录接口异常，未正确返回${tokenName}...`
      Vue.prototype.$baseMessage(err, 'error')
      throw err
    }
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const {
      user: { userName, avatar },
    } = await getUserInfo()
    /**
     * 检验返回数据是否正常，无对应参数，将使用默认用户名,头像
     * userName {String}
     * avatar {String}
     */
    if (!userName || (avatar && !isString(avatar))) {
      const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确'
      throw err
    } else {
      // 如不使用username用户名,可删除以下代码
      if (userName) commit('setUsername', userName)
      // 如不使用avatar头像,可删除以下代码
      if (avatar) commit('setAvatar', avatar)
    }
  },
  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout()
    await dispatch('resetAll')
  },
  /**
   * @description 重置token、roles、ability、router、tabsBar等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ commit, dispatch }) {
    commit('setUsername', '')
    commit(
      'setAvatar',
      require('@/assets/frame/default_avatar.png')
    )
    await resetRouter()
    removeToken()
  },
}
export default { state, getters, mutations, actions }
