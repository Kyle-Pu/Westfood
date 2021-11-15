import React, { useState } from "react"

const RestaurantInfoBox = (props) => {    
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
        </div>
    );
}

const RestaurantsPage = () =>{

    let restaurants = 
        ["Tocaya Modern Mexican",
        "La Table de Sophie",
        "Mr. Noodle",
        "Skylight Gardens",
        "Blue Bird Burgers",
        "Pomodoro Trattoria",
        "Hibachi Papi",
        "Gogobop"];
    let [restaurantClicked, setRestaurantClicked] = useState(Array(restaurants.length).fill(false)); // Array to keep track of who's button has been pressed

    const handleClick = (event) => {
        // Toggle bool value of clicked restaurant
        setRestaurantClicked(restaurantClicked.map((x, ind) => {
            if(ind == event.target.name){
                return !x;
            }
            return x;
        }));
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
                return restaurantClicked[idx] ? <RestaurantInfoBox name={nm} /> : <br/>
            })}
        </div>
    );
};

export default RestaurantsPage;
