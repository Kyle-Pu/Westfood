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
        return ", login above!"
    }

    return(
        <header>
            <div class="nav_links">
                <li><Link to="/">Home</Link></li>
                <br/>
                <li><Link to="/users">Users</Link></li>
                <br/>
                <li><Link to="/register">Register</Link></li>
                <br/>
                <li><Link to="/login">Login</Link></li>
                <br/>
                <li><Link to="/restaurants">Restaurants</Link></li>
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