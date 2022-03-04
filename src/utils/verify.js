// 是否为url地址
const isURL = s => {
	return /^http[s]?:\/\/.*/.test(s)
}
// 邮箱验证
const isEmail = s => {
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
// 手机号验证
const isMobile = s => {
	return /^1[0-9]{10}$/.test(s)
}
// 座机号码验证
const isTel = s => {
	return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(s)
}
// 身份证号码验证
const isCard = s => {
	return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s)
}
// 严格的身份证号码验证
const isCardID = sId => {
	if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
		console.log('你输入的身份证长度或格式错误')
		return false
	}
	//身份证城市
	let aCity = {
		11: '北京',
		12: '天津',
		13: '河北',
		14: '山西',
		15: '内蒙古',
		21: '辽宁',
		22: '吉林',
		23: '黑龙江',
		31: '上海',
		32: '江苏',
		33: '浙江',
		34: '安徽',
		35: '福建',
		36: '江西',
		37: '山东',
		41: '河南',
		42: '湖北',
		43: '湖南',
		44: '广东',
		45: '广西',
		46: '海南',
		50: '重庆',
		51: '四川',
		52: '贵州',
		53: '云南',
		54: '西藏',
		61: '陕西',
		62: '甘肃',
		63: '青海',
		64: '宁夏',
		65: '新疆',
		71: '台湾',
		81: '香港',
		82: '澳门',
		91: '国外'
	}
	if (!aCity[parseInt(sId.substr(0, 2))]) {
		console.log('你的身份证地区非法')
		return false
	}
	// 出生日期验证
	let sBirthday = (sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))).replace(/-/g, '/'),
		d = new Date(sBirthday)
	if (sBirthday != d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()) {
		console.log('身份证上的出生日期非法')
		return false
	}
	// 身份证号码校验
	let sum = 0,
		weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
		codes = '10X98765432'
	for (let i = 0; i < sId.length - 1; i++) {
		sum += sId[i] * weights[i]
	}
	let last = codes[sum % 11] //计算出来的最后一位身份证号码
	if (sId[sId.length - 1] != last) {
		console.log('你输入的身份证号非法')
		return false
	}
	return true
}

// 以字母开头，长度在6~18之间，只能包含字母、数字和下划线的密码验证
const ispwd = s => {
	return /^[a-zA-Z]\w{5,17}$/.test(s)
}
// 检测密码强度
const checkPwd = str => {
	let Lv = 0
	if (str.length < 6) {
		return Lv
	}
	if (/[0-9]/.test(str)) {
		Lv++
	}
	if (/[a-z]/.test(str)) {
		Lv++
	}
	if (/[A-Z]/.test(str)) {
		Lv++
	}
	if (/[\.|-|_]/.test(str)) {
		Lv++
	}
	return Lv
}

// 通过Object.prototype.toString精准判断数据类型
const verifyType = (o, type) => {
	return Object.prototype.toString.call(o).slice(8, -1) === type
}
// 判断是否为字符串
const isString = o => {
	return verifyType(o, 'String')
}
// 判断是否为数字
const isNumber = o => {
	return verifyType(o, 'Number')
}
// 判断是否为boolean
const isBoolean = o => {
	return verifyType(o, 'Boolean')
}
// 判断是否为函数
const isFunction = o => {
	return verifyType(o, 'Function')
}
// 判断是否为null
const isNull = o => {
	return verifyType(o, 'Null')
}
// 判断是否为undefined
const isUndefined = o => {
	return verifyType(o, 'Undefined')
}
// 判断是否为对象
const isObj = o => {
	return verifyType(o, 'Object')
}
// 判断是否为json
const isJson = o => {
  if (typeof o === 'string') {
    const obj = JSON.parse(o)
    return !!(typeof obj === 'object' && obj)
  }
  return false
}
// 判断是否为数组
const isArray = o => {
	return verifyType(o, 'Array')
}
// 判断是否为时间
const isDate = o => {
	return verifyType(o, 'Date')
}
// 判断是否为正则
const isRegExp = o => {
	return verifyType(o, 'RegExp')
}
// 判断是否为错误对象
const isError = o => {
	return verifyType(o, 'Error')
}
// 判断是否为Symbol函数
const isSymbol = o => {
	return verifyType(o, 'Symbol')
}
// 判断是否为Promise对象
export const isPromise = o => {
	return verifyType(o, 'Promise')
}
// 判断是否为Set对象
export const isSet = o => {
	return verifyType(o, 'Set')
}
// 判断是否为Map对象
export const isMap = o => {
	return verifyType(o, 'Map')
}
// 判断是否为图片
const isImage = value => {
    let regExp = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
    return regExp.test(value)
}
// 判断是否为视频
const isVideo =  value => {
    let regExp = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i
    return regExp.test(value)
}
// userAgent对象
const ua = navigator.userAgent.toLowerCase()
// 判断是否为微信浏览器
const isWeiXin = () => {
	return ua.match(/microMessenger/i) == 'micromessenger'
}
// 判断是否为移动端
const isDeviceMobile = () => {
	return /android|webos|iphone|ipod|balckberry/i.test(ua)
}
// 判断是否为QQ浏览器
const isQQBrowser = () => {
	return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
}
// 判断是否weiios
const isIos = () => {
	let u = navigator.userAgent
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
		//安卓手机
		return false
	} else if (u.indexOf('iPhone') > -1) {
		//苹果手机
		return true
	} else if (u.indexOf('iPad') > -1) {
		//iPad
		return false
	} else if (u.indexOf('Windows Phone') > -1) {
		//winphone手机
		return false
	} else {
		return false
	}
}
// 判断是否为pc
const isPC = () => {
	let userAgentInfo = navigator.userAgent
	let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
	let flag = true
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false
			break
		}
	}
	return flag
}
// 判断是否为车牌号
const carNo = s => {
	// 新能源车牌
	const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
	// 旧车牌
	const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
	if (s.length === 7) {
		return creg.test(s)
	}
	if (s.length === 8) {
		return xreg.test(s)
	}
	return false
}
// 判断字符串是否仅包含字母
const letter = s => {
    return /^[a-zA-Z]*$/.test(s)
}

// 判断字符串是否仅包含字母与数字
const enOrNum = s => {
    const reg = /^[0-9a-zA-Z]*$/g
    return reg.test(s)
}
// 判断一个值是否为空
const empty = value => {
    switch (typeof value) {
    case 'undefined':
        return true
    case 'string':
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
        break
    case 'boolean':
        if (!value) return true
        break
    case 'number':
        if (value === 0 || isNaN(value)) return true
        break
    case 'object':
        if (value === null || value.length === 0) return true
        for (const i in value) {
            return false
        }
        return true
    }
    return false
}

// 要使用的函数需自行导出，没有用到的函数在build的会进行摇树处理

export {
	isArray,
	isString,
	isJson 
}
