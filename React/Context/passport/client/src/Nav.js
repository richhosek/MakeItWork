import React from "react";
import { IdentityContext } from "./identity-context";

class Nav extends React.Component {
    render() {
        return (
            <IdentityContext.Consumer>
                {({user, logout}) => (
                    <div>
                        <span>{user.username}</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </IdentityContext.Consumer>
        )
    }
}

export default Nav;