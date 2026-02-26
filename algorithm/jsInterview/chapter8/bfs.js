const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        {
          val: "d",
          children: [],
        },
        {
          val: "e",
          children: [],
        },
      ],
    },
    {
      val: "c",
      children: [
        {
          val: "f",
          children: [],
        },
        {
          val: "g",
          children: [],
        },
      ],
    },
  ],
};

// 广度优先遍历
const bfs = (root) => {
  const queue = [root];

  while (queue.length) {
    const head = queue.shift();
    console.log(head.val);
    head.children.forEach((ele) => queue.push(ele));
  }
};

bfs(tree);
