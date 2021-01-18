// 使用递归实现多数求和
function sum (...numbers) {
    if (numbers.length === 0) {
        return 0
    }

    if (numbers.length === 1) {
        return numbers[0]
    }

    const [first, ...rest] = numbers

    // 此时的 rest 是一个数组需要展开
    return first + sum(...rest)
}

console.log(`当前时间 ${Date.now()}: debug 的数据是 sum(1, 2, 3, 4, 5, 6): `, sum(1, 2, 3, 4, 5, 6))
