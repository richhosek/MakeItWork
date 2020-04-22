import React from "react";
import { MeContext } from "./MeContext";

function Me() {
    return (
        <MeContext.Consumer>
            {({name, favoriteFood}) => {
                return(
                    <p>My name is {name} and my favorite food is {favoriteFood}</p>
                )
            }}
            
        </MeContext.Consumer>
    )
}

export default Me;