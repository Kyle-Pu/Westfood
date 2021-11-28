import React, { useState } from "react";
import { Navigate, Route } from "react-router";

const NotFoundPage = () => {
    
    const [goHome, setGoHome] = useState(false);

    const handleClick = () => {
        setGoHome(true); // Indicated button is pressed
    }

    return(
        <div>
            <h1>ERROR!</h1>
            <p>Page not found!</p>
            <button onClick = {handleClick}>Go Home</button>

            <Route>
                {goHome ? <Redirect to="/"/> : <Redirect to="/404"/>}
            </Route>
        </div>
    );
};

export default NotFoundPage;
