import React, {useState, useCallback, memo, useMemo} from 'react'

const Child = memo(props => {
    console.log('render Child ~')
    return (
        <button onClick={props.add}>button - {props.data.count}</button>
    )
})

const Count = () => {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('quanquan')

    // 解决函数和数据的多次渲染问题
    const add = useCallback(() => setCount(count + 1), [count])
    const data = useMemo(() => ({count}), [count])

    console.log('render Count ~')
    return (
        <>
            <input value={name} onChange={e => setName(e.target.value)}/>
            <Child data={data} add={add} />
        </>
    )
}

export default Count
