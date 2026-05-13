import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

import { nodes, edges, adj } from "./data/graph";
import { dijkstra } from "./algorithms/dijkstra";
import { kruskal }  from "./algorithms/kruskal";
import { prim }     from "./algorithms/prim";

const graph = { nodes, edges, adj };

export default function App() {
  const [origin, setOrigin]     = useState("");
  const [dest, setDest]         = useState("");
  const [result, setResult]     = useState(null);
  const [activeAlgo, setActiveAlgo] = useState(null);

  // Convierte una lista de IDs en coordenadas para Polyline
  const toLatLng = (ids) =>
    ids.map(id => {
      const n = nodes.find(n => n.id === Number(id));
      return [n.lat, n.lng];
    });

  const runDijkstra = () => {
    if (origin === "" || dest === "") return alert("Elige origen y destino");
    const r = dijkstra(adj, nodes, Number(origin), Number(dest));
    setResult(r);
    setActiveAlgo("dijkstra");
  };

  const runKruskal = () => {
    const r = kruskal(graph);
    setResult(r);
    setActiveAlgo("kruskal");
  };

  const runPrim = () => {
    const startId = origin !== "" ? Number(origin) : nodes[0].id;
    const r = prim(graph, startId);
    setResult(r);
    setActiveAlgo("prim");
  };

  const reset = () => {
    setOrigin(""); setDest(""); setResult(null); setActiveAlgo(null);
  };

  // Aristas del MST (Kruskal o Prim)
  const mstLines = result?.mstEdges?.map((e, i) => {
    const a = nodes.find(n => n.id === e.from);
    const b = nodes.find(n => n.id === e.to);
    return (
      <Polyline key={i}
        positions={[[a.lat, a.lng], [b.lat, b.lng]]}
        color={activeAlgo === "kruskal" ? "#10b981" : "#8b5cf6"}
        weight={4}
      />
    );
  });

  // Ruta de Dijkstra
  const dijkstraLine = result?.path?.length > 1
    ? <Polyline positions={toLatLng(result.path)} color="#3b82f6" weight={5} />
    : null;

  return (
    <div id="root">
      {/* ── Panel lateral ── */}
      <aside className="panel">
        <h1>GeoRutas GraphGPS</h1>
        <p style={{ fontSize: 13, color: "#888" }}>Zacatecas, México</p>

        {/* Selector de nodos */}
        <div>
          <h2>Origen</h2>
          <select value={origin} onChange={e => setOrigin(e.target.value)}>
            <option value="">— Selecciona —</option>
            {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
          </select>
        </div>
        <div>
          <h2>Destino</h2>
          <select value={dest} onChange={e => setDest(e.target.value)}>
            <option value="">— Selecciona —</option>
            {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
          </select>
        </div>

        {/* Botones de algoritmos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2>Algoritmos</h2>
          <button className="btn-algo btn-dijkstra" onClick={runDijkstra}>
            Dijkstra — ruta más corta
          </button>
          <button className="btn-algo btn-kruskal" onClick={runKruskal}>
            Kruskal — árbol mínimo
          </button>
          <button className="btn-algo btn-prim" onClick={runPrim}>
            Prim — árbol mínimo
          </button>
          <button className="btn-algo btn-reset" onClick={reset}>
            Limpiar mapa
          </button>
        </div>

        {/* Resultados */}
        {result && (
          <div>
            <h2>Resultado</h2>
            {activeAlgo === "dijkstra" && (
              <>
                <span className="algo-badge badge-dijkstra">Dijkstra</span>
                <div className="stat-card" style={{ marginBottom: 8 }}>
                  <div className="stat-label">Costo total</div>
                  <div className="stat-value">{result.cost?.toFixed(2)} km</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Nodos en la ruta</div>
                  <div className="stat-value">{result.path?.length ?? 0}</div>
                </div>
                <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                  Ruta: {result.path?.map(id => nodes.find(n => n.id === id)?.label).join(" → ")}
                </p>
              </>
            )}
            {(activeAlgo === "kruskal" || activeAlgo === "prim") && (
              <>
                <span className={`algo-badge badge-${activeAlgo}`}>
                  {activeAlgo === "kruskal" ? "Kruskal" : "Prim"}
                </span>
                <div className="stat-card" style={{ marginBottom: 8 }}>
                  <div className="stat-label">Peso total del árbol</div>
                  <div className="stat-value">{result.totalWeight?.toFixed(2)} km</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Aristas en el MST</div>
                  <div className="stat-value">{result.mstEdges?.length}</div>
                </div>
              </>
            )}
          </div>
        )}
      </aside>

      {/* ── Mapa ── */}
      <div className="map-container">
        <MapContainer
          center={[22.7709, -102.5832]}
          zoom={14}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />

          {/* Aristas del grafo (gris punteado) */}
          {edges.map((e, i) => {
            const a = nodes.find(n => n.id === e.from);
            const b = nodes.find(n => n.id === e.to);
            return (
              <Polyline key={i}
                positions={[[a.lat, a.lng], [b.lat, b.lng]]}
                color="#aaa" weight={1.5} dashArray="6"
              />
            );
          })}

          {/* Resultado del algoritmo */}
          {dijkstraLine}
          {mstLines}

          {/* Nodos */}
          {nodes.map(n => (
            <CircleMarker key={n.id}
              center={[n.lat, n.lng]}
              radius={10}
              color="#fff"
              fillColor={
                result?.path?.includes(n.id) ? "#3b82f6" :
                String(origin) === String(n.id) ? "#f59e0b" :
                String(dest) === String(n.id) ? "#ef4444" : "#1a1a1a"
              }
              fillOpacity={1}
              weight={2}
            >
              <Tooltip permanent direction="top" offset={[0, -12]}>
                <span style={{ fontSize: 11 }}>{n.label}</span>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
