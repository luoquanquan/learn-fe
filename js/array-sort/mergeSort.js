const { createRandomArr } = require('./utils')
const randomArr = createRandomArr(1e6, 0, 1e8)

const merge = (left, right) => {
    const ret = []
    let il = 0
    let ir = 0

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            ret.push(left[il++])
        } else {
            ret.push(right[ir++])
        }
    }

    while (il < left.length) {
        ret.push(left[il++])
    }

    while (ir < right.length) {
        ret.push(right[ir++])
    }

    return ret
}

const mergeSort = array => {
    const len = array.length

    if (len <= 1) {
        return array
    }

    const mid = Math.floor(len / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid, len)

    return merge(mergeSort(left), mergeSort(right))
}

let mergeSortArray = randomArr.slice()
console.time('mergeSort')
mergeSortArray = mergeSort(mergeSortArray)
console.timeEnd('mergeSort')


