/**
 * @description 异常捕获的状态拦截，请勿修改
 */
const state = () => ({
  expressList: [],
})
const getters = {
  expressList: (state) => state.expressList,
}
const mutations = {
  setExpressList(state, expressList) {
    state.expressList = expressList
  },
}
const actions = {
  // addErrorLog({ commit }, errorLog) {
  //   commit('addErrorLog', errorLog)
  // },
  // clearErrorLog({ commit }) {
  //   commit('clearErrorLog')
  // },
}
export default { state, getters, mutations, actions }