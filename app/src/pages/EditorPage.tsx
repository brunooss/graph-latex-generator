import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { Node } from "../components/Node"
import Edge, { EdgeRef } from "../components/Edge"
import LatexPopup  from "../components/LatexPopup"
import "./EditorPage.css"
import {Button} from '../components/Button'

// Aqui estão os parâmetros fakes que são usados nas listas
type FakeNodeProps = {
    idx: number;
    x: number;
    y: number;
};
type FakeEdgeProps = {
    i: number;
    j: number;
    edgeRef: React.MutableRefObject<EdgeRef>;
};

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [ nodeList, setNodeList ] = useState<FakeNodeProps[]>([
    { idx: 0, x: 100, y: 300 },
    { idx: 1, x: 500, y: 300 },
    { idx: 2, x: 300, y: 100 },
  ]);
  const [edgeList, setEdgeList ] = useState<FakeEdgeProps[]>([
    { i: 0, j: 1, edgeRef: useRef<EdgeRef>({} as EdgeRef) },
  ]);

  // Criando um novo nó
  const handleInsertNode = (idx : number) => {
    const newNode: FakeNodeProps = {
      idx : idx,
      x : 50,
      y : 50,
    };
    const newList = [...nodeList, newNode];
    setNodeList(newList);
  }
  // Ao mover um nó
  const handleNodeStartMoving = (newX : number, newY: number, idx: number) => {
    edgeList.forEach(edge => {
      if((edge.i == idx || edge.j == idx) && edge.edgeRef.current){
        edge.edgeRef.current.callEdgeMove(idx, newX, newY);
      }
    })
  };
  // Atualiza as posição na lista de nós
  const handleNodeFinishedMoving = (lastX : number, lastY: number, idx : number) =>{
    const newList = nodeList;
    newList[idx].x = lastX;
    newList[idx].y = lastY;
    setNodeList(newList);
  };

  // TEMOS QUE MUDAR AQUI! no momento, as Refs são substituídas quanto uma nova é criada: resultado é que as arestas param de ser movidas
  // só é movida a última, que possui a Ref mais recente.
  const myEdgeRef = useRef<EdgeRef>({} as EdgeRef);
  const handleInsertEdge = (i : number, j : number) => {
    const newEdge: FakeEdgeProps = {
      i: i,
      j: j,
      edgeRef: myEdgeRef,
    };
    const newList = [...edgeList, newEdge];
    setEdgeList(newList);
  }

  const handleNodeCtrlClick = (event: React.MouseEvent<SVGElement>, idx: number) => {
    if (event.ctrlKey) {
        if (event.button === 0) {
            console.log('Node clicado:', idx);
        }
    }
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

      {edgeList.map((edge, index) => (
        <Edge 
          i={edge.i} 
          j={edge.j} 
          initialX1={nodeList[edge.i].x}
          initialY1={nodeList[edge.i].y}
          initialX2={nodeList[edge.j].x}
          initialY2={nodeList[edge.j].y}
          ref={edge.edgeRef}
        />
      ))}

      {nodeList.map((node, index) => (
          <Node 
            idx={node.idx} 
            x={node.x} 
            y={node.y} 
            onMoved={handleNodeStartMoving}
            onCtrlClick={handleNodeCtrlClick}
            onFinishedMoving={handleNodeFinishedMoving}
          />
      ))}

      </svg>

      <div className="button-container">
        <Button onClick={() => handleInsertNode(nodeList.length)}>
          Insert Node
        </Button>
        <Button onClick={() => handleInsertEdge(nodeList.length-1, nodeList.length-2)}>
          Insert Edge
        </Button>
        <LatexPopup />
        <Button onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};