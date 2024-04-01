import {useEffect, useState} from "react";
import './Node.css'; // Import CSS for styling (optional)

export default function node(){
    const [isDraggin, setisDrgaggin] = useState(false);
    const [position, setPosition] = useState({x:0, y:0});
    const [offset, setOffset] = useState({x:0, y:0});

    
    useEffect(() => {
        const handleMouseMove = (event : any) => {
          if (isDraggin) {
            setPosition({
              x: event.clientX - offset.x,
              y: event.clientY - offset.y
            });
          }
        };
    
        const handleMouseUp = () => {
          if (isDraggin) {
            setisDrgaggin(false);
          }
        };
    
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }, [isDraggin, offset]);
    
      const handleMouseDown = (event : any) => {
        setisDrgaggin(true);
        setOffset({
          x: event.clientX - position.x,
          y: event.clientY - position.y
        });
      };
    

    return (
        <div 
        className="node"
        style = {{top : position.y, left: position.x}}
        onMouseDown={handleMouseDown}
        />
    );
}