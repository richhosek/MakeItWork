import React from "react";
import UserNameProps from "./UserNameProps";

function RedBoxProps(props) {
    return (
        <div className="red">
            <UserNameProps username={props.username} />
        </div>
    );
}

export default RedBoxProps;