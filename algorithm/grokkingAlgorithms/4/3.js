function findMax (...args) {
    // 如果数组中只有两个
    if (args.length === 2) {
        return Math.max(...args)
    }

    args.shift()
    const max = findMax(...args)
    return Math.max(max, args[0])
}

console.log(`当前时间 ${Date.now()}: debug 的数据是 findMax(1,2,6,7,3,5,9,19,5,3,2,5): `, findMax(1, 2, 6, 7, 3, 5, 9, 19, 5, 3, 2, 5))
