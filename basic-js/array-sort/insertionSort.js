const { createRandomArr } = require('./utils')
const randomArr = [9, 10, 0, 2, 1]

const insertionSort = array => {
    const len = array.length
    let outerIndex, innerIndex, temp

    for (outerIndex = 1; outerIndex < len; outerIndex++) {
        temp = array[outerIndex]  // 待排元素
        innerIndex = outerIndex - 1 // 已经排好的队伍
        console.log(`当前排序好的队伍 ${array.slice(0, outerIndex)}`)
        // 拿当前的待排元素到已经排好的队伍里边找他合适的位置
        while (innerIndex >= 0 && array[innerIndex] > temp) {
            array[innerIndex + 1] = array[innerIndex]
            --innerIndex
        }
        array[innerIndex + 1] = temp
    }
}


const insertionSortArray = randomArr.slice()
console.time('insertionSort')
insertionSort(insertionSortArray)
console.timeEnd('insertionSort')
console.log(insertionSortArray)

