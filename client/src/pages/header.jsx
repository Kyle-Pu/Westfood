import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../pages/header.css'
import * as api from "../api.js"
import navpfp from '../images/pfp-icon.png';

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
            console.log(users[i])
            if(users[i]._id == id){
                console.log(users[i].firstName)
                return users[i].firstName + " " + users[i].lastName
            }
        }
        return "Please Login!"
    }

    return(
            <div>
                <div className="navbar-div">
                    <div className="nav-logo">
                        <div className="nav-title">WESTFOOD</div>
                        <div className="nav-desc">for UCLA students</div>
                    </div>
                    <div class="nav-links-div">
                        <Link to="/" className="navbar-link">
                            <div className="navbar-text">Home</div>
                        </Link>
                        <br/>
                        <Link to="/users" className="navbar-link">
                            <div className="navbar-text">Users</div>
                        </Link>
                        <br/>
                        <Link to="/restaurants" className="navbar-link">
                            <div className="navbar-text">Restaurants</div>
                        </Link>
                        <br/>
                        <Link to="/register" className="navbar-link">
                            <div className="navbar-text">Register</div>
                        </Link>
                        <br/>
                        <Link to="/login" className="navbar-link">
                            <div className="navbar-text">Login</div>
                        </Link>
                        <br/>
                    </div>
                    <div className="nav-user-logout-div">
                        <div className="nav-user-div">
                            <img src={navpfp} className="pfp-image"/>
                            <div className="nav-current-user">{getUser(props.user_id_cookie)}</div>
                        </div>
                        <div className="nav-logout-button-div">
                            <button id="logout-button" onClick={props.logout}>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Header;