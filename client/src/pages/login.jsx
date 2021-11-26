import React from 'react'
import Footer from "../pages/footer"
import Header from "../pages/header"
import * as api from "../api.js"
import Cookies from 'universal-cookie'

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
                <Header title="Login" logout={this.props.logOut} user_id_cookie={this.props.user_id_cookie}></Header>

                <br />

                <form onSubmit={this.handleSubmit}>
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
                    <input type="submit" value="Sign in"/>
                </form>

                <br />

                <Footer></Footer>
            </div>
        );
    };

}

export default Login;
