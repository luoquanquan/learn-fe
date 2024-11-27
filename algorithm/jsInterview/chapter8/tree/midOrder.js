const bt = require('./bt')

// const midOrder = (root) => {
//     if (!root) {
//         return
//     }

//     midOrder(root.left)
//     console.log(root.val)
//     midOrder(root.right)
// }

// midOrder(bt)

const midOrder = (root) => {
    if (!root) {
        return
    }

    const stack = []
    let p = root
    while (stack.length || p) {
        while (p) {
            stack.push(p)
            p = p.left
        }
        const node = stack.pop()
        console.log(node.val)

        p = node.right
    }
}

midOrder(bt)
