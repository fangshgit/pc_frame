import { storage, tokenTableName } from '@/config'
import { getLocalStorage,setLocalStorage,removeLocalStorage } from './localStorage.js'
/**
 * @description 获取token
 * @returns {string| null>}
 */
export function getToken() {
  return getLocalStorage(tokenTableName)
}

/**
 * @description 存储token
 * @param token
 * @returns {void}
 */
export function setToken(token) {
	return setLocalStorage(tokenTableName, token)
}

/**
 * @description 移除token
 * @returns {void}
 */
export function removeToken() {
  return removeLocalStorage(tokenTableName)
}
