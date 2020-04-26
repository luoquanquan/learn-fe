import React, {useState, useCallback} from 'react'

let lastAdd
let lastModifyName

const Count = () => {
    const [count, setCount] = useState(0)

    const [name, setName] = useState('quanquan')

    // 当 state 的值是一个对象的时候
    const [obj, setObj] = useState({name: 'quanquan', age: 27})

    /**
     * 如果直接打印 count 的值, 能够获取实时的数据
     * 但是如果把获取值的操作写到定时器中异步获取的话, 只能获取到状态在点击时刻的值
     * 并不能获取到定时器内回调函数中实际执行时候的值
     */
    const logCount = () => {
        setTimeout(() => {
            console.log(count)
        }, 5e3);
    }


    const add = useCallback(() => setCount(count + 1), [count])
    console.log('add 有没有保留', lastAdd === add)
    lastAdd = add

    const modifyName = useCallback(() => setName(name + 1), [name])
    console.log('modifyName 有没有保留', lastModifyName === modifyName)
    lastModifyName = modifyName

    /**
     * 函数式更新
     * 新的状态需要使用先前的状态计算出来, 现在就尴尬了. 异步过程只能拿到点击当前的状态值, 所以...
     * 使用 lazyFuncAdd 内的逻辑 setCount 中使用一个函数作为参数, 就能保证异步逻辑中获取最新的状态了
     */
    const lazyAdd = () => {
        setTimeout(() => {
           setCount(count + 1)
        }, 1e3);
    }

    const lazyFuncAdd = () => {
        setTimeout(() => {
            setCount(count => count + 1)
         }, 1e3);
    }

    console.log('render ~')

    return (
        <>
            <div className="count">{count}</div>
            <br/>
            <button onClick={add}>+1</button>
            <button onClick={() => setCount(count)}>not change, not render</button>
            <button onClick={logCount}>logCount</button>
            <button onClick={lazyAdd}>lazyAdd</button>
            <button onClick={lazyFuncAdd}>lazyFuncAdd</button>
            <br/><br/>
            <div>{obj.name}: {obj.age}</div>
            {/* <button onClick={() => setObj({age: 28})}>add one year</button> */}
            <button onClick={() => setObj(state => ({ ...state, age: 28 }))}>add one year</button>
            <br/><br/>

            <div>{name}</div>
            <button onClick={modifyName}>change name</button>
        </>
    )
}

export default Count
