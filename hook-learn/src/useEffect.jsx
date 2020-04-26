import React, { useState, useEffect } from 'react'

const Count = () => {
    const [state, setState] = useState(0)
    useEffect(() => {
        document.title = state
    }, [state])

    console.log('render Count ~')
    return (
        <>
            <div>state: {state}</div>
            <button onClick={() => setState(state + 1)}>+</button>
        </>
    )
}

export default Count
