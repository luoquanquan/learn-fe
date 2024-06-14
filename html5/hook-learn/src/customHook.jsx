import React, {useState, useEffect} from 'react'

const useCount = () => {
    const [number, setNumber] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => setNumber(n => n + 1), 1e3)
        return () => clearInterval(timer)
    })

    return number
}

const Count1 = () => {
    const number = useCount()
    return (
        <>
            <div>当前1: {number}</div>
        </>
    )
}

const Count2 = () => {
    const number = useCount()
    return (
        <>
            <div>当前2: {number}</div>
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
