import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import Node from "../components/Node"

export const NewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Node/>
      <div className="card">
        <Button variant="contained" onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </>
  );
};
