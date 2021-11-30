import React, { useState, useEffect } from "react"
import * as api from "../api.js"
import Footer from "../pages/footer"
import Header from "../pages/header"
import Cookies from 'universal-cookie'

const CuisineCostSearchBar = (props) => {

    let [search, setSearch] = useState(""); // Current searched string

    function countChar(c, str) {
        let count = 0;
        for (let i = 0; i < str.length; i++) 
        if (str.charAt(i) == c) 
            count++
     return count;
    }

    const findMatch = (str) => {
        let matches = []
        for(let i = 0; i < props.restObjs.length; i++){
            let str_no_cost = str.replaceAll("$", "");
            let cost_count = countChar("$", str);

            // allow filtering by cuisine and cost in the same search
            if(str_no_cost != "" && props.restObjs[i].cuisine.toLowerCase().includes(str_no_cost.toLowerCase())){
                if(cost_count == 0) {
                    matches.push(i);
                }
                else if(cost_count == 1 && props.restObjs[i].cost == "$") {
                        matches.push(i);
                }
                else if(cost_count == 2 && props.restObjs[i].cost == "$$") {
                        matches.push(i);
                }
                else if(cost_count == 3 && props.restObjs[i].cost == "$$$") {
                        matches.push(i);
                }
                else if(cost_count == 4 && props.restObjs[i].cost == "$$$$") {
                        matches.push(i);
                }
            }
            else if(!str_no_cost && cost_count == 1 && props.restObjs[i].cost == "$") {
                    matches.push(i);
            }
            else if(!str_no_cost && cost_count == 2 && props.restObjs[i].cost == "$$") {
                    matches.push(i);
            }
            else if(!str_no_cost && cost_count == 3 && props.restObjs[i].cost == "$$$") {
                    matches.push(i);
            }
            else if(!str_no_cost && cost_count == 4 && props.restObjs[i].cost == "$$$$") {
                    matches.push(i);
            }
        }
        props.onFilter(matches)
        console.log(matches)
    }

    const handleChange = (event) => {
        setSearch(event.target.value)
        findMatch(event.target.value)
    }

    return (

        <div>
            <input value={search} placeholder={"Search Restaurants by Cuisines/Cost!"} onChange={handleChange} style={{width: '225px'}}/>
        </div>

    );

}

const cookies = new Cookies();
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
const RestaurantRankingPart = (props) =>{
    function compareTwoNumVisits(a,b)
    {
        const numVisits1 = a.numUsersVisited
        const numVisits2 = b.numUsersVisited
        let comparison = 0
        if(numVisits1 > numVisits2)
        {
            comparison = 1
        }else if(numVisits1 < numVisits2){
            comparison = -1
        }
        return comparison
    }
    const findNthMostVisitedRestaurant = (rank) => {
        //Finds the nth most visited restaurant (1st or 2nd or 3rd most visited restaurant)
        //console.log("THIS PRINTS:",props.restObjs[1].name)

    } 

    return(
        <><p> Our Top Three Restaurants Are: </p><ol>
            <li>{findNthMostVisitedRestaurant(1)}</li>
            <li>{findNthMostVisitedRestaurant(2)}</li>
            <li>{findNthMostVisitedRestaurant(3)}</li>
        </ol></>
    );
} 

const RestaurantsPage = (props) => {

    let [allData, setAllData] = useState([]);
    let [restaurants, setRestaurants] = useState([]);
    let [reviewsData, setReviewsData] = useState([]);
    let [restaurantClicked, setRestaurantClicked] = useState([]); // Array to keep track of who's button has been pressed
    let [filter, setFilter] = useState([]); // Filter restaurants, array indicating which restaurants should be visible at any given time

    useEffect(() => {
        api.getReviews().then(data => {
            setReviewsData(data)
        });
        api.getRestaurants().then(data => {
            setAllData(data['data']);
            console.log("DATA", data)
            
            let rests = data['data'].map(element => element.name)
            setRestaurants(rests)
            setRestaurantClicked(Array(rests.length).fill(false)) // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
            setFilter(Array(rests.length).fill(true))
        });
    }, []);
        
    // Demonstrates how to see the actual data in our console
    // (async () => {
    //    restaurantsData = await api.getRestaurants()
    //    let restaurants = restaurantsData['data']
    //    console.log(restaurants)
    //})()

    const handleFilter = (indices) => {
        setFilter(filter.map((element, ind) => {
            if(indices.includes(ind)){
                return true
            }
            return false
        }))
    }


    const handleClick = (event) => {
        // Toggle bool value of clicked restaurant
        console.log(restaurants)
        setRestaurantClicked(restaurantClicked.map((x, ind) => {
            if(ind == event.target.name){
                return !x;
            }
            return x;
        }));
        api.addVisitorsToRestaurant(allData[event.target.name]._id);
        const userId = cookies.get('user');
        api.addRestaurantToVisitors(userId, allData[event.target.name]._id);
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
            <RestaurantRankingPart restObjs={allData}/>

            <CuisineCostSearchBar restObjs={allData} onFilter={handleFilter}/>

            {restaurantButtons.map((element, ind) => filter[ind] && element)}

            {restaurants.map((nm, idx) => {
                return restaurantClicked[idx] && <RestaurantInfoBox info={allData} idx={restaurants.indexOf(nm)} name={nm} uid={props.user_id_cookie} revs={reviewsData}/>
            })}

            <br />
            <Footer></Footer>
        </div>
    );
    
};

export default RestaurantsPage;
