import React, { useState } from 'react'
import Footer from "../pages/footer"
import Header from "../pages/header"
import * as api from "../api.js"

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
                <Header title="Register"></Header>

                <br />

                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Email: 
                        <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br />
                    <br />
                    <input type="submit" value="Create Account" />
                </form>

                <br />

                <Footer></Footer>
            </div>
        );
    }
}

export default Register