const { swap } = require('./utils')
const randomArr = [0, 10, 9, 2, 1]


const quickSort = array => {
    const len = array.length
    if (len === 0) {
        return []
    }

    const left = []
    const right = []
    const pivot = array[0]

    for (let idx = 1; idx < len; idx++) {
        const curItem = array[idx]
        if (curItem < pivot) {
            left.push(curItem)
        } else {
            right.push(curItem)
        }
    }

    return quickSort(left).concat(pivot, quickSort(right))
}

const quickSortArray = randomArr.slice()
console.time('quickSort')
const quickSortedArray = quickSort(quickSortArray)
console.timeEnd('quickSort')
console.log(`当前时间 ${Date.now()}: debug 的数据是 quickSortedArray: `, quickSortedArray)

const partition = (array, left, right) => {
    const pivot = array[Math.floor((left + right) / 2)]
    let i = left, j = right

    while (i <= j) {
        while (array[i] < pivot) {
            i++
        }

        while (array[j] > pivot) {
            j--
        }
        if (i <= j) {
            swap(array, i, j)
            i++
            j--
        }
    }
    return i
}

const qSort = (array, left = 0, right = array.length - 1) => {
    if (array.length > 1) {
        const index = partition(array, left, right)

        if (left < index - 1) {
            qSort(array, left, index - 1)
        }

        if (index < right) {
            qSort(array, index, right)
        }
    }
}

const qSortArray = randomArr.slice()
console.time('qSort')
qSort(qSortArray)
console.timeEnd('qSort')
console.log(`当前时间 ${Date.now()}: debug 的数据是 qSortArray: `, qSortArray)
