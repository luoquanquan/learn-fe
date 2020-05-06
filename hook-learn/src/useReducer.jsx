import React, {useState, useCallback, useReducer, useEffect} from 'react'

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

// 实现 redux-logger 在组件状态变更后打印新的状态值
const useLogger = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const loggerDispatch = action => {
        console.log('old state', state)
        dispatch(action)
    }
    useEffect(() => console.log('new state', state))
    return [state, loggerDispatch]
}

// 实现 thunk
const useThunk = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const thunkDispatch = action => {
        if (typeof action === 'function') {
            action(thunkDispatch, () => state)
        } else {
            dispatch(action)
        }
    }
    return [state, thunkDispatch]
}

// 实现 usePromise
const usePromise = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const promiseDispatch = action => {
        if (typeof action.then === 'function') {
            action.then(promiseDispatch)
        } else {
            dispatch(action)
        }
    }
    return [state, promiseDispatch]
}

const Count = () => {
    const [state, dispatch] = useLogger(reducer, initialState)
    const [state2, setState] = useState(initialState)
    const [state3, setMyState] = useMyState(initialState)
    const [state4, dispatch4] = useThunk(reducer, initialState)
    const [state5, dispatch5] = usePromise(reducer, initialState)

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
            <br/><br/>
            <h3>useThunk</h3>
            <div>{state4.number}</div>
            <button onClick={() => dispatch4((dispatch, getState) => {
                console.log(`当前时间 ${Date.now()}: debug 的数据是 getState(): `, getState())
                dispatch({type: INCREMENT})
            })}>+</button>
            <button onClick={() => dispatch4((dispatch, getState) => {
                console.log(`当前时间 ${Date.now()}: debug 的数据是 getState(): `, getState())
                dispatch({type: DECREMENT})
            })}>-</button>
            <br/><br/>
            <h3>usePromise</h3>
            <div>{state5.number}</div>
            <button onClick={() => dispatch5(new Promise(resolve => {
                setTimeout(() => {
                    resolve({type: INCREMENT})
                }, 1e3);
            }))}>+</button>
            <button onClick={() => dispatch5(new Promise(resolve => {
                setTimeout(() => {
                    resolve({type: DECREMENT})
                }, 1e3);
            }))}>-</button>
        </>
    )
}

export default Count
