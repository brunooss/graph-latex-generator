import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Node } from "../components/Node"
import { LatexPopup } from "../components/LatexPopup";

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [circles, setCircles] = useState<{x:number; y:number}[]>([]);
  const [lastX, setLastX] = useState(0);

  const addCircle = () => {
    const newCircles = [...circles, { x: lastX+50, y: 50 }]; 
    setCircles(newCircles);
    setLastX(lastX+60);
  };

  const [showPopup, setShowPopup] = useState(false);
  const handleShowPopup = () =>{
      setShowPopup(true);
  };
  const handleClosePopup = () =>{
      setShowPopup(false);
  };

  return (
    <div>
      <svg
          width="600"
          height="600"
          style={{ 
              backgroundColor: 'lightgray'
          }} 
        >
          {circles.map((circle, index) => (
            <Node key={index} x={circle.x} y={circle.y} />
          ))}
      </svg>
      <LatexPopup show={showPopup} onClose={handleClosePopup}/>
      <div className="button-container">
        <Button variant="contained" onClick={addCircle}>
          Add Circle
        </Button>
        <Button variant="contained" onClick={handleShowPopup}>
          Gerar Latex
        </Button>
        <Button variant="contained" onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};