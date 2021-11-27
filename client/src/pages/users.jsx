import React, { useState, useEffect } from "react"
import Footer from "../pages/footer"
import Header from "../pages/header"
import * as api from "../api.js"

const UserProfileBox = (props) => {    



    return (
        <div>
            <h3>{props.username}'s Favorite Restaurants</h3>
            <ol>
                <li>Filler1</li>
                <li>Filler2</li>
                <li>Filler3</li>
            </ol>

            <h3>{props.username}'s Reviews</h3>
            <ol>
                <li>Restaurant: {props.userRevs}</li>
            </ol>
        </div>
    );
}

const UsersPage = (props) =>{

    let [userData, setUserData] = useState([]);
    let [userNames, setUserNames] = useState([]);
    let [userClicked, setUserClicked] = useState([]); // Array to keep track of who's button has been pressed

    useEffect(() => {
        api.getUsers().then(data => {
            console.log(data)
            setUserData(data['data'])
            setUserNames(data['data'].map(element => element.firstName + " " + element.lastName))

            setUserClicked(Array(data['data'].length).fill(false))
        })
    }, []);

    const handleClick = (event) => {
        // Toggle bool value of clicked user
        setUserClicked(userClicked.map((x, ind) => {
            if(ind == event.target.name){
                return !x;
            }
            return x;
        }));
    }

    let users = userNames.map((user, idx) => {
        return (
            <div>
                <button name={idx} key={idx} onClick={handleClick}>{user}</button>
                <br />
            </div>
        );
    });

    return (
        <div>
            <Header title="Users" logout={props.logOut} user_id_cookie={props.user_id_cookie}></Header>

            {users}

            {userNames.map((usrName, idx) => {
                return userClicked[idx] && <UserProfileBox username={usrName} userRevs={userData[idx]['reviews']} />
            })}
            
            <br />
            <Footer></Footer>
        </div>
    );
};

export default UsersPage;
