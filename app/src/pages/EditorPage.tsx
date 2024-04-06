import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Node } from "../components/Node"
import LatexPopup  from "../components/LatexPopup"
import "./EditorPage.css"
import {Button} from '../components/Button'

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [circles, setCircles] = useState<{x:number; y:number}[]>([]);
  const [lastX, setLastX] = useState(0);

  const addCircle = () => {
    const newCircles = [...circles, { x: lastX+50, y: 50 }]; 
    setCircles(newCircles);
    setLastX(lastX+60);
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
      <div className="button-container">
        <Button onClick={addCircle}>
          Add Circle
        </Button>
        <LatexPopup />
        <Button onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};