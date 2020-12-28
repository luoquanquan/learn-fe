const myArr = [1, 2, 3, 4, 5, 6, 8]

// 循环式的二分法写法
const binarySearch = (arr, item) => {
    let low = 0
    let high = arr.length

    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        const guess = arr[mid]

        if (guess > item) {
            high = mid - 1
        } else if (guess < item) {
            low = mid + 1
        } else {
            return mid
        }
    }

    return -1
}

console.log(binarySearch(myArr, 3))

// 递归式的二分法写法
const binarySearch2 = (arr, item, low = 0, high = arr.length) => {
    if (low > high) {
        return -1
    }

    const mid = Math.floor((low + high) / 2)
    const guess = arr[mid]
    if (guess > item) {
        high = mid - 1
    } else if (guess < item) {
        low = mid + 1
    } else {
        return mid
    }

    return binarySearch2(arr, item, low, high)
}

console.log(binarySearch2(myArr, 0))
