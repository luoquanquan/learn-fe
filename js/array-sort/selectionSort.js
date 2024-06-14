const {swap, createRandomArr} = require('./utils')
const randomArr = createRandomArr(10, 0, 20)

const selectionSort = array => {
    let len = array.length
    let outerIndex, innerIndex, indexMin

    for (outerIndex = 0; outerIndex < len - 1; outerIndex++) {
        indexMin = outerIndex
        for (innerIndex = outerIndex + 1; innerIndex < len; innerIndex++) {
            if (array[indexMin] > array[innerIndex]) {
                indexMin = innerIndex
            }
        }

        if (outerIndex !== indexMin) {
            swap(array, indexMin, outerIndex)
        }
    }
}


const selectionSortArray = randomArr.slice()
console.time('selectionSort')
selectionSort(selectionSortArray)
console.timeEnd('selectionSort')
