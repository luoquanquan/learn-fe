const isObject = obj => (typeof obj === 'object' && obj) || typeof obj === 'function'

const deepClone = (src, weekSet = new WeakSet()) => {
    if (weekSet.has(src)) return src
    if (!isObject(src)) return src

    weekSet.add(src)
    const ret = Array.isArray(src) ? [] : {}
    for (const i in src) {
        if (Object.prototype.hasOwnProperty.call(src, i)) {
            ret[i] = deepClone(src[i], weekSet)
        }
    }

    return ret
}
const a = {}
const b = {
    name: 'quanquan',
    age: 18,
    sport: ['run', 'swim'],
    fans: a
}
a.idol = b

const c = deepClone(b)
console.log(c)

// c.sport === b.sport => false 说明本次拷贝为深拷贝
console.log(c.sport === b.sport)
