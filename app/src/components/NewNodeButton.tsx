import React, { useState, useEffect } from "react";
import Node from "./Node";

/*
    After clicking on the button, select a place where a node will be craeted. 
    After the node is created, the button is off, so that you can add only one 
    node at a time.
*/

const jsxElementArray: React.ReactNode[] = [];

const CreateNodeButton = () => {
    const [isOn, setIsOn] = useState(false);
    const [nodes, setNodes] = useState(jsxElementArray);

    useEffect(() =>{
        const handleClick = (event : any) => {
            if(isOn){
                const newNode = <Node 
                    key={nodes.length}
                    />;
                // setNodes(nodes.concat(<Node key={nodes.length} />));
                setNodes([...nodes, newNode]);

                console.log(event.clientX);
                console.log(event.clientY);

                setIsOn(false);
            }
        };

        if(isOn){
            document.addEventListener("click", handleClick);
        } else {
            document.removeEventListener("click", handleClick);
        }

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [ isOn, nodes ]);

    const handleButtonClick = () => {
        setIsOn(true);
    };  

    return (
        <div>
        <button onClick={handleButtonClick}>
            {isOn ? "Click to add Node" : "Adding Node"}
        </button>
        {nodes} 
        </div>
    );
};

export default CreateNodeButton;