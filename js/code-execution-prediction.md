## 推断以下代码执行的结果

```js
var foo = 1
function bar() {
    if (!foo) {
        var foo = 10
    }
    console.log(foo)
}
bar()
```

以上代码执行的步骤为
- 变量提升
- 代码自上而下执行
- 函数调用
  - 形参赋值
  - 变量提升，var foo; 提升到函数作用域的顶端
  - 代码自上而下执行
由于代码执行到 if 判断时 foo 已经被声明默认值为 undefined 所以 ！foo => true 最终打印的结果就是 10

## 推断以下代码执行的结果

```js
var n = 0
function a() {
    var n = 10
    function b() {
        n++
        console.log(n)
    }
    b()
    return b
}

var c = a()
c()

console.log(n)
```

以上代码执行的步骤为
- 变量提升
- var n; var c; function a; a = AAAFFF111(内存地址)
- 代码由上向下执行
- n = 0
- c = a() 创建私有作用域
  - 形参赋值 - 无
  - 私有作用域变量提升
  - var n; function b; b = BBBFFF111; n = 10;
  - b() 创建私有作用
    - 形参赋值 - 无
    - 私有作用域变量提升 - 无
    - 代码由上向下执行
    - 私有变量没有 n 变量 -> 查找父级作用域 n = 10 n++ => n = 11
    - console.log(n) => 11
  - 返回 b = BBBFFF111 引用赋值给 c 堆内存不得销毁
- c() => b() => BBBFFF111() 创建私有作用
  - 形参赋值 - 无
  - 私有作用域变量提升 - 无
  - 代码由上向下执行
  - 私有变量没有 n 变量 -> 查找父级作用域 n = 11 n++ => n = 12
  - console.log(n) => 12
- console.log(n) => 0

经过以上的分析，本例最终打印的结果为 11, 12, 0

## 推断以下代码执行的结果

```js
var a = 10, b = 11, c = 12
function test(a) {
    a = 1
    var b = 2
    c = 3
}

test(10)
console.log(a)
console.log(b)
console.log(c)
```

以上代码执行的步骤为
- 变量提升 var a, b, c; text = AAAFFF111; a = 10; b = 11; c = 12
- 代码自上而下执行
- test(10) 创建私有作用域
  - 形参赋值 a = 10
  - 变量提升 var b
  - 代码自上而下执行
  - a = 1
  - b = 2
  - c = 3 => 私有作用域中没有定义 c, 从全局作用域中找到 c 并赋值
- console.log(a) => 10
- console.log(b) => 11
- console.log(c) => 3
最终执行的结果为 10, 11, 3

## 推断以下代码执行的结果

```js
if(!('a' in window)) {
    var a = 1
}
console.log(a) // 输出 undefined
```

以上代码考核的点有两个：
- 变量提升，不管条件是否满足都会提升
- 非严格模式下，在全局作用域创建的变量(使用 var)将会作为 window 的属性
  - 编译阶段 var a; 提升到全局
  - 执行阶段 window.a = undefined

## 推断以下代码执行的结果

```js
function fn(a) {
    // 形参赋值 a = 10
    console.log(a)
    console.log(arguments[0])

    arguments[0] = 100
    console.log(a)
    a = 1000
    console.log(arguments[0])
}

fn(10)
```

以上代码考核的点为：
在非严格模式下，函数的实参集合与形参变量存在 "映射"关系，不管其中一方谁改变了，另外一个都会跟着改变。
严格模式下，两者之间的映射关系会被切断，相互之间不会影响

所以以上代码执行的结果为 10, 10, 100, 1000

## 推断以下代码执行的结果

```js
var a = 4
function b(x, y, a) {
    // 私有作用域 x = 1; y = 2, a = 3
    console.log(a) // 3
    arguments[2] = 10 // 映射关系
    console.log(a) // 10
}
a = b(1, 2, 3) // => undefined
console.log(a)
```

以上代码考察的点为，函数没有显式的返回值时默认的返回值是 undefined

所以执行的结果为 3, 10, undefined

## && vs ||

- 在条件判断中
  - &&：一假必假
  - ||：一真必真
- 在赋值操作中
  - A || B => 如果 A 为真返回 A 的值，否则返回 B 的值(无论真假)
    - 1 || 2 => 1
    - 0 ||  false => false
  - A && B => 如果 A 为假返回 A 的值，否则返回 B 的值
    - 1 && 2 => 2
    - 0 && false => 0
- 逻辑 && 的优先级高于 ||
  - 0 || 2 && false || 3 => 3
    - 由于 && 优先级高，所以先执行了 2 && false => false
    - 0 || false || 3
    - 从左向右执行 0 || false => false
    - false || 3 => 3

## 推断以下代码执行的结果

```js
var foo = 'hello'
~(function(foo) {
    console.log(foo)
    var foo = foo || 'world'
    console.log(foo)
})(foo)
console.log(foo)
```

以上代码结果为 hello, hello, hello

## 推断以下代码执行的结果

```js
var a = 9
function fn() {
    a = 0

    return function(b) {
        return b + a++
    }
}
var f = fn() // a = 0 f = function(b)...
console.log(f(5)) // a = 1 打印 5
console.log(fn()(5)) // a = 1 打印 5
console.log(f(5)) // a = 2 打印 6
console.log(a) // 2
```

以上代码执行逻辑如下：
![](http://handle-note-img.niubishanshan.top/2020-03-08-00-09-06.png)

综上，打印的结果为 5, 5, 6, 2

## 推断以下代码执行的结果

```js
var ary = [1, 2, 3, 4]
function fn(ary) {
    ary[0] = 0
    ary = [0]
    ary[0] = 0
    return ary
}

var res = fn(ary)
console.log(ary)
console.log(res)
```

以上代码执行的流程为
![](http://handle-note-img.niubishanshan.top/2020-03-08-10-24-04.png)

对于引用类型的参数，函数调用时会按引用传递。也就是说函数内部可以修改全局同名你变量的实际内容。尽管是以形参的方式传入的。

## 推断以下代码执行的结果

```js
function fn(i) {
    return function(n) {
        console.log(n + (--i))
    }
}

var f = fn(2)
f(3)
fn(4)(5)
f(8)
```

以上代码执行的流程为
![](http://handle-note-img.niubishanshan.top/2020-03-08-10-29-46.png)

当四则运算符遇到小括号，小括号里边只有自增 / 自减运算符时。运算还是会按照预定的方式执行，并不会限执行小括号里边的自增 / 自减运算符⋯⋯

例如：
```js
a = 3
2 + (--a) // 4

a = 3
2 + (a--) // 5

a = 3
2 - (--a) // 0

a = 3
2 - (a--) // -1

a = 3
2 * (--a) // 4

a = 3
2 * (a--) // 6

a = 3
6 / (--a) // 3

a = 3
6 / (a--) // 2
```

## 推断以下代码执行的结果

```js
var num = 10  // 60
var obj = {num: 20}
obj.fn = (function(num){
    this.num = num * 3
    num++
    return function(n) {
        this.num += n
        num++
        console.log(num)
    }

})(obj.num)

var fn = obj.fn
fn(5)
obj.fn(10)
console.log(num, obj.num)
```

以上代码执行的流程为
![](http://handle-note-img.niubishanshan.top/2020-03-08-10-51-53.png)

所以，以上代码执行的结果为 22, 23, 65, 30

## 推断以下代码执行的结果

```js
function Fn() {
    this.x = 100
    this.y = 200
    this.getX = function() {
        console.log(this.x)
    }
}

Fn.prototype = {
    y: 400,
    getX() {
        console.log(this.x)
    },
    getY() {
        console.log(this.y)
    },
    sum() {
        console.log(this.x + this.y)
    }
}

var f1 = new Fn
var f2 = new Fn
console.log(f1.getX === f2.getX)  // false
console.log(f1.getY === f2.getY)  // true
console.log(f1.__proto__.getY === Fn.prototype.getY)  // true
console.log(f1.__proto__.getX === f2.getX)  // false
console.log(f1.getX === Fn.prototype.getX)  // false
console.log(f1.constructor) // Object
console.log(Fn.prototype.constructor)  // Object
f1.getX() // this: f1 f1.x = 100
f1.__proto__.getX() // this: f1.__proto__(Fn.prototype) Fn.prototype.x = undefined
f2.getY() // this: f2 f2.y = 200
Fn.prototype.getY() // this: Fn.prototype Fn.prototype.y = 400
```

上述代码执行的流程为：
![2020-03-08-11-07-03](http://handle-note-img.niubishanshan.top/2020-03-08-11-07-03.png)
