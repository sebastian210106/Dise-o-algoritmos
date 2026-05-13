export function dijkstra(adj, nodes, startId, endId) {
  const dist = {};
  const prev = {};
  const visited = new Set();

  nodes.forEach(n => (dist[n.id] = Infinity));
  dist[startId] = 0;

  const pq = [[0, startId]];

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, u] = pq.shift();
    if (visited.has(u)) continue;
    visited.add(u);

    for (const { to, weight } of (adj[u] || [])) {
      const newDist = cost + weight;
      if (newDist < dist[to]) {
        dist[to] = newDist;
        prev[to] = u;
        pq.push([newDist, to]);
      }
    }
  }

  const path = [];
  let cur = endId;
  while (cur !== undefined) {
    path.unshift(cur);
    cur = prev[cur];
  }

  return {
    path: dist[endId] === Infinity ? [] : path,
    cost: dist[endId],
    visited: [...visited],
  };
}