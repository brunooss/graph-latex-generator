import styled from "@emotion/styled";
import React from "react";
import { EdgeRef } from "./Edge";

interface NodeData {
  idx: number;
  x: number;
  y: number;
}
interface EdgeData {
  i: number;
  j: number;
  edgeRef: React.MutableRefObject<EdgeRef>;
}

export const Modal: React.FC<{
  visible: boolean;
  title: string;
  children: React.ReactNode;
  nodeData: NodeData[];
  edgeData: EdgeData[];
  onGenerateImage: () => void;
  onClose: () => void;
}> = ({
  visible,
  title,
  children,
  onClose,
  onGenerateImage,
  nodeData,
  edgeData,
}) => {
  const [text, setText] = React.useState<string>("");
  const open = Boolean(visible);
  const id = open ? "simple-popper" : undefined;

  const textRef = React.useRef<HTMLDivElement>(null);

  const copyToClipboard = React.useCallback(() => {
    if (!textRef?.current) return;

    // Copy the text inside the text field
    navigator.clipboard.writeText(textRef.current.innerText);

    // Alert the copied text
    alert("O código LaTeX foi salvo com sucesso em sua área de transferência!");
  }, [textRef]);

  const scale = 300;
  const generateLatex = () => {
    let res = "";
    res += "% Include tikz if not yet.\n";
    res += "% \\usepackage{tikz}\n";
    res += "\n";
  
    res += "% If you need to, you can scale the whole image or change\n";
    res += "% the sizes of the nodes by changing the parameters bellow.\n";
    res += "\\def \\scaleFactor {3}\n";
    res += "\\def \\nodeSize {8}\n";
    res += "\n";
  
    res += "% Begin Graph\n";
    res +=
      "\\begin{tikzpicture}[scale=\\scaleFactor, every node/.style={scale=\\scaleFactor}]\n";
    res += "\n";
  
    res += "\t% Styles definition\n";
    res += "\t\\tikzstyle{every node}=[font=\\small]\n";
    res +=
      "\t\\tikzstyle{vert}  = [circle, minimum width=\\nodeSize, draw, inner sep=0pt]\n";
    res +=
      "\t\\tikzstyle{varvert} = [circle, minimum width=\\nodeSize, fill, inner sep=0pt]\n";
    res += "\n";
  
    res += "\t% Declaring nodes\n";
    nodeData.forEach((node) => {
      // Inverte o sinal da coordenada Y
      res += `\t\\node[vert] (${node.idx}) at (${(node.x / scale).toFixed(3)},${(-(node.y / scale)).toFixed(3)}) {};\n`;
    });
    res += "\n";
  
    res += "\t% Declaring edges\n";
    edgeData.forEach((edge) => {
      res += `\t\\draw (${edge.i}) -- (${edge.j});\n`;
    });
    res += "\n";
  
    res += "\\end{tikzpicture}\n";
  
    return res;
  };

  React.useEffect(() => {
    if (visible) {
      setText(generateLatex());
    }
  }, [visible]);

  const PopupBody = styled("div")(
    () => `
    width: max-content;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
    white-space: pre-wrap;
  `
  );

  return (
    <div className="h-screen w-screen absolute top-0 left-0 bottom-0 right-0">
      {visible && (
        <div className="absolute top-0 left-0 z-[200] h-full w-full bg-gray-500 opacity-70"></div>
      )}
      {visible && (
        <div className="size-full fixed top-0 start-0 z-[300] overflow-x-hidden transition-all overflow-y-auto pointer-events-none">
          <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3 className="font-bold text-gray-800 ">{title}</h3>
                <button
                  onClick={onClose}
                  type="button"
                  className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none neutral-700"
                  data-hs-overlay="#hs-basic-modal"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <PopupBody ref={textRef}> {text} </PopupBody>
              </div>
              <div className="flex justify-center items-center gap-x-2 py-3 px-4 border-t 700">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={onGenerateImage}
                >
                  Gerar Imagem
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={copyToClipboard}
                >
                  Copiar para a Área de Transferência
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
