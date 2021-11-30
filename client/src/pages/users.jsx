import React, { useState, useEffect } from "react"
import Footer from "../pages/footer"
import Header from "../pages/header"
import * as api from "../api.js"
import '../pages/users.css'

const UserProfileBox = (props) => {    

    const findRestaurant = (id) => {
        for(let i = 0; i < props.rests.length; i++){
            if(props.rests[i]._id == id){
                return props.rests[i].name
            }
        }
    }




    //only get unique elements in an array (filter to get only unique elements)
    function uniqueValsOnly(val, ind, self){
        return self.indexOf(val) === ind;
    }

    //count the occurrences in the array
    function countOccurrencesOf(arr, valToFind){
        var counter = 0
        for(let i = 0; i < arr.length; i++){
            if(arr[i] == valToFind)
            {
                counter++
            }
        }
        return counter;
    }

    //Takes in a rank (1,2, or 3), for top 1, 2, or 3, and returns the name of the restaurant to display
    const topNthRestaurant = (rank) => {
        var restaurantsAndVisits = props.userObj.restaurantsVisited
        var uniqueRests = restaurantsAndVisits.filter(uniqueValsOnly)
        var  countsObj = {}
        //First count the objects in the array
        for(let i = 0; i < uniqueRests.length; i ++)
        {
            countsObj[uniqueRests[i]] = countOccurrencesOf(restaurantsAndVisits, uniqueRests[i])
        }

        //The array of keys needed to sort:
        let keysOfmyObj = Object.keys(countsObj)
        console.log(keysOfmyObj)

        //Sort the whole thing using values by looking up with keys
        keysOfmyObj.sort(function(a,b) { return countsObj[b] - countsObj[a]})

        return findRestaurant(keysOfmyObj[rank - 1])
    }

    const findReview = (id) => {
        for(let i = 0; i < props.revs['data'].length; i++){
            if(props.revs['data'][i]._id == id){
                return findRestaurant(props.revs['data'][i]['restaurantID']) + ": " + props.revs['data'][i]['description'] + ' (' + props.revs['data'][i]['rating'] + ' stars)'
            }
        }
    }

    return (
        <div>
            <div className="users-information-div">
                <div className="users-username-title">
                        {props.username}
                </div>
                <div className="users-favorites-info-div">
                    <div className="users-favorite-restaurants-div">
                        <div className="users-favorite-restaurant-title">
                            {props.username}'s Favorite Restaurants:
                        </div>
                        <div className="users-favorite-restaurant-list">
                                <div className="users-top-one-restaurants">1. {topNthRestaurant(1)}</div>
                                <div className="users-top-two-restaurants">2. {topNthRestaurant(2)}</div>
                                <div className="users-top-three-restaurants">3. {topNthRestaurant(3)}</div>
                        </div>
                    </div>
                    
                    <div className="users-reviews-div">
                        <div className="users-reviews-title">
                            {props.username}'s Reviews:
                        </div>
                        <div className="users-reviews">
                            <ol>
                                {props.userRevs.map((element, ind) => {
                                    return <div className="users-ind-review"> <li>{findReview(element)}</li> </div>
                                })}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const UsersPage = (props) =>{

    let [userData, setUserData] = useState([]);
    let [userNames, setUserNames] = useState([]);
    let [reviewsData, setReviewsData] = useState([]);
    let [restaurants, setRestaurants] = useState([]);
    let [userClicked, setUserClicked] = useState([]); // Array to keep track of who's button has been pressed

    useEffect(() => {
        api.getReviews().then(data => {
            console.log(data)
            setReviewsData(data)
        });

        api.getRestaurants().then(data => {
            console.log(data)
            setRestaurants(data['data'])
        });

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
                <div className="users-buttons-div">
                    <button className="users-buttons" name={idx} key={idx} onClick={handleClick}>{user}</button>
                </div>
            </div>
        );
    });

    return (
        <div>
            <Header title="Users" logout={props.logOut} user_id_cookie={props.user_id_cookie}></Header>
            <div className="users-full-page">
                <div className="users-page-div">
                    <div className="users-name-list-div">
                        <div className="users-name-list-title">
                            Users
                        </div>
                        <div className="users-name-list-desc">
                            Click on a user to view each user's favorite restuarants and past reviews! Click again to close info page for each user.
                        </div>
                        </div>
                        <div className="user-name-info-div">
                            <div className="users-name-list-buttons-div">{users}</div>
                            <div className="users-info-div">
                                {userNames.map((usrName, idx) => {
                                return userClicked[idx] && <UserProfileBox username={usrName} userRevs={userData[idx]['reviews']} revs={reviewsData} rests={restaurants} userObj = {userData[idx]}/>
                                })}
                            </div>
                        </div>
                    
                    <br />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default UsersPage;
