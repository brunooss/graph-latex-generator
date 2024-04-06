import React, { useEffect, useRef } from 'react';

type EdgeProps = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export const Edge: React.FC<EdgeProps> = ({ x1, y1, x2, y2 }) => {
    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth={2}
        />
    );
};