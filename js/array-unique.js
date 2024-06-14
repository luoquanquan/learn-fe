const origin = [1, 2, 3, 4, 2, 6, 1]

const renderResult = (origin, unique) => {
    console.log(`方法 ${unique.name}: `)
    console.table({ origin, uniqueed: unique(origin) })
    console.log('\n\n')
}

// 第一种, 最古老的方法
const unique = arr => {
    const ret = []
    let repeat = false

    for (let i = 0, len = arr.length; i < len; i++) {
        repeat = false

        for (let j = 0, length = ret.length; j < length; j++) {
            if (ret[j] === arr[i]) {
                repeat = true
                break
            }
        }

        if (!repeat) {
            ret.push(arr[i])
        }
    }

    return ret
}

renderResult(origin, unique)

const unique2 = arr => {
    const ret = []
    arr = arr.slice().sort()

    for (let i = 0, len = arr.length; i < len; i++) {
        const curItem = arr[i]
        if (curItem !== ret[ret.length - 1]) {
            ret.push(curItem)
        }
    }

    return ret
}

renderResult(origin, unique2)

// 当数字作为 object 的属性时会被转为字符串, 所以这个方法只能用于
// 单一类型元素的素组, 不能既包含数字又包含其他类型
const unique3 = arr => {
    const obj = {}
    const ret = []

    for (let i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = null
    }

    for (const j in obj) {
        // 数字类型的数组去重需要强转会数字
        ret.push(Number(j))
        // 字符串类型的数组
        // ret.push(j)
    }

    return ret
}

renderResult(origin, unique3)

const unique4 = arr => {
    const obj = {}
    const ret = []

    for (let i = 0, len = arr.length; i < len; i++) {
        const curItem = arr[i]
        if (!obj[curItem]) {
            obj[curItem] = 1
            ret.push(curItem)
        }
    }

    return ret
}

renderResult(origin, unique4)

const unique5 = arr => {
    const ret = arr.slice()
    let len = ret.length

    for (let i = 0; i < len; i++) {
        const curItem = ret[i]
        for (let j = i + 1; j < len; j++) {
            if (curItem === ret[j]) {
                ret.splice(j, 1)
                len--
                j--
            }
        }
    }

    return ret
}

renderResult(origin, unique5)

const unique6 = arr => {
    const ret = arr.slice().sort((a, b) => a - b)

    const loop = idx => {
        if(idx === 0) {
            return ret
        }

        if (ret[idx] === ret[--idx]) {
            ret.splice(idx, 1)
        }

        return loop(idx)
    }

    return loop(ret.length)
}

renderResult(origin, unique6)

const unique7 = arr => {
    const ret = []

    // forEach 结合 indexOf
    // map filter... 可以作为遍历方法
    // includes find findIndex 可以作为筛选方法可以有很多变种
    arr.forEach(item => {
        if(ret.indexOf(item) === -1) {
            ret.push(item)
        }
    })

    return ret
}

renderResult(origin, unique7)

const unique8 = arr => {
    return arr.reduce(
        (prev, current) => prev.includes(current) ? prev : [...prev, current],
        []
    )
}

renderResult(origin, unique8)

const unique9 = arr => {
    return [...new Set(arr)]
}

renderResult(origin, unique9)
