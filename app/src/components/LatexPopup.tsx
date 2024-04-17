import * as React from "react";
import {
  Unstable_Popup as BasePopup,
  PopupPlacement,
} from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import { Button } from "./Button";
import { EdgeRef } from "./Edge";
import { Modal } from "./Modal";

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
interface LatexPopupProps {
  nodeData: NodeData[];
  edgeData: EdgeData[];
}

export const LatexPopup: React.FC<LatexPopupProps> = ({
  nodeData,
  edgeData,
}) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [placement] = React.useState<PopupPlacement>("top");
  const [text, setText] = React.useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  const scale = 200;

  const generateLatex = () => {
      let res = '';
      res += '% Include if not yet.\n'
      res += '\\usepackage{tikz}\n'
      res += '\n'

      res += '% Scale image if necessary\n'
      res += '\\def \\scaleFactor {1.5}\n';
      res += '\\begin{tikzpicture}[scale=\\scaleFactor, every node/.style={scale=\\scaleFactor}]\n';
      res += '\n'

      res += '\t% Styles definition\n';
      res += '\t%\t To change vertex size, change the minimum widht parameter.\n';
      res += '\t\\tikzstyle{every node}=[font=\\small]\n';
      res += '\t\\tikzstyle{vert}  = [circle, minimum width=5pt, draw, inner sep=0pt]\n';
      res += '\t\\tikzstyle{varvert} = [circle, minimum width=5pt, fill, inner sep=0pt]\n';
      res += '\n'

      res += '\t% Declaring nodes\n';
      nodeData.forEach((node) => {
        res += `\t\\node[vert] (${node.idx}) at (${node.x/scale},${node.y/scale}) {};\n`;
      });
      res += '\n'

    res += "\t% Declaring edges\n";
    edgeData.forEach((edge) => {
      res += `\t\\draw (${edge.i}) -- (${edge.j});\n`;
    });
    res += "\n";

    res += "\\end{tikzpicture}\n";

    return res;
  };

  React.useEffect(() => {
    if (anchor) {
      setText(generateLatex());
    }
  }, [anchor]);

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        Gerar Latex
      </Button>

      <Modal
        visible={!!anchor}
        title="Código LaTeX"
        onClose={() => setAnchor(null)}
      >
        {text}
      </Modal>
    </div>
  );
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 10px 10px;
  margin-left: 100px;
  border-radius: 6px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
  white-space: pre-wrap;
`
);

export default LatexPopup;
