import React, {useState, useEffect, useCallback} from 'react'

const useAjax = url => {
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(0)
    const loadMore = () => {
        fetch(`${url}?offset=${offset}&limit=10`)
            .then(resp => resp.json())
            .then(data => {
                setData(oldData => [...oldData, ...data])
                setOffset(offset => offset + data.length)
            })
    }

    useEffect(() => loadMore(), []) // eslint-disable-line
    return [data, loadMore]
}

const Users = () => {
    const [users, loadMore] = useAjax('http://localhost:8000/api/user')

    if (!users.length) {
        return <div>加载中~~~</div>
    }

    return (
        <div>
            {
                users.map(user => (
                    <div>{user.name}</div>
                ))
            }
            <button onClick={loadMore}>loadMore</button>
        </div>
    )
}

export default Users
