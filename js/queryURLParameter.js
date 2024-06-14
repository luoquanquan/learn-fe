let url = 'https://www.baidu.com/s?wd=前端开发&tn=baiduhome_pg&test=23&rsv_enter=1'

// 使用字符串分割方式
const queryURLParameter1 = url => {
    const obj = {}
    if (!url.includes('?')) return obj
    url = url.split('?')[1]

    const paramArr = url.split('&')
    paramArr.forEach(param => {
        const [k, v] = param.split('=')
        obj[k] = v
    })

    return obj
}

console.log(queryURLParameter1(url))

// 使用正则捕获
const queryURLParameter2 = url => {
    const obj = {}
    const reg = /([^?=&]*)=([^&]*)/g

    url.replace(reg, (...args) => {
        const [, k, v] = args
        obj[k] = v
    })

    return obj
}

console.log(queryURLParameter2(url))
