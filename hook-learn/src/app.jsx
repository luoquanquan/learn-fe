import React, {useState} from 'react'

const Count = () => {
    const [count, setCount] = useState(0)
    return (
        <>
            <div className="count">{count}</div>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    )
}

export default Count
