import Vue from 'vue'
import { Loading, Message, Notification } from 'element-ui'
// 引入xss过滤
import xss from 'xss'
import { timeFormat } from '@/utils/date.js'
// 引入base64，用于对query参数加密
import Base64 from '@/utils/base64.js'
import {accMul,accDiv,accAdd} from '@/utils'
Vue.prototype.xss = xss
/**
 * @description 全局加载层
 * @param {number} index 自定义加载图标类名ID
 * @param {string} text 显示在加载图标下方的加载文案
 */
Vue.prototype.$baseLoading = (index = undefined, text = loadingText) => {
	return Loading.service({
		lock: true,
		text,
		spinner: index ? 'vab-loading-type' + index : index,
		background: 'hsla(0,0%,100%,.8)'
	})
}
// 自行选择使用多彩加载层或普通加载层，或两者都使用
// /**
//  * @description 全局多彩加载层
//  * @param {number} index 自定义加载图标类名ID
//  * @param {string} text 显示在加载图标下方的加载文案
//  */
// Vue.prototype.$baseColorfullLoading = (
//   index = undefined,
//   text = loadingText
// ) => {
//   let loading;
//   if (!index) {
//     loading = Loading.service({
//       lock: true,
//       text,
//       spinner: "dots-loader",
//       background: "hsla(0,0%,100%,.8)",
//     });
//   } else {
//     const spinnerDict = {
//       1: "dots",
//       2: "gauge",
//       3: "inner-circles",
//       4: "plus",
//     };
//     loading = Loading.service({
//       lock: true,
//       text,
//       spinner: spinnerDict[index] + "-loader",
//       background: "hsla(0,0%,100%,.8)",
//     });
//   }
//   return loading;
// };
/**
 * @description 全局Message
 * @param {string|VNode} message 消息文字
 * @param {'success'|'warning'|'info'|'error'} type 主题
 * @param {string} customClass 自定义类名
 * @param {boolean} dangerouslyUseHTMLString 是否将message属性作为HTML片段处理
 */
Vue.prototype.$baseMessage = (message, type = 'info', customClass = undefined, dangerouslyUseHTMLString = false) => {
	Message({
		message,
		type,
		customClass,
		duration: messageDuration,
		dangerouslyUseHTMLString,
		showClose: true
	})
}
/**
 * @description 全局Notification
 * @param {string} message 说明文字
 * @param {string|VNode} title 标题
 * @param {'success'|'warning'|'info'|'error'} type 主题样式,如果不在可选值内将被忽略
 * @param {'top-right'|'top-left'|'bottom-right'|'bottom-left'} position 自定义弹出位置
 */
Vue.prototype.$baseNotify = (message, title, type = 'success', position = 'top-right', duration) => {
	Notification({
		title,
		message,
		type,
		duration: duration || messageDuration,
		position
	})
}
// i18翻译函数,不需要时可注释
Vue.prototype.$T = title => {
	if (this.$te(title)) return this.$t(title)
	return title
}
// api请求hook
Vue.prototype.$apiHooks = async ({ api, params, isLoading = false, loadingTarget = '.app-main', isShowSuccessMsg = false, successMsgText, errMsgText }) => {
	let loading
	if (isLoading) {
		loading = this.$loading({
			lock: true,
			target: loadingTarget
		})
	}
	let res = await api(...params)
	isLoading && loading.close()
	if (res.code === 200) {
		isShowSuccessMsg && this.$baseMessage(successMsgText || res.msg, 'success')
	} else {
		this.$baseMessage(errMsgText || res.msg, 'error')
	}
	return res
}

// 时间格式转换
Vue.prototype.$timeFormat = timeFormat

// 回到某个元素顶部
// 一般用于翻页时回到对应列表的顶部
Vue.prototype.$toHash = (boxId = 'app') => {
	document.getElementById(boxId).scrollIntoView({ behavior: 'smooth' })
}

Vue.prototype.$Base64 = Base64

Vue.prototype.$accMul = accMul

Vue.prototype.$accAdd = accAdd

Vue.prototype.$accDiv = accDiv
