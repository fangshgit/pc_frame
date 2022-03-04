// 深度克隆
const  deepClone = obj => {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj
    if (typeof obj !== 'object' && typeof obj !== 'function') {
        // 原始类型直接返回
        return obj
    }
    const o = test.array(obj) ? [] : {}
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
        }
    }
    return o
}

// JS对象深度合并
const deepMerge = (target = {}, source = {}) => {
    target = deepClone(target)
    if (typeof target !== 'object' || typeof source !== 'object') return false
    for (const prop in source) {
        if (!source.hasOwnProperty(prop)) continue
        if (prop in target) {
            if (typeof target[prop] !== 'object') {
                target[prop] = source[prop]
            } else if (typeof source[prop] !== 'object') {
                target[prop] = source[prop]
            } else if (target[prop].concat && source[prop].concat) {
                target[prop] = target[prop].concat(source[prop])
            } else {
                target[prop] = deepMerge(target[prop], source[prop])
            }
        } else {
            target[prop] = source[prop]
        }
    }
    return target
}
// 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式，来自uview-ui的源码
// 解决了在vue的template中，调用一个可能不存在的对象深层次的属性会报错的问题，如直接在template中使用a.b.c.d的写法，当b不存在时，就会报错
const getProperty = (obj, key) => {
    if (!obj) {
        return
    }
    if (typeof key !== 'string' || key === '') {
        return ''
    } if (key.indexOf('.') !== -1) {
        const keys = key.split('.')
        let firstObj = obj[keys[0]] || {}

        for (let i = 1; i < keys.length; i++) {
            if (firstObj) {
                firstObj = firstObj[keys[i]]
            }
        }
        return firstObj
    }
    return obj[key]
}
// 要使用的函数需自行导出，没有用到的函数在build的会进行摇树处理
export {}