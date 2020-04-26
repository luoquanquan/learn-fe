import React, {useState, useCallback, useReducer} from 'react'

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const initialState = {number: 0}
const reducer = (state, action) => {
    switch (action.type) {
        case INCREMENT:
            return { number: state.number + 1 }
        case DECREMENT:
            return { number: state.number - 1 }
        default:
            return state
    }
}

// 自定义 hooks
const useMyState = initialState => {
    const reducer = useCallback((state, action) => action, [])
    const [state, dispatch] = useReducer(reducer, initialState)

    const setState = payload => {
        dispatch(payload)
    }

    return [state, setState]
}

const Count = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [state2, setState] = useState(initialState)
    const [state3, setMyState] = useMyState(initialState)

    console.log('render Count ~')
    return (
        <>
            <h3>useReducer</h3>
            <div>{state.number}</div>
            <button onClick={() => dispatch({type: INCREMENT})}>+</button>
            <button onClick={() => dispatch({type: DECREMENT})}>-</button>
            <br/><br/>
            <h3>useState</h3>
            <div>{state2.number}</div>
            <button onClick={() => setState({number: state2.number + 1})}>+</button>
            <button onClick={() => setState({number: state2.number - 1})}>-</button>
            <br/><br/>
            <h3>useMyState</h3>
            <div>{state3.number}</div>
            <button onClick={() => setMyState({number: state3.number + 1})}>+</button>
            <button onClick={() => setMyState({number: state3.number - 1})}>-</button>
        </>
    )
}

export default Count
