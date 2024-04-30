// DialogBox.js
import React from "react";

const DialogBox = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="dialogBox">
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default DialogBox;
