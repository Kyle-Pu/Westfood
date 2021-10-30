import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div>
            <h1>Westwood Yelp</h1>
            <p>Home Page</p>
            
            <h3>Pages</h3>
            <Link to="/users">Users</Link>
        </div>
    );
};

export default HomePage;
