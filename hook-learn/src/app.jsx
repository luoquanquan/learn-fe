import React, {useState} from 'react'

const Count = () => {
    const [count, setCount] = useState(0)

    const logCount = () => {
        console.log(count)
    }

    return (
        <>
            <div className="count">{count}</div>
            <br/>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={logCount}>logCount</button>
        </>
    )
}

export default Count
