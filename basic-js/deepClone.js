const isObject = obj => (typeof obj === 'object' && obj) || typeof obj === 'function'

const deepClone = src => {
    if (!isObject(src)) return src

    const ret = Array.isArray(src) ? [] : {}
    for (const i in src) {
        if (Object.prototype.hasOwnProperty.call(src, i)) {
            ret[i] = deepClone(src[i])
        }
    }

    return ret
}

const b = {
    name: 'quanquan',
    age: 18,
    sport: ['run', 'swim']
}

const c = deepClone(b)
console.log(c)

// c.sport === b.sport => false 说明本次拷贝为深拷贝
console.log(c.sport === b.sport)
