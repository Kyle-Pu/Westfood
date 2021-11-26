import React, { useEffect } from "react";
import * as api from "../api.js"
import Footer from "../pages/footer"
import Header from "../pages/header"

const HomePage = (props) => {

    useEffect(() => {
        api.getUsers().then(data => {
            console.log(data)
        });
    }, []);

    return(
        <div>
            <Header title="Westwood" logout={props.logOut} user_id_cookie={props.user_id_cookie}></Header>
            
            < br/>

            <div>
                put info here
            </div>
            
            < br/>
            
            <Footer></Footer>    
        </div>
        
    );
};

export default HomePage;
