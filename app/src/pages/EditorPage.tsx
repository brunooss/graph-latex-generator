import { useNavigate } from "react-router-dom";
import React, { useState, createRef } from "react";
import { Node } from "../components/Node";
import Edge, { EdgeRef } from "../components/Edge";
import LatexPopup from "../components/LatexPopup";
import "./EditorPage.css";
import { Button } from "../components/Button";
import { BsPerson } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import { VscLoading } from "react-icons/vsc";

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
  const [authState, loadingAuthState, errorAuthState] = useAuthState(auth);

  const navigate = useNavigate();
  const [nodeList, setNodeList] = useState<FakeNodeProps[]>([
    { idx: 0, x: 500, y: 300 },
    { idx: 1, x: 361.803, y: 109.789 },
    { idx: 2, x: 138.197, y: 182.443 },
    { idx: 3, x: 138.197, y: 417.557 },
    { idx: 4, x: 361.803, y: 490.211 },
  ]);
  const [edgeList, setEdgeList] = useState<FakeEdgeProps[]>([
    //{ i: 0, j: 1, edgeRef: useRef<EdgeRef>({} as EdgeRef) },
  ]);

  // Criando um novo nó
  const handleInsertNode = (idx: number) => {
    const newNode: FakeNodeProps = {
      idx: idx,
      x: 50,
      y: 50,
    };
    const newList = [...nodeList, newNode];
    setNodeList(newList);
  };
  // Ao mover um nó
  const handleNodeStartMoving = (newX: number, newY: number, idx: number) => {
    edgeList.forEach((edge) => {
      if (
        (edge.i == idx || edge.j == idx) &&
        edge.edgeRef &&
        edge.edgeRef.current
      ) {
        edge.edgeRef.current.callEdgeMove(idx, newX, newY);
      }
    });
  };
  // Atualiza as posição na lista de nós
  const handleNodeFinishedMoving = (
    lastX: number,
    lastY: number,
    idx: number
  ) => {
    const newList = nodeList;
    newList[idx].x = lastX;
    newList[idx].y = lastY;
    setNodeList(newList);
  };

  // Isso daqui é utilizado para conseguir criar varias Refs para as arestas.
  const [numberOfEdges, setNumberOfEdges] = useState(1);
  const [edgeRefs, setEdgeRefs] = React.useState<
    React.MutableRefObject<EdgeRef>[]
  >([]);
  // Fim

  React.useEffect(() => {
    // Isso daqui atualiza as Refs
    setEdgeRefs((edgeRefs) =>
      Array(numberOfEdges)
        .fill(null)
        .map((_, i) => edgeRefs[i] || createRef<EdgeRef>())
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
  }, [numberOfEdges]);

  const handleInsertEdge = (i: number, j: number) => {
    // Proibe arestas múltiplas
    for (const edge of edgeList) {
      if ((edge.i == i && edge.j == j) || (edge.i == j && edge.j == i)) {
        return;
      }
    }

    // Adiciona uma nova aresta na lista
    setNumberOfEdges(numberOfEdges + 1); // aqui uma nova Ref é criada
    const newEdge: FakeEdgeProps = {
      i: i,
      j: j,
      edgeRef: edgeRefs[numberOfEdges - 1],
    };
    const newList = [...edgeList, newEdge];
    setEdgeList(newList);
  };

  const [lastSelectedNode, setLastSelectedNode] = useState(-1);
  // Ao clicar em um nó com Ctrl segurado
  const handleNodeCtrlClick = (idx: number) => {
    if (lastSelectedNode == -1) {
      setLastSelectedNode(idx);
    } else {
      handleInsertEdge(lastSelectedNode, idx);
      setLastSelectedNode(idx);
    }
  };

  return (
    <>
      <div className="h-screen">
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-blue-600 text-sm py-3 sm:py-0">
          <nav
            className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex items-center justify-between">
              <a
                className="flex-none text-xl font-semibold text-white"
                href="#"
                aria-label="Brand"
              >
                Editor de grafo
              </a>
              <div className="sm:hidden">
                <button
                  type="button"
                  className="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-collapse="#navbar-collapse-with-animation"
                  aria-controls="navbar-collapse-with-animation"
                  aria-label="Toggle navigation"
                >
                  <svg
                    className="hs-collapse-open:hidden flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <line x1="3" x2="21" y1="12" y2="12" />
                    <line x1="3" x2="21" y1="18" y2="18" />
                  </svg>
                  <svg
                    className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              id="navbar-collapse-with-animation"
              className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
            >
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
                <a
                  className="font-medium text-white/80 hover:text-white sm:py-6"
                  href="#"
                >
                  Seus Grafos
                </a>
                <a
                  className="font-medium text-white/80 hover:text-white sm:py-6"
                  href="#"
                >
                  Editor de Grafos
                </a>

                <a
                  className="flex items-center gap-x-2 font-medium text-white/80 hover:text-white sm:border-s sm:border-white/30 sm:my-6 sm:ps-6"
                  href="./login"
                >
                  {loadingAuthState ? (
                    <div role="status">
                      <VscLoading className="animate-spin" />
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : authState ? (
                    <div className="flex items-center gap-4">
                      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-300">
                          {authState.displayName
                            ?.split(" ")
                            .map((s) => s.substring(0, 1))
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>

                      <div className="font-medium dark:text-white">
                        <div>
                          <p className="line-clamp-1">
                            {authState.displayName}
                          </p>
                        </div>
                        <div className="text-sm text-gray-300">
                          {authState.email}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <BsPerson /> Log In
                    </>
                  )}
                </a>
              </div>
            </div>
          </nav>
        </header>
        <main id="content" className="h-full">
          <div className="h-full max-w-[85rem] mx-auto">
            <div className="h-full grid grid-cols-3">
              <svg
                className="h-full w-full col-span-2"
                style={{
                  backgroundColor: "lightgray",
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

              <div className="flex flex-col p-4 m-4">
                <p>
                  Para adicionar uma aresta, segure Ctrl, e clique em 2
                  vértices.
                </p>
                <div className="flex flex-row gap-2">
                  <Button onClick={() => handleInsertNode(nodeList.length)}>
                    Insert Node
                  </Button>
                  <LatexPopup nodeData={nodeList} edgeData={edgeList} />
                  <Button onClick={() => navigate("../")}>
                    Voltar para a tela anterior
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
