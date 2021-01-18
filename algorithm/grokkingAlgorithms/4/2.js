function count (...args) {
    if (!args.length) {
        return 0
    }

    args.shift()
    return 1 + count(...args)
}

console.log(`当前时间 ${Date.now()}: debug 的数据是 count(1,2,3,4,5,6): `, count(1, 2, 3, 4, 5, 6))
