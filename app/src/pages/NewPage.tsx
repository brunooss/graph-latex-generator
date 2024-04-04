import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import Node from "../components/Node"
import "./NewPage.css"

export const NewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="new-page">
      <Node/>
      <div className="button-container">
        <Button variant="contained" onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};

export default NewPage;
