import React, { useEffect, useRef } from 'react';

type EdgeProps = {
    i: number;
    j: number;
};
export const Edge: React.FC<EdgeProps> = ({ i, j }) => {
    return (
        <line
            x1={i}
            y1={i}
            x2={j}
            y2={j}
            stroke="black"
            strokeWidth={2}
        />
    );
};