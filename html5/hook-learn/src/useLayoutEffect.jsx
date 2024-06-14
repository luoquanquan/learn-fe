import React, {useState, useEffect, useLayoutEffect} from 'react'

const Count = () => {
    const [color, setColor] = useState('red')

    useLayoutEffect(() => {
        console.log('当前颜色 useLayoutEffect', color)
        alert('useLayoutEffect')
    })

    useEffect(() => {
        console.log('当前颜色 useEffect', color)
    })

    return (
        <>
            <div id="myDiv" style={{background: color}}>颜色</div>
            <button onClick={() => setColor('red')}>红</button>
            <button onClick={() => setColor('yellow')}>黄</button>
            <button onClick={() => setColor('blue')}>蓝</button>
        </>
    )
}

export default Count
