import { isJson } from "./verify.js"
// get
const getLocalStorage = key => {
	const value = localStorage.getItem(key)
	if (isJson(value)) {
		return JSON.parse(value)
	} else {
		return false
	}
}
// set
const setLocalStorage = (key,value) => {
	return localStorage.setItem(key, value)
}
// remove
const removeLocalStorage = key => {
	return localStorage.removeItem(key)
}
export {
	getLocalStorage,
	setLocalStorage,
	removeLocalStorage
}