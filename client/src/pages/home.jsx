import React, { useEffect } from "react";
import * as api from "../api.js"
import Footer from "../pages/footer"
import Header from "../pages/header"
import home_map from '../images/home-map.png'

const HomePage = (props) => {

    useEffect(() => {
        api.getUsers().then(data => {
            console.log(data)
        });
    }, []);

    return(
        <div>
            <Header user_id_cookie={props.user_id_cookie} logout={props.logOut}></Header>
            < br/>

            <div>
                <img src={home_map} alt="home-map" width="100%" height="auto"/>
            </div>
            
            < br/>
            
            <Footer></Footer>    
        </div>
        
    );
};

export default HomePage;
