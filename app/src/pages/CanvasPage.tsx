import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

type MyCicleProps = {
    x: number;
    y: number;
};
export const MyCircle: React.FC<MyCicleProps> = ({ x : initialX, y : initialY }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({x:0, y:0});
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);

    useEffect(() => {
        const handleMouseMove = (event : MouseEvent) => {
            if(isDragging){
                setX(event.clientX - offset.x);
                setY(event.clientY - offset.y);

                console.log({x, y});
            }
        };

        const handleMouseUp = () => {
            if(isDragging){
                setIsDragging(false);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, offset]);

    const handleMouseDown = (event : React.MouseEvent<SVGElement>) => {
        console.log("mousedown");
        setIsDragging(true);
        setOffset({
            x: event.clientX - x,
            y: event.clientY - y 
        });
    };

    return (
        <circle 
            cx={x} 
            cy={y}
            r={25}
            fill={'white'}
            stroke={'black'}
            strokeWidth={2.5}
            onMouseDown={handleMouseDown}
        />
    );
};

export const CanvasPage: React.FC = () => {
  const navigate = useNavigate();
  const [circles, setCircles] = useState<{x:number; y:number}[]>([
    {x : 50, y:50},
  ]);
  const [lastX, setLastX] = useState(60);

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
          <MyCircle key={index} x={circle.x} y={circle.y} />
        ))}
    </svg>
      <div className="button-container">
        <Button variant="contained" onClick={addCircle}>
          Add Circle
        </Button>
        <p></p>
        <Button variant="contained" onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};