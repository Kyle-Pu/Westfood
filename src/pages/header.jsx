import React from "react"
import { Link } from "react-router-dom"

const Header = (props) => {
    return(
        <header>
            <div>
                <Link to="/users">Users</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;