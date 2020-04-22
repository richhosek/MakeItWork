import React from "react";
import RedBoxProps from "./RedBoxProps";

function BlueBoxProps(props) {
    return (
        <div className="blue">
            <RedBoxProps username={props.username} />
        </div>
    );
}

export default BlueBoxProps;