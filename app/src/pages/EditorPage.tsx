import { useNavigate } from "react-router-dom";
import React, { useState, useRef, createRef } from "react";
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
    {idx: 0, x:500, y:300},
    {idx: 1, x:361.803, y:109.789},
    {idx: 2, x:138.197, y:182.443},
    {idx: 3, x:138.197, y:417.557},
    {idx: 4, x:361.803, y:490.211},
  ]);
  const [edgeList, setEdgeList ] = useState<FakeEdgeProps[]>([
    //{ i: 0, j: 1, edgeRef: useRef<EdgeRef>({} as EdgeRef) },
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
      if((edge.i == idx || edge.j == idx) && edge.edgeRef && edge.edgeRef.current){
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

  // Isso daqui é utilizado para conseguir criar varias Refs para as arestas.
  const [numberOfEdges, setNumberOfEdges] = useState(1);
  const [edgeRefs, setEdgeRefs] = React.useState<React.MutableRefObject<EdgeRef>[]>([]);
  // Fim


  React.useEffect(() => {
    // Isso daqui atualiza as Refs
    setEdgeRefs((edgeRefs) =>
      Array(numberOfEdges)
        .fill(null)
        .map((_, i) => edgeRefs[i] || createRef<EdgeRef>()),
    );
    // Fim das refs

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        // Remove the last added index from selectedNodes
        setLastSelectedNode(-1);
      }
    };

    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keyup", handleKeyUp);
    };

  }, [numberOfEdges ]);

  const handleInsertEdge = (i : number, j : number) => {
    // Proibe arestas múltiplas
    for (const edge of edgeList) {
      if((edge.i == i && edge.j == j) || (edge.i == j && edge.j == i)){
        return;
      }
    }

    // Adiciona uma nova aresta na lista
    setNumberOfEdges(numberOfEdges+1); // aqui uma nova Ref é criada
    const newEdge: FakeEdgeProps = {
      i: i,
      j: j,
      edgeRef: edgeRefs[numberOfEdges-1]
    };
    const newList = [...edgeList, newEdge];
    setEdgeList(newList);
  }

  const [lastSelectedNode, setLastSelectedNode] = useState(-1);
  // Ao clicar em um nó com Ctrl segurado
  const handleNodeCtrlClick = (idx: number) => {
    if(lastSelectedNode == -1){
      setLastSelectedNode(idx);
    }
    else{
      handleInsertEdge(lastSelectedNode, idx);
      setLastSelectedNode(idx);
    }
  };

  return (
    <div>
      <p>
      Para adicionar uma aresta, segure Ctrl, e clique em 2 vértices.
      </p>

      <svg
          width="600"
          height="600"
          style={{ 
              backgroundColor: 'lightgray'
          }} 
        >

      {edgeList.map((edge) => (
        <Edge 
          key={`${edge.i},${edge.j}`}
          i={edge.i} 
          j={edge.j} 
          initialX1={nodeList[edge.i].x}
          initialY1={nodeList[edge.i].y}
          initialX2={nodeList[edge.j].x}
          initialY2={nodeList[edge.j].y}
          ref={edge.edgeRef}
        />
      ))}

      {nodeList.map((node) => (
          <Node 
            key={node.idx}
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
        <LatexPopup 
          nodeData={nodeList}
          edgeData={edgeList}
        />
        <Button onClick={() => navigate("../")}>
          Voltar para a tela anterior
        </Button>
      </div>
    </div>
  );
};