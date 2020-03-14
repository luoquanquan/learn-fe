import React from 'react';

class App extends React.Component {

    handleClick(e) {
        // 事件对象 e 是经过处理的一个实例
        console.log(e)

        // 事件对象所属的类
        console.log(e.__proto__.constructor)

        // e.target 当前触发事件的元素
        // e.currentTarget 绑定事件的元素
        console.log('e.target', e.target)
        console.log('e.currentTarget', e.currentTarget)

        // 原生事件对象
        const {nativeEvent} = e
        console.log('nativeEvent.target', nativeEvent.target)
        console.log('nativeEvent.currentTarget', nativeEvent.currentTarget)
    }

    render() {
        return (
            <div className="app">
                <button onClick={this.handleClick}>click Me</button>
            </div>
        )
    }
}

export default App;
