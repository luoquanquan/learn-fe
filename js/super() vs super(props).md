# super() vs super(props)

## super 的作用

首先写一个基于 es5 prototype 的继承

```js
function Human (name, age) {
    this.name = name
    this.age = age
}
Human.prototype.walking = function walking (){
    console.log('i can walking ~')
}

const human = new Human()
function Coder (name, age, job) {
    // 如果想要实现 Coder 继承 Human 的实例成员, 就需要在当前实例的
    // this 上调用一下父类的构造方法
    human.__proto__.constructor.call(this, name, age, job)
    this.job = job
}
// 继承父类的原型方法直接将子类的原型指向父类实例即可
Coder.prototype = human
// 修正子类原型中绑定的构造函数
Coder.prototype.constructor = Coder
const quanquan = new Coder('quanquan', 18, 'fe')

console.log(quanquan.name)
console.log(quanquan.job)
quanquan.walking()
```

在 es5 的继承中，我们不难发现：继承父类的原型方法的时候直接修改子类原型即可，但是想要继承父类的实例成员时候就需要在子类构造函数中调用父类的构造函数(每个人走路都一样，但是肯定名字和年纪不能是一样的)。在 es6 中 constructor 其实就是 es5 中构造函数的语法糖。那么肯定也需要调用一下父类构造函数实现继承实例成员⋯⋯

```js
class Human {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    walking() {
        console.log('i can walking ~')
    }
}

class Coder extends Human {
    constructor(name, age, job) {
        super(name, age)

        this.job = job
    }
}

const quanquan = new Coder('quanquan', 18, 'fe')

console.log(quanquan.name)
console.log(quanquan.job)
quanquan.walking()
```

通过以上代码可以一目了然，super 其实就是 `human.__proto__.constructor.call(this, name, age, job)` 这个环节。如果没有这一步，父类的实例成员就不会挂载到子类上边来了。根据 es6 规范，想要在构造函数中使用 this 也必须先调用 super

## 类组件的实现

在 React 里的类组件其实也是基于 es6 的语法的。所有的组件都继承自 React.Component. 所以只要用到 constructor 的组件中必须调用 super. 在 react 内部初始化的伪代码为：

```js
const instance = new YourComponent(props);
instance.props = props;
```

也就是说即使你调用 super 的时候没有传 props, react 也会在组件创建完成之后强行给你挂上。那么问题就来了，react 强行挂载的时机是组件创建完成后。如果在组件创建的过程中想要获取 `this.props` 该怎么办呢？

```js
class Button extends React.Component {
    constructor(props) {
        super()
        console.log(this.props) // undefined
    }
}
```

但是如果 super(props)

```js
class Button extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props) // {}
    }
}
```

就可以直接在子组件的构造函数中拿到 this.props 对象了

## 综上所述

1. React 组件是基于 ES6 语法实现时，constructor 必须使用 super 这是 es6 规定
2. 如果调用 super 没有传入 props react 也会强行挂载到实例上，但是如果想要在构造函数中使用 this.props 就必须在 super 中传入了
