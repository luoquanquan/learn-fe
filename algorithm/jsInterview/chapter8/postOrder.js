const bt = require("./bt");

// const postOrder = (root) => {
//     if (!root) {
//         return
//     }

//     postOrder(root.left)
//     postOrder(root.right)
//     console.log(root.val)
// }

// postOrder(bt)

const postOrder = (root) => {
  if (!root) {
    return;
  }

  const stack = [root];
  const outputStack = [];

  while (stack.length) {
    const node = stack.pop();
    outputStack.push(node);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }

  while (outputStack.length) {
    const node = outputStack.pop();
    console.log(node.val);
  }
};

postOrder(bt);
