# 生成随机数

## 基础知识

- `Math.ceil(n)` 向上取整, 返回大于等于 n 的整数
- `Math.floor(n)` 向下取整, 返回 n 的整数部分
- `parseInt(n)` 向下取整, 返回 n 的整数部分
- `Math.round(n)` 四舍五入取整, 返回 n 四舍五入后的整数
- `Math.random(n)` 生成 [0, 1) 的随机数
- `Math.ceil(Math.random()*10)` 均衡获取 [1, 10] 之间的随机整数
  <details>
    <summary>代码示例详情</summary>

    ```js
    let i = 0
    let ret = []
    while(i++ < 1e9) {
      const randomNum = Math.ceil(Math.random()*10)
      if (ret[randomNum]) {
        ret[randomNum]++
      } else {
        ret[randomNum] = 1
      }
    }
    console.table(ret)
    ```
    上述代码运行的结果如下:

    node 中:
    ```txt
    ┌─────────┬───────────┐
    │ (index) │  Values   │
    ├─────────┼───────────┤
    │    1    │ 100004455 │
    │    2    │ 99992092  │
    │    3    │ 99995733  │
    │    4    │ 99989966  │
    │    5    │ 100006012 │
    │    6    │ 100004826 │
    │    7    │ 99999108  │
    │    8    │ 99994649  │
    │    9    │ 100004694 │
    │   10    │ 100008465 │
    └─────────┴───────────┘
    ```

    浏览器中:
    ```txt
    1: 100002116
    2: 99998960
    3: 100010656
    4: 99996773
    5: 100005989
    6: 99999774
    7: 99997476
    8: 100003979
    9: 99989204
    10: 99995073
    ```
  </details>

- `Math.floor(Math.random()*10)` 均衡获取 [0, 9] 的随机整数
  <details>
    <summary>代码示例详情</summary>

    ```js
    let i = 0
    let ret = []
    while(i++ < 1e9) {
      const randomNum = Math.floor(Math.random()*10)
      if (ret[randomNum]) {
        ret[randomNum]++
      } else {
        ret[randomNum] = 1
      }
    }
    console.table(ret)
    ```
    上述代码运行的结果如下:

    node 中:
    ```txt
    ┌─────────┬───────────┐
    │ (index) │  Values   │
    ├─────────┼───────────┤
    │    0    │ 100015160 │
    │    1    │ 100006201 │
    │    2    │ 99989259  │
    │    3    │ 99988278  │
    │    4    │ 100005566 │
    │    5    │ 100001095 │
    │    6    │ 100003096 │
    │    7    │ 99981274  │
    │    8    │ 100007022 │
    │    9    │ 100003049 │
    └─────────┴───────────┘
    ```

    浏览器中:
    ```txt
    0: 100006310
    1: 100000609
    2: 100001411
    3: 99998525
    4: 99991009
    5: 100001548
    6: 100004093
    7: 99989084
    8: 100013441
    9: 99993970
    ```
  </details>
- `Math.round(Math.random())` 均衡比例获取 0 或者 1
- `Math.round(Math.random()*10)` 获取 [0, 10]的随机整数, 其中获取 0 和 10的几率为获取其他值的一半.
  <details>
    <summary>详细原因, 概率一目了然</summary><br>

    随机值范围 | 得到的值
    --- | ---
    [0, 0.5) | 0
    [0.5, 1.5) | 1
    [1.5, 2.5) | 2
    [2.5, 3.5) | 3
    [3.5, 4.5) | 4
    [4.5, 5.5) | 5
    [5.5, 6.5) | 6
    [6.5, 7.5) | 7
    [7.5, 8.5) | 8
    [8.5, 9.5) | 9
    [9.5, 10) | 10
  </details>

## 生成一个 [min, max] 的随机整数

- 生成随机数肯定要用到 `Math.random() -> [0, 1)`
- 可以把一个数变成整数的方法有: `parseInt() Math.floor() Math.round() Math.ceil()`
- 这里选择功能强劲([为什么这么说呢](https://luoquanquan.github.io/note/2020/02/04/basic-js/parseInt-vs-Math-floor))的 parseInt 直接截取数字的整数部分向下取整
- 那么不难得到 `parseInt(Math.random() * 10) -> [0, 9]`
- 所以, 如果我们想要得到一个 [0, max] 的随机数只需要 `parseInt(Math.random() * (max + 1))`
- 想要得到一个 [1, max] 的随机数只需要 `parseInt(Math.random() * (max - 1 + 1)) + 1`
- 进而可得出, 想要得到一个 [min, max] 的随机数. 把括号里的 -1 和括号外的 +1 等量代换成 min `parseInt(Math.random() * (max - min + 1)) + min`

最终可以得出, 生成一个 [min, max] 的随机整数的代码为
```js
const randomNum = (min = 0, max = min) => {
  if (max === min) {
    return parseInt(Math.random() * (min + 1))
  } else {
    return parseInt(Math.random() * (max - min + 1) + min)
  }
}
```

## 生成一个 [min, max] 的长度为 len 的随机整数数组

```js
const randomNum = (min = 0, max = min) => {
  if (max === min) {
    return parseInt(Math.random() * (min + 1))
  } else {
    return parseInt(Math.random() * (max - min + 1) + min)
  }
}
const randomArr = (len, min, max) => {
  const ret = new Array(len)

  for (let i = 0; i < len; i++) {
    ret[i] = randomNum(min, max)
  }

  return ret
}
```

## 生成两个数之间的随机数(范围数字)

### 四种情况

#### [min, max]

  ```js
  const randomNum = (min, max) => {
    const range = max - min
    const random = Math.random()
    // 四舍五入, 存在最小值和最大值概率为一半的问题
    return min + Math.round(random * range)
  }
  ```

  运行结果:
  ```txt
  ┌─────────┬────────┐
  │ (index) │ Values │
  ├─────────┼────────┤
  │    0    │  487   │
  │    1    │  989   │
  │    2    │  1007  │
  │    3    │  1009  │
  │    4    │  1029  │
  │    5    │  967   │
  │    6    │  994   │
  │    7    │  1004  │
  │    8    │  980   │
  │    9    │  1044  │
  │   10    │  490   │
  └─────────┴────────┘
  ```

  通过扩大 min max 的范围并掐头去尾, 解决最大最小值概率为一半的问题
  ```js
  const randomNum = (min, max) => {
    if (min < 1) {
      throw new Error('min 不能小于 1')
    }
    min = min - 1
    max = max + 1
    const range = max - min
    const random = Math.random()
    const num = min + Math.round(random * range)
    if ([min, max].includes(num)) {
      return randomNum(min + 1, max - 1)
    } else {
      return num
    }
  }
  ```

  修改后运行结果:
  ```txt
  ┌─────────┬─────────┬──────────┐
  │ (index) │    0    │    1     │
  ├─────────┼─────────┼──────────┤
  │    1    │ 998826  │ '9.99%'  │
  │    2    │ 1000556 │ '10.01%' │
  │    3    │ 999015  │ '9.99%'  │
  │    4    │ 997972  │ '9.98%'  │
  │    5    │ 1000372 │ '10.00%' │
  │    6    │ 1000381 │ '10.00%' │
  │    7    │ 1000665 │ '10.01%' │
  │    8    │ 1001230 │ '10.01%' │
  │    9    │ 1001341 │ '10.01%' │
  │   10    │ 999642  │ '10.00%' │
  └─────────┴─────────┴──────────┘
  ```

#### [min, max)

  ```js
  const randomNum = (min, max) => {
    const range = max - min
    const random = Math.random()
    // 向下取整
    return min + Math.floor(random * range)
  }
  ```

  运行结果:
  ```txt
  ┌─────────┬─────────┬──────────┐
  │ (index) │    0    │    1     │
  ├─────────┼─────────┼──────────┤
  │    1    │ 1110540 │ '11.11%' │
  │    2    │ 1109941 │ '11.10%' │
  │    3    │ 1111700 │ '11.12%' │
  │    4    │ 1110570 │ '11.11%' │
  │    5    │ 1111081 │ '11.11%' │
  │    6    │ 1112978 │ '11.13%' │
  │    7    │ 1112090 │ '11.12%' │
  │    8    │ 1111245 │ '11.11%' │
  │    9    │ 1109855 │ '11.10%' │
  └─────────┴─────────┴──────────┘
  ```

#### (min, max]

  ```js
  const randomNum = (min, max) => {
    const range = max - min
    const random = Math.random()

    // 四舍五入存在最小值和最大值出现的概率是中间值一半的误差, 正好给他均匀过去了
    if (Math.round(range * random) === 0) {
      return max
    }

    var num = min + Math.round(random * range);
    return num;
  }
  ```

  运行结果:
  ```txt
  ┌─────────┬─────────┬──────────┐
  │ (index) │    0    │    1     │
  ├─────────┼─────────┼──────────┤
  │    2    │ 1109886 │ '11.10%' │
  │    3    │ 1110669 │ '11.11%' │
  │    4    │ 1113279 │ '11.13%' │
  │    5    │ 1111945 │ '11.12%' │
  │    6    │ 1110154 │ '11.10%' │
  │    7    │ 1111446 │ '11.11%' │
  │    8    │ 1111335 │ '11.11%' │
  │    9    │ 1111244 │ '11.11%' │
  │   10    │ 1110042 │ '11.10%' │
  └─────────┴─────────┴──────────┘
  ```

#### (min, max)

  ```js
  const randomNum = (min, max) => {
    const range = max - min
    const random = Math.random()

    var num = min + Math.round(random * range);
    // 命中最大值和最小值时直接忽略
    if ([min, max].includes(num)) {
      return randomNum(min, max)
    } else {
      return num
    }
  }
  ```

  执行结果:
  ```txt
  ┌─────────┬─────────┬──────────┐
  │ (index) │    0    │    1     │
  ├─────────┼─────────┼──────────┤
  │    2    │ 1249708 │ '12.50%' │
  │    3    │ 1248357 │ '12.48%' │
  │    4    │ 1248988 │ '12.49%' │
  │    5    │ 1251120 │ '12.51%' │
  │    6    │ 1250390 │ '12.50%' │
  │    7    │ 1252465 │ '12.52%' │
  │    8    │ 1248322 │ '12.48%' │
  │    9    │ 1250650 │ '12.51%' │
  └─────────┴─────────┴──────────┘
  ```

### PS 本系列代码的测试用例

```js
let i = 0
let ret = []
const randomNum = (min, max) => {
    const range = max - min
    const random = Math.random()
    // 四舍五入, 存在最小值和最大值概率为一半的问题
    return min + Math.floor(random * range)
  }
while(i++ < 1e7) {
  const random = randomNum(1, 10)
  if (ret[random]) {
    ret[random]++
  } else {
    ret[random] = 1
  }
}

ret = ret.map(i => [i, `${(i / 1e7 * 100).toFixed(2)}%`])
console.table(ret)
```
