// 遍历 json 中每个节点的值
const json = {
    a: {
        b: {
            c: 1
        }
    },
    d: [1, 2]
}

const dfs = (root, path) => {
    console.log(root, path)

    Object.keys(root).forEach(k => {
        dfs(root[k], path.concat(k))
    })
}

dfs(json, [])
