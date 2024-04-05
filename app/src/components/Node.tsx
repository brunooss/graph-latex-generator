import React, { useState, useEffect } from "react";

type NodeProps = {
    x: number;
    y: number;
};
export const Node: React.FC<NodeProps> = ({ x : initialX, y : initialY }) => {
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
    };

    return (
        <circle 
            cx={x} 
            cy={y}
            r={25}
            fill={'white'}
            stroke={'black'}
            strokeWidth={2.5}
            onMouseDown={handleMouseDown}
        />
    );
};