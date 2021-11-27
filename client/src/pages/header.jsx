import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../pages/header.css'
import * as api from "../api.js"

const Header = (props) => {

    let [users, setUsers] = useState([]);

    useEffect(() => {
        api.getUsers().then(data => {
            //setUsers(data['data']);
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
                    <div className="nav-logout-div">
                        <button id="logout-button" onClick={props.logout}>Log out</button>
                    </div>
                </div>
            </div>
        );
}

export default Header;