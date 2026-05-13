export const nodes = [
  { id: 0, label: "Centro Histórico",     lat: 22.7709, lng: -102.5832 },
  { id: 1, label: "Guadalupe",            lat: 22.7486, lng: -102.5171 },
  { id: 2, label: "Col. Morelos",         lat: 22.7890, lng: -102.5600 },
  { id: 3, label: "Zóalo",               lat: 22.7720, lng: -102.5700 },
  { id: 4, label: "Cerro de la Bufa",    lat: 22.7800, lng: -102.5750 },
  { id: 5, label: "Teleférico",          lat: 22.7760, lng: -102.5690 },
  { id: 6, label: "Col. Lomas",          lat: 22.7600, lng: -102.5900 },
  { id: 7, label: "Plateros",            lat: 22.7550, lng: -102.5600 },
  { id: 8, label: "Col. Insurgentes",   lat: 22.7650, lng: -102.5750 },
  { id: 9, label: "Mercado González Ortega", lat: 22.7695, lng: -102.5810 },
];

export const edges = [
  { from: 0, to: 3, weight: 1.2 },
  { from: 0, to: 9, weight: 0.5 },
  { from: 0, to: 5, weight: 2.1 },
  { from: 1, to: 7, weight: 3.1 },
  { from: 1, to: 8, weight: 4.2 },
  { from: 2, to: 4, weight: 1.8 },
  { from: 2, to: 5, weight: 2.5 },
  { from: 3, to: 5, weight: 1.5 },
  { from: 3, to: 8, weight: 2.8 },
  { from: 4, to: 5, weight: 1.1 },
  { from: 5, to: 9, weight: 1.9 },
  { from: 6, to: 7, weight: 2.0 },
  { from: 6, to: 8, weight: 1.6 },
  { from: 7, to: 8, weight: 2.3 },
  { from: 8, to: 9, weight: 2.7 },
];

// Lista de adyacencia (necesaria para Dijkstra y Prim)
export const adj = {};
nodes.forEach(n => (adj[n.id] = []));
edges.forEach(({ from, to, weight }) => {
  adj[from].push({ to, weight });
  adj[to].push({ to: from, weight });
});