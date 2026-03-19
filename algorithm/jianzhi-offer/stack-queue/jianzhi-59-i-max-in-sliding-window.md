# 59 - I. 滑动窗口的最大值

## 题目描述

给定一个数组 `nums` 和滑动窗口的大小 k, 请找出滑动窗口里的最大值。

示例：
```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7]
解释:

  滑动窗口的位置                最大值
-------------------------     -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

输出: [3, 3, 5, 5, 6, 7]
```

## 解题方案

### 解题思路

这个题的意思大概就是搞一个指定长度的数组，从左往右跑然后每跑一步就取一个当前数组中的最大值出来。

![](http://handle-note-img.niubishanshan.top/20221026-231648.gif)

### 算法流程

- 初始化滑动窗口的 left 和 right 位置，从 [1 - k, 0] 开始
- 如果 left > 0 说明窗口已经在数组中，并且单调队列的第一个元素和 nums[left - 1] 相等时，说明元素已经不再滑动窗口中了需要移除
- 如果单调队列不为空且最后一个元素小于新加入的 nums\[right\] 元素，则需要维护单调队列为递减状态，所以将最后一个元素移除，直到其大于新加入元素
- 将新加入的 nums\[right\] 元素加入单调队列，因为上一步的操作，当前单调队列一定是递减的
- 如果 left >= 0, 说明窗口在数组中，因为单调队列递减，所以第一个元素一定是当前滑动窗口最大值

PS: 这个单调队列可以类比成生活中的插队

一大哥来排队，看见最后一个人是弱鸡，就直接插他前面。以此类推，这位大哥刚好站在他打不过的人后边。当然有个前提，所有来排队的人都是这种恃强凌弱的方式排队。

这窗口又是怎么回事呢？

窗口右边是刚来排队的人，窗口左边是刚走的人，这人可能是刚办好事，也可能是当前排队的大哥都打不过。最后把办过事的人的列表输出。

## 代码

```js
const maxSlidingWindow = function (nums, k) {
    const ret = [];
    const slidingWindow = [];

    for (let left = 1 - k, right = 0; right < nums.length; left++, right++) {
        if (left > 0 && slidingWindow[0] == nums[left - 1]) {
            slidingWindow.shift();
        }

        while (slidingWindow.length != 0 && slidingWindow[slidingWindow.length - 1] < nums[right]) {
            slidingWindow.pop();
        }

        slidingWindow.push(nums[right]);

        if (left >= 0) {
            ret[left] = slidingWindow[0];
        }
    }
    return ret;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
```
