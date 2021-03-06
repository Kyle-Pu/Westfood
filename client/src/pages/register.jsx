import React, { useState } from 'react'
import Footer from "../pages/footer"
import Header from "../pages/header"
import { Link } from "react-router-dom"
import * as api from "../api.js"
import '../pages/register.css'
import Cookies from 'universal-cookie'
import register_food from '../images/register-pic.jpeg';

const cookies = new Cookies();

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        api.addUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.email,
            password: this.state.password
        });
        alert(`Thanks for registering ${this.state.firstName}!`)
    }

    handleChange(event){
        const {target} = event;
        const {value} = target;
        const {name} = target;

        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <div>
                <Header user_id_cookie={cookies.get('user')} logout={this.props.logOut}></Header>
                    <div className="register-welcome-message">Welcome to WESTFOOD!</div>
                    <div className="register-page">
                        <div className="register-form">
                            <div className="register-title">Create an Account</div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="register-input-form">
                                    <div className="register-firstname">
                                        <label>
                                            <input name="firstName" type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    <br />
                                    <div className="register-lastname">
                                        <label>
                                            <input name="lastName" type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    <br />
                                    <div className="register-email">
                                        <label>
                                            <input name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    <br />
                                    <div className="register-password">
                                        <label>
                                            <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    <br />
                                    <div className="register-buttons-div">
                                        <div className="register-signup-button-div">
                                            <label className="register-signup-button"><input type="submit" value="Create Account" id="register-createacc-button"/></label>
                                        </div>
                                        <Link to="/login" className="register-login-button">
                                            <div className="register-login-text">Already have an account?</div>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="register-pic">
                            <img src={register_food} alt="register-food" width="100%" height="auto"/>
                        </div>
                    </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Register