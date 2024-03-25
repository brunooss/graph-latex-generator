import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Directed_graph_no_background.svg/1200px-Directed_graph_no_background.svg.png"
          }
          className="logo"
          alt="Grafo"
        />
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Directed_acyclic_graph.svg/1280px-Directed_acyclic_graph.svg.png"
          }
          className="logo react"
          alt="Outro Grafo"
        />
      </div>
      <h1>Gerador de Grafos com Exportação de Código LaTeX e .png</h1>
      <div className="card">
        <Button
          variant="contained"
          onClick={() => setCount((count) => count + 1)}
        >
          Gerar um grafo
        </Button>
        <p>
          Agora temos {count} {count > 1 ? "grafos" : "grafo"}
        </p>
      </div>
    </>
  );
}

export default App;
