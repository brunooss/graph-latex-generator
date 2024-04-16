import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "../components/Button";

export const MenuPage: React.FC = () => {
  const navigate = useNavigate();

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
      <h1>Gerador de Grafos com Exportação de Código LaTeX</h1>
      <div className="card">
      </div>
      <div className="card">
        <Button onClick={() => navigate("./editor-page")}>
          Abrir editor
        </Button>
      </div>
    </>
  );
};
