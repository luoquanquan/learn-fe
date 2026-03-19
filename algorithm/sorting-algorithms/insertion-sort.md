# 插入排序

## 概念

插入排序每次排序一个数组项，假定第一项已经排序好了。依次向后扫描所有元素，比如到第二项时，和已经排序好的部分比较，看看放到哪里合适，由于此时只有第一项已经排序好了，就是看看放在第一项的左边还是右边。第三项和前两项比较，找到它合适的位置，以此类推⋯⋯

## 代码实现

```js
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
```

## 示例

给定原待排数组
```js
const randomArr = [9, 10, 0, 2, 1]
```

选择排序执行的步骤为
```bash
当前排序好的队伍 9
当前排序好的队伍 9,10
当前排序好的队伍 0,9,10
当前排序好的队伍 0,2,9,10
insertionSort: 3.984ms
[ 0, 1, 2, 9, 10 ]
```

插入排序的代码在[这里](https://github.com/luoquanquan/learn-fe/commit/3ed8aaded65a371d014a5cbe5b162e0d0cf480ba)
