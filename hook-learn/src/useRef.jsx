import React, { useState, useRef, createRef, forwardRef } from 'react'

let lastRef
let lastRef2
let lastRef3

let myRefObj
const CountChild = () => {
    // {current: 指向要引用的组件}
    const refObj = createRef()
    console.log('lastRef === refObj', lastRef === refObj)
    lastRef = refObj
    const getFocus = () => {
        refObj.current.focus()
    }

    return (
        <>
            <input ref={refObj}/>
            <button onClick={getFocus}>获得焦点</button>
        </>
    )
}

const CountChild2 = () => {
    // {current: 指向要引用的组件}
    const refObj = useRef()
    console.log('lastRef2 === refObj', lastRef2 === refObj)
    lastRef2 = refObj
    const getFocus = () => {
        refObj.current.focus()
    }

    return (
        <>
            <input ref={refObj}/>
            <button onClick={getFocus}>获得焦点</button>
        </>
    )
}

const useMyRef = () => {
    if (!myRefObj) {
        myRefObj = {current: null}
    }
    return myRefObj
}
const CountChild3 = () => {
    // {current: 指向要引用的组件}
    const refObj = useMyRef()
    console.log('lastRef3 === refObj', lastRef3 === refObj)
    lastRef3 = refObj
    const getFocus = () => {
        refObj.current.focus()
    }

    return (
        <>
            <input ref={refObj}/>
            <button onClick={getFocus}>获得焦点</button>
        </>
    )
}

const CountChild4 = props => {
    return (
        <>
            <input ref={props.xx}/>
        </>
    )
}

const CountChild5 = forwardRef((props, ref) => {
    return (
        <>
            <input ref={ref}/>
        </>
    )
})


const Count = () => {
    const [state, setState] = useState(0)

    const refObj4 = useRef()
    const getFocus4 = () => {
        refObj4.current.focus()
    }

    const refObj5 = useRef()
    const getFocus5 = () => {
        refObj5.current.focus()
    }

    console.log('render Count ~')
    return (
        <>
            <div>state: {state}</div>
            <button onClick={() => setState(state + 1)}>+</button>
            <CountChild></CountChild>
            <CountChild2></CountChild2>
            <CountChild3></CountChild3>
            <CountChild4 xx={refObj4}></CountChild4>
            <button onClick={getFocus4}>获得焦点</button>
            <CountChild5 ref={refObj5}></CountChild5>
            <button onClick={getFocus5}>获得焦点</button>
        </>
    )
}

export default Count
