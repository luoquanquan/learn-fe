# React中的setState执行机制

## state 含义

控制组件展示形态的数据主要为数据状态和外部参数, 组件的数据结构指的就是 state. 组件作为一个状态机. 会把自身可控的信息存储到 state 中. 并通过 setState 改变 ~

```js
import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "quanquan"
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.name}</h2>
                <button onClick={this.changeName.bind(this)}>changeName</button>
            </div>
        )
    }

    changeName() {
        this.setState({
            name: "luoxiaoluo"
        })
    }
}
```

## 同步 or 异步

使用 setState 更新数据的时候有两种更新模式, 同步 / 异步

- 异步更新
- 同步更新

### 同步更新

当 setState 写到 setTimeout 或者原生事件中的时候 state 会同步更新

```js
// 改写上述 changeName 方法
changeName() {
    // 写在 setTimeout 中会同步修改
    setTimeout(() => {
        this.setState({name: 'luoxiaoluo'})
        console.log(this.state.name) // luoxiaoluo
    }, 1e3);
}

componentDidMount() {
    const btnEle = document.getElementsByTagName('button')[0]

    // 原生事件中的 setState 也会同步更新
    btnEle.addEventListener('click', () => {
        this.setState({ name: 'luoxiaoluo' })
        console.log(this.state.name) // luoxiaoluo
    })
}
```

### 异步更新

```js
changeName() {
    this.setState({name: 'luoxiaoluo'}, () => {
        // 只有在回调函数中获取的状态才是最新设置的状态
        console.log(this.state.name) // luoxiaoluo
    })

    // 直接在 setState 之后获取的还是之前的状态
    console.log(this.state.name) // quanquan
}
```

- 组件生命周期或者 React 合成事件中, setState 是异步的
- setTimeout 或者原生 dom 事件中, setState 是同步的

## 批量更新

示例:

```js
// 假设初始状态为 {count: 1}
handleClick() {
    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count)

    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count)

    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count)
}

/*
    三次打印的结果均为 1
    1. 首先 React 事件系统中 setState 是异步执行的
    2. 其次, 上述代码的执行模型如下代码所示, React 会对传入的 Object 进行一次合并
    批处理, 批处理过程中后续的状态会覆盖前边的, 所以最后的效果是 state.count == 2
*/
Object.assign(
    prevState,
    {count: this.state.count},
    {count: this.state.count},
    {count: this.state.count},
)
```

如果想要每一次 setState 都基于最新的状态, 可以给 setState 传入一个函数. Object.assign 没法时间函数参数的合并. 自然不会覆盖了

```js
// 改成这种函数的写法就不会存在被
handleClick() {
    this.setState(({count}) => ({count: count + 1}))
    this.setState(({count}) => ({count: count + 1}))
    this.setState(({count}) => ({count: count + 1}))
}
```
