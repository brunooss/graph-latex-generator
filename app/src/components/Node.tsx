import React, { useState, useEffect } from "react";

type NodeProps = {
    idx: number;
    x: number;
    y: number;
    onMoved: (newX : number, newY : number, idx : number) => void;
    onCtrlClick: (idx : number) => void;
    onFinishedMoving: (finalX : number, finalY : number, idx : number) => void;
};

export const Node: React.FC<NodeProps> = ({ idx, x : initialX, y : initialY, onMoved, onCtrlClick, onFinishedMoving }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({x:0, y:0});
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        setX(event.clientX - offset.x);
        setY(event.clientY - offset.y);
      }
    };

        const handleMouseUp = (event : MouseEvent) => {
            if(isDragging){
                setIsDragging(false);
                onFinishedMoving(event.clientX - offset.x, event.clientY - offset.y, idx);
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
        if (event.ctrlKey) {
            onCtrlClick(idx);
        }   
        else{
                setIsDragging(true);
            setOffset({
                x: event.clientX - x,
                y: event.clientY - y 
            });
            onMoved(event.clientX, event.clientY, idx);
    }
    };

  return (
    <circle
      cx={x}
      cy={y}
      r={25}
      z-index={100}
      fill={"white"}
      stroke={"black"}
      strokeWidth={2.5}
      onMouseDown={handleMouseDown}
    />
  );
};

// @trassis adicionei uma lista de adjacências em cada Node e tornei os atributos específicos do componente como opcionais
//    (vamos mudar isso depois, às vezes fazer uma interface Node genérica passar ela no componente Node).
// Fiz também esse simples grafo de exemplo para a função LaTeX. Talvez o editor esteja quebrado ao clicar com o botão do meio do mouse,
//    nisso que estou trabalhando! 🚀
export const graph: NodeProps[] = [
  { idx: 0, x: 0, y: 1, adjacents: [3, 2, 1] },
  { idx: 1, x: 1, y: 1, adjacents: [0, 3, 2] },
  { idx: 2, x: 1, y: 0, adjacents: [1, 0, 3] },
  { idx: 3, x: 0, y: 0, adjacents: [2, 1, 0] },
];
