import { useNavigate, useParams } from "react-router-dom";
import React, { useState, createRef } from "react";
import { Node } from "../components/Node";
import Edge, { EdgeRef } from "../components/Edge";
import "./EditorPage.css";
import { Button } from "../components/Button";
import { BsPerson } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase-config";
import { VscLoading } from "react-icons/vsc";
import { Modal } from "../components/Modal";
import { ref, set, update } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { isEqual } from "lodash";

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
  const { graphId } = useParams();
  const currentGraphId = React.useMemo(() => {
    return graphId ?? crypto.randomUUID();
  }, [graphId]);

  const [authState, loadingAuthState, errorAuthState] = useAuthState(auth);

  const navigate = useNavigate();
  const [nodeList, setNodeList] = useState<FakeNodeProps[]>([]);
  const [edgeList, setEdgeList] = useState<FakeEdgeProps[]>([
    //{ i: 0, j: 1, edgeRef: useRef<EdgeRef>({} as EdgeRef) },
  ]);

  // insere um no
  const handleInsertNode = (idx: number) => {
    if (nodeList.length > 0) {
      const lastNode = nodeList[nodeList.length - 1];

      const newX = lastNode.x + 10;
      const newY = lastNode.y + 10;
      const newNode: FakeNodeProps = {
        idx: idx,
        x: newX,
        y: newY,
      };
      const newList = [...nodeList, newNode];
      setNodeList(newList);
    } else {
      const newNode: FakeNodeProps = {
        idx: idx,
        x: 50,
        y: 250,
      };
      // Adiciona o novo nó à lista
      const newList = [...nodeList, newNode];
      setNodeList(newList);
    }
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
    for (let k = 0; k < edgeList.length; k++) {
      const edge = edgeList[k];

      if ((edge.i == i && edge.j == j) || (edge.i == j && edge.j == i)) {
        const newList = [...edgeList.slice(0, k), ...edgeList.slice(k + 1)];
        setEdgeList(newList);
        return;
      }
    }

    // Adiciona uma nova aresta na lista
    setNumberOfEdges(numberOfEdges + 1);
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

  const [opened, setOpened] = React.useState(false);

  const id = opened ? "simple-popper" : undefined;
  const handleClick = () => {
    setOpened(true);
  };

  const svgRef = React.useRef<SVGSVGElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [imageUrl, setImageUrl] = React.useState<string>();

  const generateImage = React.useCallback(
    (download: boolean = true) => {
      if (!svgRef.current) return;

      function triggerDownload(imgURI: string) {
        const a = document.createElement("a");
        a.download = "grafo.png";
        a.target = "_blank";
        a.href = imgURI;

        // trigger download button
        // (set `bubbles` to false here.
        // or just `a.click()` if you don't care about bubbling)
        a.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: false,
            cancelable: true,
          })
        );
      }

      const svgNode = svgRef.current;

      const svgString = new XMLSerializer().serializeToString(svgNode as Node);
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });

      const DOMURL = window.URL || window.webkitURL || window;
      const url = DOMURL.createObjectURL(svgBlob);

      const image = new Image();
      image.width = svgNode.width.baseVal.value;
      image.height = svgNode.height.baseVal.value;
      image.src = url;
      image.onload = function () {
        if (!canvasRef.current) return;

        canvasRef.current.width = image.width;
        canvasRef.current.height = image.height;

        const ctx = canvasRef.current.getContext("2d");
        ctx?.drawImage(image, 0, 0);
        DOMURL.revokeObjectURL(url);

        const imgURI = canvasRef.current
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        setImageUrl(imgURI);

        if (download) triggerDownload(imgURI);
      };
    },
    [svgRef, canvasRef]
  );

  const [graphSnapshot, loadingGraph, errorGraph] = useObject(
    ref(db, `users/${authState?.uid}/graphs/${graphId}`)
  );

  React.useEffect(() => {
    if (loadingGraph) return;

    const graph = graphSnapshot?.val() as {
      image: string;
      edgeList: {
        i: number;
        j: number;
      }[];
      nodeList: {
        idx: number;
        x: number;
        y: number;
      }[];
    };

    if (graph?.nodeList) setNodeList(graph.nodeList);
    else {
      setNodeList([]);
    }
    if (graph?.nodeList && graph?.edgeList) {
      setEdgeRefs((edgeRefs) =>
        Array(graph.edgeList.length)
          .fill(null)
          .map((_, i) => edgeRefs[i] || createRef<EdgeRef>())
      );

      setEdgeList(
        graph.edgeList.map((edge, edgeId) => ({
          i: edge.i,
          j: edge.j,
          edgeRef: edgeRefs[edgeId],
        }))
      );
    }
  }, [graphSnapshot, loadingGraph, setNodeList, setEdgeList, setEdgeRefs]);

  React.useEffect(() => {}, [edgeList, edgeRefs]);

  React.useEffect(() => {
    if (
      !authState ||
      loadingGraph ||
      nodeList === undefined ||
      edgeList === undefined
    )
      return;

    // const graph = graphSnapshot?.val() as {
    //   image: string;
    //   edgeList: {
    //     i: number;
    //     j: number;
    //   }[];
    //   nodeList: {
    //     idx: number;
    //     x: number;
    //     y: number;
    //   }[];
    // };

    generateImage(false);

    update(ref(db, "users/" + authState.uid + "/graphs/" + currentGraphId), {
      ...(imageUrl ? { image: imageUrl } : {}),
      nodeList,
      edgeList: edgeList.map((edge) => ({ i: edge.i, j: edge.j })),
    });

    // if (
    //   isEqual(nodeList, graph.nodeList) ||
    //   isEqual(
    //     edgeList.map((edge) => ({ i: edge.i, j: edge.j })),
    //     graph.edgeList.map((edge, edgeId) => ({ i: edge.i, j: edge.j }))
    //   )
    // ) {
    // } else {

    // }
  }, [authState, currentGraphId, setNodeList, setEdgeList, nodeList, edgeList]);

  return (
    <Modal
      visible={opened}
      title="Código LaTeX"
      onGenerateImage={() => generateImage()}
      onClose={() => setOpened(false)}
      nodeData={nodeList}
      edgeData={edgeList}
    >
      <canvas ref={canvasRef} id="canvas" className="hidden"></canvas>
      <div className="h-screen">
        <header className="absolute flex flex-wrap sm:justify-start sm:flex-nowrap z-[100] w-full bg-blue-600 text-sm py-3 sm:py-0">
          <nav
            className="relative max-w-[85rem] z-50 w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
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
                    strokeWidth="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
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
                  href="/"
                >
                  Seus Grafos
                </a>
                <a
                  className="font-medium text-white/80 hover:text-white sm:py-6"
                  href="#"
                >
                  Graphex
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
        {loadingAuthState && loadingGraph ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <main id="content" className="">
            <div className="h-full max-w-[85rem] mx-auto">
              <div className="h-full grid grid-cols-3">
                <svg
                  ref={svgRef}
                  className="h-screen absolute top-0 left-0 z-2 w-full col-span-2"
                  style={{
                    backgroundColor: "white",
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

                <div className="flex flex-col p-4 m-4 rounded-xl bg-gray-200 absolute md:top-24 lg:top-24 lg:right-2 ">
                  <p>
                    Para adicionar uma aresta, segure Ctrl, e clique em 2
                    vértices.
                  </p>
                  <div className="flex flex-row gap-2">
                    <Button onClick={() => handleInsertNode(nodeList.length)}>
                      Insert Node
                    </Button>
                    <Button
                      aria-describedby={id}
                      type="button"
                      onClick={handleClick}
                    >
                      Exportar Grafo
                    </Button>
                    <Button onClick={() => navigate("../")}>
                      Voltar para a tela anterior
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </Modal>
  );
};
