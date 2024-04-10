import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Node } from "../components/Node";
import { Edge } from "../components/Edge";
import LatexPopup from "../components/LatexPopup";
import "./EditorPage.css";
import { Button } from "../components/Button";

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [circles, setCircles] = useState<
    {
      x: number;
      y: number;
      isDragging: boolean;
      edgeOffsetX: number;
      edgeOffsetY: number;
    }[]
  >([
    { x: 150, y: 300, isDragging: false, edgeOffsetX: 0, edgeOffsetY: 0 },
    { x: 450, y: 300, isDragging: false, edgeOffsetX: 0, edgeOffsetY: 0 },
  ]);
  const [lastX, setLastX] = useState(0);

  const [creatingLine, setCreatingLine] = React.useState(false);
  const [newLine, setNewLine] = React.useState<{
    originNodeIndex: number;
    x: number;
    y: number;
  }>();

  const addCircle = () => {
    const newCircles = [
      ...circles,
      {
        x: lastX + 50,
        y: 50,
        isDragging: false,
        edgeOffsetX: 0,
        edgeOffsetY: 0,
      },
    ];
    setCircles([...newCircles]);
    setLastX(lastX + 60);
  };

  // const [isDragging1, setIsDragging1] = useState(false);
  // const [edgeOffset1, setEdgeOffset1] = useState({ x: 0, y: 0 });
  // const [endpoint1, setEndpoint1] = useState({
  //   x: circles[0].x,
  //   y: circles[0].y,
  // });

  // const [isDragging2, setIsDragging2] = useState(false);
  // const [edgeOffset2, setEdgeOffset2] = useState({ x: 0, y: 0 });
  // const [endpoint2, setEndpoint2] = useState({
  //   x: circles[1].x,
  //   y: circles[1].y,
  // });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!creatingLine) {
        const updatedCircles = circles;

        for (let i = 0; i < circles.length; i++) {
          const circle = updatedCircles[i];

          if (circle.isDragging) {
            let updatedCircle = {
              ...circle,
              isDragging: true,
              x: event.clientX - circle.edgeOffsetX,
              y: event.clientY - circle.edgeOffsetY,
            };

            updatedCircles[i] = updatedCircle;
          }
        }

        setCircles([...updatedCircles]);
      } else {
        setNewLine((currentNewLine) => {
          if (!currentNewLine) return;

          const circle = circles[currentNewLine.originNodeIndex];

          return {
            ...currentNewLine,
            x: event.clientX - circle.edgeOffsetX,
            y: event.clientY - circle.edgeOffsetY,
          };
        });
      }
    };

    const handleMouseUp = () => {
      const updatedCircles = circles;

      for (let i = 0; i < circles.length; i++) {
        const circle = updatedCircles[i];

        if (circle.isDragging) {
          circle.isDragging = false;

          updatedCircles[i] = circle;
        }
      }

      setCircles([...updatedCircles]);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [circles, setCircles]);

  const handleNodeMoved = (newX: number, newY: number, idx: number) => {
    let currentCircle = circles[idx];

    const movingCircle = {
      ...currentCircle,
      isDragging: true,
      edgeOffsetX: -currentCircle.x + newX,
      edgeOffsetY: -currentCircle.y + newY,
    };

    const updatedCircles = circles;

    updatedCircles[idx] = movingCircle;

    setCircles(updatedCircles);
  };

  const handleNewLineMoved = (newX: number, newY: number, idx: number) => {
    let currentCircle = circles[idx];

    const movingCircle = {
      ...currentCircle,
      edgeOffsetX: -currentCircle.x + newX,
      edgeOffsetY: -currentCircle.y + newY,
    };

    const updatedCircles = circles;

    updatedCircles[idx] = movingCircle;

    setCircles(updatedCircles);
  };

  return (
    <div>
      <svg
        width="600"
        height="600"
        style={{
          backgroundColor: "lightgray",
        }}
      >
        {circles.map((circle, index) =>
          circles.map((adjacent, adjacentIndex) => (
            <Edge x1={circle.x} y1={circle.y} x2={adjacent.x} y2={adjacent.y} />
          ))
        )}

        {circles.map((circle, index) => (
          <Node
            idx={index}
            x={circle.x}
            y={circle.y}
            onMoved={creatingLine ? handleNewLineMoved : handleNodeMoved}
            adjacents={[] /* TODO: Adicionar adjacências dinamicamente */}
            onRightClick={() => {
              setCreatingLine((creatingLine) => !creatingLine);
              setNewLine({ originNodeIndex: index, x: circle.x, y: circle.y });
            }}
          />
        ))}

        {creatingLine && newLine && (
          <Edge
            x1={circles[newLine.originNodeIndex].x}
            y1={circles[newLine.originNodeIndex].y}
            x2={newLine.x}
            y2={newLine.y}
          />
        )}
      </svg>
      <div className="button-container">
        <Button onClick={addCircle}>Add Circle</Button>
        <LatexPopup />
        <Button onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};
