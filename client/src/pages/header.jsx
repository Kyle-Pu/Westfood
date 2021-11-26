import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import * as api from "../api.js"

const Header = (props) => {

    let [users, setUsers] = useState([]);

    useEffect(() => {
        api.getUsers().then(data => {
            setUsers(data['data']);
            console.log(data)
        });
    }, []);

    const getUser = (id) => {
        for(let i = 0; i < users.length; i++){
            if(users[i]._id == id){
                console.log(users[i].firstName)
                return users[i].firstName
            }
        }
    }

    return(
        <header>
            <div>
                <Link to="/">Home</Link>
                <br/>
                <Link to="/users">Users</Link>
                <br/>
                <Link to="/register">Register</Link>
                <br/>
                <Link to="/login">Login</Link>
                <br/>
                <Link to="/restaurants">Restaurants</Link>
                <br/>
                <p>Hi {getUser(props.user_id_cookie)}</p>
                <br />
                <button onClick={props.logout}>Logout</button>
            </div>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;