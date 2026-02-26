const graph = require("./graph");

const queue = [2];
const visited = new Set();
visited.add(2);

while (queue.length) {
  const node = queue.shift();

  console.log(node);
  graph[node].forEach((c) => {
    if (!visited.has(c)) {
      queue.push(c);
      visited.add(c);
    }
  });
}
