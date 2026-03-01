# 冒泡排序

> 冒泡排序算法是最慢的排序算法之一, 也是最容易实现的排序算法

## 概念

冒泡排序之所以叫冒泡排序是因为使用这种排序算法排序时, 数据会像气泡一样从数组的一端飘到另一端. 假设正在将一组数字按照升序排列, 较大的值会浮动到数组的右侧, 而较小的值则会浮动到数组的左侧.

示例, 给定原待排数组
```js
const randomArr = [9, 10, 0, 2, 1]
```

## 初始的冒泡排序

冒泡排序比较任何两个相邻的项, 如果第一个比第二个大, 则交换他们. 元素项向上移动到正确的顺序,就好像气泡升至表面一样, 冒泡排序因此得名.

根据上述的概念, 推断冒泡排序的代码实现为
```javascript
const bubbleSort = array => {
    const len = array.length

    for (let outerIndex = 0; outerIndex < len; outerIndex++) {
        for (let innerIndex = 0; innerIndex < len - 1; innerIndex++) {
            if (array[innerIndex] < array[innerIndex + 1]) {
                // 交换两项的数据
                swap(array, innerIndex, innerIndex + 1)
            }
        }
    }
}
```

经过冒泡排序执行的过程为
```bash
[ 9, 0, 2, 1, 10 ]
[ 0, 2, 1, 9, 10 ]
[ 0, 1, 2, 9, 10 ]
[ 0, 1, 2, 9, 10 ]
[ 0, 1, 2, 9, 10 ]
```

详细的对比过程为
```bash
9 10
10 0
10 2
10 1
[ 9, 0, 2, 1, 10 ]
9 0
9 2
9 1
9 10
[ 0, 2, 1, 9, 10 ]
0 2
2 1
2 9
9 10
[ 0, 1, 2, 9, 10 ]
0 1
1 2
2 9
9 10
[ 0, 1, 2, 9, 10 ]
0 1
1 2
2 9
9 10
[ 0, 1, 2, 9, 10 ]
```

最终执行的结果为
```bash
[ 0, 1, 2, 9, 10 ]
```

本步骤中的代码在[这里](https://github.com/luoquanquan/learn-fe/commit/c315a8ff1b50d1f7a1a56f78963c75d810c5ab71)

## 改进的冒泡排序

> 在初始的冒泡排序中 9 和 10 两个数字已经比较过, 但是后续的每轮循环都会再重新[比较一次](https://github.com/luoquanquan/learn-fe/commit/67a9d05171a5bd58c43f324e80437cde50409001). 然而这是没必要的...

如果内循环的时候减去外循环已经跑过的轮数(也就是已经确定了位置的数据的个数), 就能避免内循环里的没有必要的比较了~

改进后的代码
```js
const modifiedBubbleSort = array => {
    const len = array.length

    for (let outerIndex = 0; outerIndex < len; outerIndex++) {
        for (let innerIndex = 0; innerIndex < len - 1 - outerIndex; innerIndex++) {
            console.log(array[innerIndex], array[innerIndex + 1])
            if (array[innerIndex] > array[innerIndex + 1]) {
                // 交换两项的数据
                swap(array, innerIndex, innerIndex + 1)
            }
        }
        console.log(array)
    }
}
```

改进后的执行过程为
```bash
[ 9, 0, 2, 1, 10 ]
[ 0, 2, 1, 9, 10 ]
[ 0, 1, 2, 9, 10 ]
[ 0, 1, 2, 9, 10 ]
[ 0, 1, 2, 9, 10 ]
```

详细的对比过程为
```bash
9 10
10 0
10 2
10 1
[ 9, 0, 2, 1, 10 ]
9 0
9 2
9 1
[ 0, 2, 1, 9, 10 ]
0 2
2 1
[ 0, 1, 2, 9, 10 ]
0 1
[ 0, 1, 2, 9, 10 ]
[ 0, 1, 2, 9, 10 ]
```

可以发现, 对比的次数随着外层循环的执行而递减.

## 对比两种冒泡排序

删除除计时以外的 console 启用创建随机数组方法创建一个大数组, 用两种冒泡排序分别处理大数组得到的结果为:

```bash
bubbleSort: 379.321ms
modifiedBubbleSort: 238.535ms
```

综上可知, 改进后的冒泡排序性能提升比较明显, [对比代码](https://github.com/luoquanquan/learn-fe/commit/8f5c38cfd997afcf84e2cf4343d629a5c8d2d638)
