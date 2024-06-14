import React, { useState, useContext, createContext } from 'react'
const MyContext = createContext()

const ChildCount = props => {
    return (
        <MyContext.Consumer>
            {
                value => (
                    <>
                        <div>state: {value.state}</div>
                        <button onClick={() => value.setState(value.state + 1)}>+</button>
                    </>
                )
            }
        </MyContext.Consumer>
    )
}

const ChildCount2 = () => {
    const { state, setState } = useContext(MyContext)
    return (
        <>
            <div>state: {state}</div>
            <button onClick={() => setState(state + 1)}>+</button>
        </>
    )
}

const Count = () => {
    const [state, setState] = useState(0)
    console.log('render Count ~')
    return (
        <MyContext.Provider value={{ state, setState }}>
            <ChildCount></ChildCount>
            <ChildCount2></ChildCount2>
        </MyContext.Provider>
    )
}

export default Count
