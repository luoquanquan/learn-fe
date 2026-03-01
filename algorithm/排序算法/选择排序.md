# 选择排序

## 概念

选择排序是一种原址比较的排序的算法. 从数组的开头开始和其他元素比较. 找到最小的数放到第一位, 接着找到第二小的数放到第二位. 以此类推, 直到移动到数组的倒数第二个位置时说明当前数组已经对比完毕. 完成排序.

## 程序流程

选择排序用到了嵌套循环, 外循环从数组的第一个元素开始移动到数组的倒数第二个元素. 内循环从当前外循环指定元素的下一个元素开始移动到数组的最后一个元素, 查找比当前外层循环指定的元素更小的元素. 这样就能保证每次内循环结束后都能保证循环期间遇到的最小值到达合适的位置.

## 代码实现

```js
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
```

## 示例

给定原待排数组
```js
const randomArr = [9, 10, 0, 2, 1]
```

选择排序执行的步骤为
```bash
[ 0, 10, 9, 2, 1 ]
[ 0, 1, 10, 9, 2 ]
[ 0, 1, 2, 10, 9 ]
[ 0, 1, 2, 9, 10 ]
```

上边的例子就很典型啦[代码地址](https://github.com/luoquanquan/learn-fe/commit/f10b339d9f9ae082adc4bdf96ab20c132a586e4f)
