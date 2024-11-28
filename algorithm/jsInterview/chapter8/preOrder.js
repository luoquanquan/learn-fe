const bt = require('./bt')

// 前序遍历 - 递归版本
// const preOrder = (root) => {
//     if (!root) {
//         return
//     }

//     console.log(root.val)
//     preOrder(root.left)
//     preOrder(root.right)
// }

// preOrder(bt)

const preOrder = (root) => {
    if (!root) {
        return
    }

    const stack = [root]
    while (stack.length) {
        const node = stack.pop()
        console.log(node.val)
        node.right && stack.push(node.right)
        node.left && stack.push(node.left)
    }
}

preOrder(bt)
