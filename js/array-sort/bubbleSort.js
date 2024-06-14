const {swap, createRandomArr} = require('./utils')
const randomArr = createRandomArr(1e4, 0, 1e8)


const bubbleSort = array => {
    const len = array.length

    for (let outerIndex = 0; outerIndex < len; outerIndex++) {
        for (let innerIndex = 0; innerIndex < len - 1; innerIndex++) {
            if (array[innerIndex] > array[innerIndex + 1]) {
                swap(array, innerIndex, innerIndex + 1)
            }
        }
    }
}

const bubbleSortArray = randomArr.slice()
console.time('bubbleSort')
bubbleSort(bubbleSortArray)
console.timeEnd('bubbleSort')

const modifiedBubbleSort = array => {
    const len = array.length

    for (let outerIndex = 0; outerIndex < len; outerIndex++) {
        for (let innerIndex = 0; innerIndex < len - 1 - outerIndex; innerIndex++) {
            if (array[innerIndex] > array[innerIndex + 1]) {
                swap(array, innerIndex, innerIndex + 1)
            }
        }
    }
}

const modifiedBubbleSortArray = randomArr.slice()
console.time('modifiedBubbleSort')
modifiedBubbleSort(modifiedBubbleSortArray)
console.timeEnd('modifiedBubbleSort')


