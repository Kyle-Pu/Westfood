import React from 'react'
import Footer from "../pages/footer"
import Header from "../pages/header"

class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
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
                <Header title="Login"></Header>

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
