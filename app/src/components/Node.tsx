import React, { useState, useEffect } from "react";

export type NodeProps = {
    idx: number;
    x: number;
    y: number;
    onMoved: (newX : number, newY : number, idx : number) => void;
};

export const Node: React.FC<NodeProps> = ({ idx, x : initialX, y : initialY, onMoved }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({x:0, y:0});
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);

    useEffect(() => {
        const handleMouseMove = (event : MouseEvent) => {
            if(isDragging){
                setX(event.clientX - offset.x);
                setY(event.clientY - offset.y);
            }
        };

        const handleMouseUp = () => {
            if(isDragging){
                setIsDragging(false);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, offset]);

    const handleMouseDown = (event : React.MouseEvent<SVGElement>) => {
        setIsDragging(true);
        setOffset({
            x: event.clientX - x,
            y: event.clientY - y 
        });
        onMoved(event.clientX, event.clientY, idx);
    };

    return (
        <circle 
            cx={x} 
            cy={y}
            r={25}
            z-index={100}
            fill={'white'}
            stroke={'black'}
            strokeWidth={2.5}
            onMouseDown={handleMouseDown}
        />
    );
};