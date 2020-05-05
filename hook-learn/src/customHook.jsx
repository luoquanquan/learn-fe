import React, {useState, useEffect} from 'react'

const Count1 = () => {
    const [number, setNumber] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => setNumber(n => n + 1), 1e3)
        return () => clearInterval(timer)
    })

    return (
        <>
            <div>当前: {number}</div>
        </>
    )
}

const Count2 = () => {
    const [number, setNumber] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => setNumber(n => n + 1), 1e3)
        return () => clearInterval(timer)
    })

    return (
        <>
            <div>当前: {number}</div>
        </>
    )
}

const Count = () => (
    <>
        <Count1 />
        <Count2 />
    </>
)

export default Count
