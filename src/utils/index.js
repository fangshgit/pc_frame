// 乘
const accMul = (arg1, arg2) => {
	let m = 0
	m += deal(arg1)
	m += deal(arg2)
	let r1 = Number(arg1.toString().replace('.', ''))
	let r2 = Number(arg2.toString().replace('.', ''))
	return (r1 * r2) / Math.pow(10, m)
}
// 求小数点后的数据长度
const deal = arg => {
	let t = 0
	try {
		t = arg.toString().split('.')[1].length
	} catch (e) {}
	return t
}
// 除
const accDiv = (arg1, arg2) => {
	let t1 = deal(arg1)
	let t2 = deal(arg2)
	let r1 = Number(arg1.toString().replace('.', ''))
	let r2 = Number(arg2.toString().replace('.', ''))
	return (r1 / r2) * Math.pow(10, t2 - t1)
}
// 加
const accAdd = (arg1, arg2) => {
	let r1 = deal(arg1)
	let r2 = deal(arg2)
	let m = Math.pow(10, Math.max(r1, r2))
	return (arg1 * m + arg2 * m) / m
}
/**
 * 金额大于1万的，加上单位
 * 可选保留小数点后多少位，不作四舍五入
 * @param money
 * @param length
 * @returns {String}
 */
const addMoneyUnit = (money, length = 1) => {
	if (money < 10000) {
		return money
	} else {
		money = accDiv(parseInt(money), 10000)
		let xsd = money.toString().split('.')
		if (xsd.length > 1) {
			money = `${xsd[0]}.${xsd[1].substr(0, length)}`
		}
		return money + 'w'
	}
}
/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
const debounce = (fn, t) => {
	let delay = t || 500
	let timer
	// console.log(fn)
	// console.log(typeof fn)
	return function() {
		let args = arguments
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			timer = null
			fn.apply(this, args)
		}, delay)
	}
}
/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
const throttle = (fn, t) => {
	let last
	let timer
	let interval = t || 500
	return function() {
		let args = arguments
		let now = +new Date()
		if (last && now - last < interval) {
			clearTimeout(timer)
			timer = setTimeout(() => {
				last = now
				fn.apply(this, args)
			}, interval)
		} else {
			last = now
			fn.apply(this, args)
		}
	}
}
// 获取url参数
const getQueryString = key => {
	const queryNameRegex = new RegExp(`[?&]${key}=([^&]*)(?:&|$)`)
	const queryNameMatch = window.location.hash.match(queryNameRegex)
	return queryNameMatch ? queryNameMatch[1] : null
}
// 根据url下载
const download = url => {
	let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
	let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1
	if (isChrome || isSafari) {
		let link = document.createElement('a')
		link.href = url
		if (link.download !== undefined) {
			let fileName = url.substring(url.lastIndexOf('/') + 1, url.length)
			link.download = fileName
		}
		if (document.createEvent) {
			let e = document.createEvent('MouseEvents')
			e.initEvent('click', true, true)
			link.dispatchEvent(e)
			return true
		}
	}
	if (url.indexOf('?') === -1) {
		url += '?download'
	}
	window.open(url, '_self')
	return true
}
// 数字转中文大写
const numberToChinese = num => {
	let AA = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
	let BB = new Array('', '十', '百', '仟', '萬', '億', '点', '')
	let a = ('' + num).replace(/(^0*)/g, '').split('.'),
		k = 0,
		re = ''
	for (let i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
			case 0:
				re = BB[7] + re
				break
			case 4:
				if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$').test(a[0])) re = BB[4] + re
				break
			case 8:
				re = BB[5] + re
				BB[7] = BB[5]
				k = 0
				break
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re
		if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re
		k++
	}
	if (a.length > 1) {
		// 加上小数部分(如果有小数部分)
		re += BB[6]
		for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)]
	}
	if (re == '一十') re = '十'
	if (re.match(/^一/) && re.length == 3) re = re.replace('一', '')
	return re
}
// 金额转中文大写
const changeToChinese = Num => {
	//判断如果传递进来的不是字符的话转换为字符
	if (typeof Num == 'number') {
		Num = new String(Num)
	}
	Num = Num.replace(/,/g, '') //替换tomoney()中的“,”
	Num = Num.replace(/ /g, '') //替换tomoney()中的空格
	Num = Num.replace(/￥/g, '') //替换掉可能出现的￥字符
	if (isNaN(Num)) {
		//验证输入的字符是否为数字
		//alert("请检查小写金额是否正确");
		return ''
	}
	//字符处理完毕后开始转换，采用前后两部分分别转换
	let part = String(Num).split('.')
	let newchar = ''
	//小数点前进行转化
	for (let i = part[0].length - 1; i >= 0; i--) {
		if (part[0].length > 10) {
			return ''
			//若数量超过拾亿单位，提示
		}
		let tmpnewchar = ''
		let perchar = part[0].charAt(i)
		switch (perchar) {
			case '0':
				tmpnewchar = '零' + tmpnewchar
				break
			case '1':
				tmpnewchar = '壹' + tmpnewchar
				break
			case '2':
				tmpnewchar = '贰' + tmpnewchar
				break
			case '3':
				tmpnewchar = '叁' + tmpnewchar
				break
			case '4':
				tmpnewchar = '肆' + tmpnewchar
				break
			case '5':
				tmpnewchar = '伍' + tmpnewchar
				break
			case '6':
				tmpnewchar = '陆' + tmpnewchar
				break
			case '7':
				tmpnewchar = '柒' + tmpnewchar
				break
			case '8':
				tmpnewchar = '捌' + tmpnewchar
				break
			case '9':
				tmpnewchar = '玖' + tmpnewchar
				break
		}
		switch (part[0].length - i - 1) {
			case 0:
				tmpnewchar = tmpnewchar + '元'
				break
			case 1:
				if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
				break
			case 2:
				if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
				break
			case 3:
				if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
				break
			case 4:
				tmpnewchar = tmpnewchar + '万'
				break
			case 5:
				if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
				break
			case 6:
				if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
				break
			case 7:
				if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
				break
			case 8:
				tmpnewchar = tmpnewchar + '亿'
				break
			case 9:
				tmpnewchar = tmpnewchar + '拾'
				break
		}
		let newchar = tmpnewchar + newchar
	}
	//小数点之后进行转化
	if (Num.indexOf('.') != -1) {
		if (part[1].length > 2) {
			// alert("小数点之后只能保留两位,系统将自动截断");
			part[1] = part[1].substr(0, 2)
		}
		for (i = 0; i < part[1].length; i++) {
			tmpnewchar = ''
			perchar = part[1].charAt(i)
			switch (perchar) {
				case '0':
					tmpnewchar = '零' + tmpnewchar
					break
				case '1':
					tmpnewchar = '壹' + tmpnewchar
					break
				case '2':
					tmpnewchar = '贰' + tmpnewchar
					break
				case '3':
					tmpnewchar = '叁' + tmpnewchar
					break
				case '4':
					tmpnewchar = '肆' + tmpnewchar
					break
				case '5':
					tmpnewchar = '伍' + tmpnewchar
					break
				case '6':
					tmpnewchar = '陆' + tmpnewchar
					break
				case '7':
					tmpnewchar = '柒' + tmpnewchar
					break
				case '8':
					tmpnewchar = '捌' + tmpnewchar
					break
				case '9':
					tmpnewchar = '玖' + tmpnewchar
					break
			}
			if (i == 0) tmpnewchar = tmpnewchar + '角'
			if (i == 1) tmpnewchar = tmpnewchar + '分'
			newchar = newchar + tmpnewchar
		}
	}
	//替换所有无用汉字
	while (newchar.search('零零') != -1) newchar = newchar.replace('零零', '零')
	newchar = newchar.replace('零亿', '亿')
	newchar = newchar.replace('亿万', '亿')
	newchar = newchar.replace('零万', '万')
	newchar = newchar.replace('零元', '元')
	newchar = newchar.replace('零角', '')
	newchar = newchar.replace('零分', '')
	if (newchar.charAt(newchar.length - 1) == '元') {
		newchar = newchar + '整'
	}
	return newchar
}
/**
 * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
 * v-for的时候,推荐使用后端返回的id而不是循环的index
 * @param {Number} len uuid的长度
 * @param {Boolean} firstI 将返回的首字母置为"i"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid(len = 32, firstI = true, radix = null) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    radix = radix || chars.length

    if (len) {
        // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
        for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        let r
        // rfc4122标准要求返回的uuid中,某些位为固定的字符
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }
    // 移除第一个字符,并用i替代,因为第一个字符为数值时,该guuid不能用作id或者class
    if (firstI) {
        uuid.shift()
        return `i${uuid.join('')}`
    }
    return uuid.join('')
}

export  {
	accMul,
	accDiv,
	accAdd,
	debounce,
	throttle
}
