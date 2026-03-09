# 快速排序

## 概念

快速排序是一种分而治之的算法, 通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列.不断重复直到所有的数据都是有序的. 即选择数组中的第一个元素作为记准元素, 数据排序围绕记准元素进行, 小于基准值的元素移动到数组的底部, 大于记准值的移动到数组的顶部.

## 代码实现

### 数据结构与算法 JavaScript 描述

首先, 判断数组的长度是否为 0, 为 0 的话直接返回不做处理. 否则, 选择第一个元素基准值, 并创建两个数组. 一个用于存放小于基准值的元素, 一个用与存放大于基准值的元素.
其次, 从第二个元素开始扫描所有元素, 根据他们和基准值的关系把他们放到合适的数组中
最后, 重复以上操作, 递归结束时, 把较小数组和较大数组拼接起来并返回
```js
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
```

### 学习JavaScript数据结构与算法

首先, 选择数组的中间元素作为基准值
其次, 创建两个下标变量, 左边的下标指像数组的第一个元素, 右边的指向数组的最后一个元素. 移动左下标直到找到第一个比基准值大的元素, 移动右下标直到找到一个比基准值小的元素, 然后交换两者的位置. 重复这个过程, 直到左下标超过了右下标. 这个过程将使得比基准元素小的元素都到基准元素前, 比他大的元素都到基准元素后. 也就是划分操作, 体现分治思想
最后, 最基准元素左边的部分元素组成的数组和右边的元素组成的数组递归重复以上操作
```js
// 划分操作
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

// 递归调用
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
```

## 示例

给定原待排数组
```js
const randomArr = [9, 10, 0, 2, 1]
```

执行的结果为
```bash
quickSort: 0.295ms
当前时间 1581610074184: debug 的数据是 quickSortedArray:  [ 0, 1, 2, 9, 10 ]
qSort: 0.631ms
当前时间 1581610074188: debug 的数据是 qSortArray:  [ 0, 1, 2, 9, 10 ]
```

目前代码在[这里](https://github.com/luoquanquan/learn-fe/commit/c8ab0c249882108f459b1facfdd9996f897325b1)

## 对比两种快排的效率

创建大数组
```js
const {swap, createRandomArr} = require('./utils')
const randomArr = createRandomArr(1e6, 0, 1e8)
```

执行结果为
```bash
quickSort: 1184.332ms
qSort: 158.277ms
```

通过以上的结论不难看出, 处理较大数据时 <<学习JavaScript数据结构与算法>> 中描述的方案优势明显

目前的代码在[这里](https://github.com/luoquanquan/learn-fe/commit/122e9683b5228456666084cfeebccd8ba1875a9c)

## 参考资料

- [数据结构与算法JavaScript描述](https://book.douban.com/subject/25945449/)
- [学习JavaScript数据结构与算法](https://book.douban.com/subject/26639401/)
