// ─── Min-Heap (Cola de prioridad mínima) ────────────────────────────────────
class MinHeap {
  constructor() { this.heap = []; }

  push(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return top;
  }

  get size() { return this.heap.length; }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent][0] <= this.heap[i][0]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
      if (r < n && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}

// ─── Prim ────────────────────────────────────────────────────────────────────
/**
 * Calcula el Árbol de Expansión Mínima (MST) usando el algoritmo de Prim.
 * Inicia desde el nodo con el ID dado (por defecto el primero del grafo).
 *
 * @param {{ nodes: Array<{id:number}>, adj: Object }} graph
 * @param {number} [startId]  ID del nodo inicial (opcional)
 * @returns {{
 *   mstEdges: Array<{from:number, to:number, weight:number}>,
 *   totalWeight: number,
 *   visitOrder: number[],
 *   steps: Array<{from:number, to:number, weight:number, nodeAdded:number}>
 * }}
 */
export function prim(graph, startId) {
  const { nodes, adj } = graph;
  const start = startId ?? nodes[0].id;

  const inMST = new Set();
  const key = {};      
  const parent = {};   

  for (const n of nodes) key[n.id] = Infinity;
  key[start] = 0;
  parent[start] = null;

 
  const pq = new MinHeap();
  pq.push([0, start]);

  const mstEdges = [];
  const visitOrder = [];
  const steps = [];

  while (pq.size > 0) {
    const [w, u] = pq.pop();

    if (inMST.has(u)) continue; 
    inMST.add(u);
    visitOrder.push(u);

    
    if (parent[u] !== null && parent[u] !== undefined) {
      const edge = { from: parent[u], to: u, weight: w };
      mstEdges.push(edge);
      steps.push({ ...edge, nodeAdded: u });
    }

    
    for (const { to, weight } of (adj[u] || [])) {
      if (!inMST.has(to) && weight < key[to]) {
        key[to] = weight;
        parent[to] = u;
        pq.push([weight, to]);
      }
    }
  }

  const totalWeight = mstEdges.reduce((s, e) => s + e.weight, 0);

  return { mstEdges, totalWeight, visitOrder, steps };
}