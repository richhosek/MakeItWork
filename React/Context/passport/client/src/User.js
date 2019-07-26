import React from "react";
import { IdentityContext } from "./identity-context";

function User() {
    return (
        <IdentityContext.Consumer>
            {({user}) => (
            <div style={{width: 200, height: 200, backgroundColor: "darkBlue", color: "white"}}>
                <h3>{user.username}</h3>
            </div>
            )}
        </IdentityContext.Consumer>
    )
}

export default User;