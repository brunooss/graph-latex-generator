import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Node, NodeProps } from "../components/Node"
import { Edge } from "../components/Edge"
import LatexPopup  from "../components/LatexPopup"
import "./EditorPage.css"
import {Button} from '../components/Button'


export const EditorPage: React.FC = () => {
  const navigate = useNavigate();


  /*
  const [isDragging1, setIsDragging1] = useState(false);
  const [edgeOffset1, setEdgeOffset1] = useState({ x: 0, y: 0 });
  const [endpoint1, setEndpoint1] = useState({
    x: circles[0].x, y : circles[0].y
  });

  const [isDragging2, setIsDragging2] = useState(false);
  const [edgeOffset2, setEdgeOffset2] = useState({ x: 0, y: 0 });
  const [endpoint2, setEndpoint2] = useState({
    x: circles[1].x, y : circles[1].y
  });

  useEffect(() => {
      const handleMouseMove = (event : MouseEvent) => {
          if(isDragging1){
              setEndpoint1({
                x: event.clientX - edgeOffset1.x,
                y: event.clientY - edgeOffset1.y,
              });
          }
          if(isDragging2){
              setEndpoint2({
                x: event.clientX - edgeOffset2.x,
                y: event.clientY - edgeOffset2.y,
              });
          }
      };

      const handleMouseUp = () => {
          if(isDragging1){
              setIsDragging1(false);
          }
          if(isDragging2){
              setIsDragging2(false);
          }
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      };
  }, [isDragging1, isDragging2]);
  */

  const handleNodeMoved = (newX : number, newY: number, idx: number) => {
    /*
    if(idx == 0){
      setIsDragging1(true);
      setEdgeOffset1({
        x: -endpoint1.x + newX,
        y: -endpoint1.y + newY,
      });
    }
    if(idx == 1){
      setIsDragging2(true);
      setEdgeOffset2({
        x: -endpoint2.x + newX,
        y: -endpoint2.y + newY,
      });
    }
    */
  };

  const [ nodeList, setNodeList ] = useState<NodeProps[]>([]);
  const handleInsertNode = (newNode : NodeProps) => {
    const newList = [...nodeList, newNode];
    setNodeList(newList);
  }

  return (
    <div>
      <svg
          width="600"
          height="600"
          style={{ 
              backgroundColor: 'lightgray'
          }} 
        >

      {nodeList.map((node, index) => (
          <Node idx={index} x={node.x} y={node.y} onMoved={node.onMoved}/>
      ))}

      </svg>
      <div className="button-container">
        <Button onClick={() => handleInsertNode({
          idx: 10,
          x: 200,
          y: 200,
          onMoved: handleNodeMoved
        })}>
          New Add node
        </Button>
        <LatexPopup />
        <Button onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};