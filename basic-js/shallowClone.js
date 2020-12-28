const shallowClone = src => {
    let ret = {}
    if (typeof src === 'object' && src) {
        if (Array.isArray(src)) {
            ret = []
        }

        for (const i in src) {
            if (Object.prototype.hasOwnProperty.call(src, i)) {
                ret[i] = src[i]
            }
        }

        return ret
    }

    // 非引用型 target 直接返回
    return src
}

const a = Object.create({
    name: 'quanquan',
    age: 18
})
a.selfName = 'quanquan'

const b = shallowClone(a)

console.log(a)
console.log(a.name)
console.log(b)
console.log(b === a)
