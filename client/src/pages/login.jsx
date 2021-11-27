import React from 'react'
import Footer from "../pages/footer"
import Header from "../pages/header"
import { Link } from "react-router-dom"
import * as api from "../api.js"
import '../pages/login.css'
import Cookies from 'universal-cookie'
import background from '../images/westfood_loginpage.jpeg';

const cookies = new Cookies();

 
class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            email: "",
            password: "",
            cookies: cookies.get('user') 
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount(this);
    }

    componentDidMount(){
        
    }

    handleCookie() {
        console.log("handled")
    }

    succesfulLogin(user) {
        // store that user logged in
        const cookies = new Cookies();
        cookies.set('user', user._id, { path: '/' }); // set cookie
        console.log(cookies.get('user')); 
    }

    badLogin() {
        // alert user that they failed
        alert("The data you entered doesn't match any currently existing accounts. Try again or register for a new account!")
        console.log("bad login!")
    }

    handleSubmit(event) {
        event.preventDefault();
        api.verifyUser({
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if(res){
                this.succesfulLogin(res);
                window.location.reload()
            } else {
                this.badLogin();
            }
        })
        
        // Backend stuff
        // Fetch email and password
            // Check for a match
                // If match
                    // Login
                // Else
                    // Display message to user to re-enter information
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
                <Header></Header>
                <div className="login-page">
                    <div className="login-image">
                        <div className="login-welcome-message">Welcome back!</div>
                        <div className="login-welcome-desc">
                            Read honest reviews about restaurants 
                            <br />
                            in Westwood, Los Angeles.
                        </div>
                    </div>
                    <div className="login-form">
                        <div className="login-westfood-logo">WESTFOOD</div>
                        <div className="login-title">Login</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="login-input-form">
                                <div className="login-email">
                                    <label>
                                        <input name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                    </label>
                                </div>
                                    <br />
                                <div className="login-password">
                                    <label>
                                        <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                    </label>
                                </div>
                                    <br />
                                <div className="login-buttons-div">
                                    <div className="login-buttons">
                                        <Link to="/register" className="login-signup-button">Sign Up</Link>
                                    </div>
                                    <div className="login-buttons">
                                        <label className="login-signin-button"><input type="submit" value="Sign in"/></label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <br />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    };

}

export default Login;
