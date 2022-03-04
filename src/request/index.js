import Vue from 'vue'
import axios from 'axios'
import { baseURL, contentType, messageName, requestTimeout, statusName, successCode } from '@/config/net.config'
import { getToken } from '@/utils/token'
import qs from 'qs'
import router from '@/router'
// 错误日志处理函数
import { addErrorLog } from './errorLog.js'

const CODE_MESSAGE = {
	200: '服务器成功返回请求数据',
	201: '新建或修改数据成功',
	202: '一个请求已经进入后台排队(异步任务)',
	204: '删除数据成功',
	400: '发出信息有误',
	401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
	402: '令牌过期',
	403: '用户得到授权，但是访问是被禁止的',
	404: '访问资源不存在',
	406: '请求格式不可得',
	410: '请求资源被永久删除，且不会被看到',
	500: '服务器发生错误',
	502: '网关错误',
	503: '服务不可用，服务器暂时过载或维护',
	504: '网关超时'
}

/**
 * axios请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConf = config => {
	let token = getToken()
	if (token) config.headers['Authorization'] = `${token}`
	// 将对象序列化成URL的形式
	if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') config.data = qs.stringify(config.data)
	// mock接口的处理逻辑（不需要可以删除）
	if (RegExp(/mock/).test(config.url)) {
		let reg = new RegExp('mock', 'g')
		config.url = config.url.replace(reg, '')
		config.baseURL = '/mock'
	}
	// get请求映射params参数
	if (config.method === 'get' && config.params) {
		let url = config.url + '?'
		for (const propName of Object.keys(config.params)) {
			const value = config.params[propName]
			let part = encodeURIComponent(propName) + '='
			if (value !== null && typeof value !== 'undefined') {
				if (typeof value === 'object') {
					for (const key of Object.keys(value)) {
						let params = propName + '[' + key + ']'
						let subPart = encodeURIComponent(params) + '='
						url += subPart + encodeURIComponent(value[key]) + '&'
					}
				} else {
					url += part + encodeURIComponent(value) + '&'
				}
			}
		}
		url = url.slice(0, -1)
		config.params = {}
		config.url = url
	}
	return config
}

/**
 * axios响应拦截器
 * @param config 请求配置
 * @param data response数据
 * @param status HTTP status
 * @param statusText HTTP status text
 * @returns {Promise<*|*>}
 */
const handleData = async ({ config, data, status, statusText }) => {
	// 若data.code存在，覆盖默认code
	let code = data && data[statusName] ? data[statusName] : status
	// 若code属于操作正常code，则status修改为200
	if (successCode.indexOf(data[statusName]) + 1) code = 200
	switch (code) {
		case 200:
			return data
		case 402:
			router.push({ path: '/login', replace: true })
			return data
		case 500:
			break
	}
	// 异常处理
	// 若data.msg存在，覆盖默认提醒消息
	const errMsg = `${data && data[messageName] ? data[messageName] : CODE_MESSAGE[code] ? CODE_MESSAGE[code] : statusText}`
	Vue.prototype.$baseMessage(errMsg, 'error')
	// 添加错误日志(与errorHandler钩子触发逻辑一致)
	if (process.env.NODE_ENV === 'production') addErrorLog({ message: errMsg, stack: data })
	return Promise.reject(data)
}

/**
 * @description axios初始化
 */
const instance = axios.create({
	baseURL,
	timeout: requestTimeout,
	headers: {
		'Content-Type': contentType
	}
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(requestConf, error => {
	return Promise.reject(error)
})

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
	response => handleData(response),
	error => {
		const { response } = error
		if (response === undefined) {
			return Promise.reject({})
		} else return handleData(response)
	}
)

export default instance
export const requestBlob = (url, data) =>
	instance({
		url,
		method: 'post',
		data,
		responseType: 'blob'
	})
