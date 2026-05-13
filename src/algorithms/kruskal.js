// ─── Union-Find (Disjoint Set Union) ───────────────────────────────────────
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x)
      this.parent[x] = this.find(this.parent[x]); 
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x);
    const py = this.find(y);
    if (px === py) return false; 

    // unión por rango
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else { this.parent[py] = px; this.rank[px]++; }

    return true;
  }
}

// ─── Kruskal ────────────────────────────────────────────────────────────────
/**
 * Calcula el Árbol de Expansión Mínima (MST) usando el algoritmo de Kruskal.
 *
 * @param {{ nodes: Array<{id:number}>, edges: Array<{from:number,to:number,weight:number}> }} graph
 * @returns {{
 *   mstEdges: Array<{from:number,to:number,weight:number}>,
 *   totalWeight: number,
 *   steps: Array<{edge:{from,to,weight}, accepted:boolean, reason:string}>
 * }}
 */
export function kruskal(graph) {
  const { nodes, edges } = graph;

  
  const idToIdx = {};
  nodes.forEach((n, i) => (idToIdx[n.id] = i));

  
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);

  const uf = new UnionFind(nodes.length);
  const mstEdges = [];
  const steps = [];
  let totalWeight = 0;

  
  for (const edge of sorted) {
    const u = idToIdx[edge.from];
    const v = idToIdx[edge.to];

    if (uf.union(u, v)) {
     
      mstEdges.push(edge);
      totalWeight += edge.weight;
      steps.push({
        edge,
        accepted: true,
        reason: `Arista (${edge.from}→${edge.to}) aceptada. Peso: ${edge.weight.toFixed(2)}`,
      });

      
      if (mstEdges.length === nodes.length - 1) break;
    } else {
      
      steps.push({
        edge,
        accepted: false,
        reason: `Arista (${edge.from}→${edge.to}) rechazada. Formaría un ciclo.`,
      });
    }
  }

  return { mstEdges, totalWeight, steps };
}