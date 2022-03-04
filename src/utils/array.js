import { accDiv, accAdd } from './index.js'
/**
 * 数组排序
 * @param arr
 * @param type
 * @returns {Array}
 */
const arraySort = (arr, type = 1) => {
	return arr.sort((a, b) => {
		switch (type) {
			case 1:
			// 正序
				return a - b
			case 2:
			// 倒序
				return b - a
			case 3:
			// 随机排序
				return Math.random() - 0.5
			default:
				return arr
		}
	})
}
// 数组去重
const arrayUnique = arr => {
	return Array.from(new Set(arr))
}
// 两个数组的合集
const arrayUnion = (a, b) => {
	let newArr = a.concat(b)
	return arrayUnique(newArr)
}
// 数组求和
const sum = arr => {
	return arr.reduce((pre, cur) => {
		return accAdd(pre, cur)
	})
}
// 数组平均值
const average = arr => {
	return accDiv(sum(arr), arr.length)
}
/**
 * 指定范围的数组
 * @param start 最小的范围
 * @param end 最大的范围
 * @returns {Array}
 */
const range = (start, end) => {
	return [...new Array(end + 1).keys()].slice(start)
}
// 要使用的函数需自行导出，没有用到的函数在build的会进行摇树处理
export {}