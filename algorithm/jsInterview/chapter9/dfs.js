const graph = require("./graph");

const visited = new Set();
const dfs = (node) => {
  console.log(node);
  visited.add(node);
  graph[node].forEach((c) => {
    if (!visited.has(c)) {
      dfs(c);
    }
  });
};

dfs(2);
