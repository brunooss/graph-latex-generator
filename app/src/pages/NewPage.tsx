import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NewPage: React.FC = () => {
  const navigate = useNavigate();

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
      <h1>De acordo com diversos especialistas, não existe nada por aqui!</h1>
      <h3 style={{ color: "#4ac6ff" }}>
        Mas uma especialista desenvolvedora pode facilmente alterar essa
        situação! :D
      </h3>
      <div className="card">
        <Button variant="contained" onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </>
  );
};
