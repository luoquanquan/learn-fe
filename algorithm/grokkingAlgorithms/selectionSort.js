// 选择排序
const chooseSmallEle = arr => {
    let smallIdx = 0

    arr.forEach((i, idx) => {
        if (i < arr[smallIdx]) {
            smallIdx = idx
        }
    })

    return smallIdx
}

const selectionSort = arr => {
    const ret = []
    while (arr.length) {
        const smallIdx = chooseSmallEle(arr)
        const newSamllEle = arr.splice(smallIdx, 1)[0]
        ret.push(newSamllEle)
    }

    return ret
}

const originArr = [9, 8, 2, 900, 5, 1, 6, 3, 4]
const sortedArr = selectionSort(originArr)

console.log(sortedArr)
