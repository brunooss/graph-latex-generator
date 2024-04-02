import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import Node from "../components/Node"
import "./NewPage.css"
import CreateNodeButton from "../components/NewNodeButton";

export const NewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="new-page">
      <Node/>
      <CreateNodeButton/>
      <div className="button-container">
        <Button variant="contained" onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};

export default NewPage;
