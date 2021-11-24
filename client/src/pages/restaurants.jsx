import React, { useState, useEffect } from "react"
import * as api from "../api.js"

const RestaurantInfoBox = (props) => {    

    const submitReview = () => {
        // Backend stuff
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <ol>
                <li>Filler1</li>
                <li>Filler2</li>
                <li>Filler3</li>
            </ol>

            <h3>Reviews</h3>
            <ul>
                <li>bussin<p>11/15/2021</p></li>
                <li>shit<p>11/16/2021</p></li>
            </ul>

            <textarea>Write review here</textarea>
            <br />
            <button onClick={submitReview}>Submit Review</button>
        </div>
    );
}

const RestaurantsPage = () => {

    let [restaurants, setRestaurants] = useState([]);
    let [restaurantClicked, setRestaurantClicked] = useState([]); // Array to keep track of who's button has been pressed

    useEffect(() => {
        api.getRestaurants().then(data => {
            let rests = data['data'].map(element => element.name)
            setRestaurants(rests)
            setRestaurantClicked(Array(rests.length).fill(false)) // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
        });
    }, []);
        
    // Demonstrates how to see the actual data in our console
    // (async () => {
    //    restaurantsData = await api.getRestaurants()
    //    let restaurants = restaurantsData['data']
    //    console.log(restaurants)
    //})()

    const handleClick = (event) => {
        // Toggle bool value of clicked restaurant
        console.log(restaurants)
        setRestaurantClicked(restaurantClicked.map((x, ind) => {
            if(ind == event.target.name){
                console.log("Here")
                return !x;
            }
            return x;
        }));
        console.log(restaurantClicked)
    }

    let restaurantButtons = restaurants.map((user, idx) => {
        return (
            <div>
                <button name={idx} key={idx} onClick={handleClick}>{user}</button>
                <br />
            </div>
        );
    });

    return (
        <div>
            {restaurantButtons}

            {restaurants.map((nm, idx) => {
                return restaurantClicked[idx] && <RestaurantInfoBox name={nm} />
            })}
        </div>
    );
    
};

export default RestaurantsPage;