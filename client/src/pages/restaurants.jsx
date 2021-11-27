import React, { useState, useEffect } from "react"
import * as api from "../api.js"
import Footer from "../pages/footer"
import Header from "../pages/header"

const RestaurantInfoBox = (props) => {    

    let [review, setReview] = useState("")
    let [rating, setRating] = useState("5")

    const handleReviewChange = (event) => {
        setReview(event.target.value)
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value)
    }

    const submitReview = (event) => {
        console.log(review)

        let reviewData = {
            rating: rating,
            description: review,
            restaurantID: props.info[props.idx]._id,
            userID: props.uid
        }

        api.addReview(reviewData)
        event.preventDefault()
    }

    const findReview = (id) => {
        for(let i = 0; i < props.revs['data'].length; i++){
            if(props.revs['data'][i]._id == id){
                return props.revs['data'][i]['description'] + ' (' + props.revs['data'][i]['rating'] + ' stars)'
            }
        }
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <ul>
                <li>Address: {props.info[props.idx].address}</li>
                <li>Cuisine: {props.info[props.idx].cuisine}</li>
                <li>Cost: {props.info[props.idx].cost}</li>
            </ul>

            <h3>Reviews</h3>
            <ul>
                {props.info[props.idx].reviews.map(element => <li>{findReview(element)}</li>)}
            </ul>

            <form onSubmit={submitReview}>
                <label>
                    <h3>Write a Review!</h3>
                    <textarea type="text" value={review} onChange={handleReviewChange} rows="5" cols="30"/>
                </label>
                <br />
                
                <label for="rating">Stars</label>
                <select name="rating" value={rating} onChange={handleRatingChange}>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                <input type="submit" value="Submit Review"/>
            </form>
            
        </div>
    );
}

const RestaurantsPage = (props) => {

    let [allData, setAllData] = useState();
    let [restaurants, setRestaurants] = useState([]);
    let [reviewsData, setReviewsData] = useState([]);
    let [restaurantClicked, setRestaurantClicked] = useState([]); // Array to keep track of who's button has been pressed

    useEffect(() => {
        api.getReviews().then(data => {
            setReviewsData(data)
        });
        api.getRestaurants().then(data => {
            setAllData(data['data']);
            console.log(data)
            
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
            <Header title="Restaurants" logout={props.logOut} user_id_cookie={props.user_id_cookie}></Header>

            <p>Click on a restaurant to view more info and to leave a review! Click again to close info page for each restaurant.</p>

            {restaurantButtons}

            {restaurants.map((nm, idx) => {
                return restaurantClicked[idx] && <RestaurantInfoBox info={allData} idx={restaurants.indexOf(nm)} name={nm} uid={props.user_id_cookie} revs={reviewsData}/>
            })}

            <br />
            <Footer></Footer>
        </div>
    );
    
};

export default RestaurantsPage;
