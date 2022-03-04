/**
 * 去空格
 * @param str
 * @param type
 * @returns {string}
 * @constructor
 */
const trim = (str, type) => {
	type = type || 1
	switch (type) {
		case 1:
			// 所有空格
			return str.replace(/\s+/g, '')
		case 2:
			// 前后空格
			return str.trim()
		case 3:
			// 前空格
			return str.replace(/(^\s*)/g, '')
		case 4:
			// 后空格
			return str.replace(/(\s*$)/g, '')
		default:
			return str
	}
}
// padStart 的 polyfill，来自uview-ui的源码
// 因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
const padStartPolyfill = () => {
	if (!String.prototype.padStart) {
		// 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
		String.prototype.padStart = function(maxLength, fillString = ' ') {
			if (Object.prototype.toString.call(fillString) !== '[object String]') {
				throw new TypeError('fillString must be String')
			}
			const str = this
			// 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
			if (str.length >= maxLength) return String(str)

			const fillLength = maxLength - str.length
			let times = Math.ceil(fillLength / fillString.length)
			while ((times >>= 1)) {
				fillString += fillString
				if (times === 1) {
					fillString += fillString
				}
			}
			return fillString.slice(0, fillLength) + str
		}
	}
}
/**
 * 遮蔽字符串
 * @param str
 * @param type
 * @param end
 * @param start
 * @returns {string}
 */
const shield = (str, type = 1, end = 3, start = 3) => {
	if (!str) {
		return str
	}
	switch (type) {
		case 1:
			// 遮蔽尾部
			return str.substr(-end).padStart(str.length, '*')
			break
		case 2:
			// 遮蔽中间部分
			try {
				return `${str.substr(0, start)}...${str.substr(-end)}`
			} catch (e) {
				return str
			}
			break
		default:
			return str
	}
}
// 要使用的函数需自行导出，没有用到的函数在build的会进行摇树处理
export {}
