import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

type EdgeProps = {
    i: number;
    j: number;
    initialX1 : number,
    initialY1 : number,
    initialY2 : number,
    initialX2 : number,
};
export interface EdgeRef {
    callEdgeMove: (idx : number, newX : number, newY : number ) => void;
}

export const Edge: React.ForwardRefRenderFunction<EdgeRef, EdgeProps> = (
    { i, j, initialX1, initialY1, initialX2, initialY2 },
    ref
) => {

    // Relacionados ao enpoint i
    const [isDragging1, setIsDragging1] = useState(false);
    const [offset1, setOffset1] = useState({x:0, y:0});
    const [x1, setX1] = useState(initialX1);
    const [y1, setY1] = useState(initialY1);

    // Relacionados ao enpoint j
    const [isDragging2, setIsDragging2] = useState(false);
    const [offset2, setOffset2] = useState({x:0, y:0});
    const [x2, setX2] = useState(initialX2);
    const [y2, setY2] = useState(initialY2);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging1) {
                setX1(event.clientX - offset1.x);
                setY1(event.clientY - offset1.y);
            }
            if (isDragging2) {
                setX2(event.clientX - offset2.x);
                setY2(event.clientY - offset2.y);
            }
        };

        const handleMouseUp = () => {
            if (isDragging1) {
                setIsDragging1(false);
            }
            if (isDragging2) {
                setIsDragging2(false);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging1, offset1, isDragging2, offset2 ]);

    // Isso daqui é chamado pelo Editor para inicializar o useEffect
    useImperativeHandle(ref, () => ({
        callEdgeMove(idx : number, newX : number, newY : number) {
            if(idx == i){
                setIsDragging1(true);
                setOffset1({
                    x: newX - x1,
                    y: newY - y1,
                });
            }
            if(idx == j){
                setIsDragging2(true);
                setOffset2({
                    x: newX - x2,
                    y: newY - y2,
                });
            }
        }
    }));

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

export default forwardRef(Edge);