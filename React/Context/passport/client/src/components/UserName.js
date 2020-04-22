import React from "react";
import { IdentityContext } from "../identity-context";

function UserName() {
    return (
        <IdentityContext.Consumer>
            {({ user }) => (
                <h3>
                    {user.username}
                </h3>
            )}
        </IdentityContext.Consumer>

    );
}

export default UserName