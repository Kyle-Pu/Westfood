import React from "react";
import Footer from "../pages/footer"
import Header from "../pages/header"

const HomePage = (props) => {

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
