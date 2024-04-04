import React from "react";
import './Edge.css'; // Import CSS for styling (optional)

interface EdgeProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

const Edge: React.FC<EdgeProps> = ({ start, end }) => {
  const [points, setPoints] = React.useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  React.useEffect(() => {
    const updatePoints = () => {
      const startX = start.x;
      const startY = start.y;
      const endX = end.x;
      const endY = end.y;
      setPoints({ x1: startX, y1: startY, x2: endX, y2: endY });
    };

    updatePoints();

    const handleResize = () => {
      updatePoints();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [start, end]);

  return (
    <svg className="edge">
      <line x1={points.x1} y1={points.y1} x2={points.x2} y2={points.y2} />
    </svg>
  );
}

export default Edge;
