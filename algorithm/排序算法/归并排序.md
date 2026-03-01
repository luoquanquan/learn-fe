# 归并排序

## 概念

归并排序是一种分治算法, 其思想就是将原始数组切分成较小的数组, 直到每个数组只有一个元素. 接着将小数组归并成较大的数组, 直到最后只有一个排序完成的大数组...

## 代码实现

```js
// 将小数组合并成大数组
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

// 将大数组拆分成小数组
const mergeSort = array => {
    const len = array.length

    if (len <= 1) {
        return array
    }

    const mid = Math.floor(len / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid, len)

    console.log(left, right)
    return merge(mergeSort(left), mergeSort(right))
}
```

## 示例

给定原待排数组
```js
const randomArr = [9, 10, 0, 2, 1]
```

选择排序执行的步骤为
```bash
# 拆分过程
[ 9, 10 ] [ 0, 2, 1 ]
[ 9 ] [ 10 ]
[ 0 ] [ 2, 1 ]
[ 2 ] [ 1 ]

# 合并的过程
[ 9, 10 ]
[ 1, 2 ]
[ 0, 1, 2 ]
[ 0, 1, 2, 9, 10 ]
```

归并排序的代码在[这里](https://github.com/luoquanquan/learn-fe/commit/13fa54944846254d6defb2c5cc1d0bc95a768320)
