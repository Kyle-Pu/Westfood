import React, { useState, useEffect } from "react"
import * as api from "../api.js"

const RestaurantInfoBox = (props) => {    

    let [review, setReview] = useState("")

    const handleReviewChange = (event) => {
        setReview(event.target.value)
    }

    const submitReview = (event) => {
        console.log(review)
        event.preventDefault()
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <ul>
                <li>Address: {props.address}</li>
                <li>Filler2</li>
                <li>Filler3</li>
            </ul>

            <h3>Reviews</h3>
            <ul>
                {props.reviews.map(element => <li>{element}</li>)}
                <li>placeholder<p>11/15/2021</p></li>
                <li>shit<p>11/16/2021</p></li>
                <li>Reviews will be posted above<p>11/16/2021</p></li>
            </ul>

            <form onSubmit={submitReview}>
                <label>
                    <h3>Write a Review!</h3>
                    <textarea type="text" value={review} onChange={handleReviewChange} rows="5" cols="30"/>
                </label>
                <br />
                <input type="submit" value="Submit Review"/>
            </form>
            
        </div>
    );
}

const RestaurantsPage = () => {

    let [restaurants, setRestaurants] = useState([]);
    let [addresses, setAddresses] = useState([]);
    let [reviews, setReviews] = useState([]);
    let [restaurantClicked, setRestaurantClicked] = useState([]); // Array to keep track of who's button has been pressed

    useEffect(() => {
        api.getRestaurants().then(data => {
            console.log(data)
            
            let rests = data['data'].map(element => element.name)
            setRestaurants(rests)
            setRestaurantClicked(Array(rests.length).fill(false)) // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
            
            let addies = data['data'].map(element => element.address)
            setAddresses(addies)

            let reviews = data['data'].map(element => element.reviews)
            setReviews(reviews)
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
                return restaurantClicked[idx] && <RestaurantInfoBox name={nm} address={addresses[restaurants.indexOf(nm)]} reviews={reviews[restaurants.indexOf(nm)]}/>
            })}
        </div>
    );
    
};

export default RestaurantsPage;
