import React from 'react';
import { Button } from "@mui/material"
import './LatexPopup.css'

interface PopupProps {
    show: boolean;
    onClose: () => void;
}
export const LatexPopup: React.FC<PopupProps> = ({ show, onClose  }) => {
    const showHideClassName = show ? "popup display-block" : "popup display-none";

    return (
        <div className={showHideClassName} >
            <Button variant="contained" onClick={onClose}>
                Close
            </Button>
        </div>
    );
};