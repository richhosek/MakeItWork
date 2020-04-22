import React from "react";
import { IdentityContext } from "../IdentityContext";

class Nav extends React.Component {
    render() {
        return (
            <IdentityContext.Consumer>
                {({user, logout, loggedIn}) => (
                    <div>
                        {loggedIn ? 
                        <>
                            <span>{user.username} </span>
                            <button onClick={logout}>Logout</button>
                        </> :
                        <span>Use the form below to log in</span>
                        }       
                    </div>
                )}
            </IdentityContext.Consumer>
        )
    }
}

export default Nav;