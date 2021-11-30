import React, { useState, useEffect } from "react"
import * as api from "../api.js"
import Footer from "../pages/footer"
import Header from "../pages/header"
import Cookies from 'universal-cookie'
import '../pages/restaurants.css'

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
        if (!str) {
            for(let i = 0; i < props.restObjs.length; i++){
                matches.push(i)
            }
        }
        else {
            for(let i = 0; i < props.restObjs.length; i++){
                let str_no_cost = str.replaceAll("$", "");
                let cost_count = countChar("$", str);

                // allow filtering by cuisine and cost in the same search
                if(str_no_cost != "" && (props.restObjs[i].cuisine.toLowerCase().includes(str_no_cost.toLowerCase()) || props.restObjs[i].name.toLowerCase().includes(str_no_cost.toLowerCase()))){
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
            {/*<input value={search} placeholder={"Search Restaurants"} onChange={handleChange} style={{width: '120px'}}/>*/}
            <div className="restaurant-searchbar-div">
                <input className="restaurant-searchbar" value={search} placeholder={"Search Restaurants by Name/Cuisines/Cost!"} onChange={handleChange}/>
            </div>
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
            <div className="restaurant-div">
                <div className="restaurant-name">
                    {props.name}
                </div>
                <div className="restaurant-info">
                    <div className="restaurant-info-addy">{props.info[props.idx].address}</div>
                    <div className="restaurant-info-line">|</div>
                    <div className="restaurant-info-cuisine">{props.info[props.idx].cuisine}</div>
                    <div className="restaurant-info-dot">.</div>
                    <div className="restaurant-info-cost">{props.info[props.idx].cost}</div>
                </div>

                <div className="restaurant-reviews-div">
                    <div className="restaurant-review-form-div">
                        <form onSubmit={submitReview}>
                            <div className="restaurant-review-box-div">
                                <label>
                                    <textarea className="restaurant-review-box" placeholder="Add Review..." type="text" value={review} onChange={handleReviewChange} rows="5" cols="30"/>
                                </label>
                            </div>
                            <br />
                            
                            <div className="restaurant-stars-submit-div">
                                <div className="restaurant-stars">
                                    <div className="restaurant-stars-text"><label for="rating">Stars</label></div>
                                    <select name="rating" value={rating} onChange={handleRatingChange}>
                                        <option value="5">5</option>
                                        <option value="4">4</option>
                                        <option value="3">3</option>
                                        <option value="2">2</option>
                                        <option value="1">1</option>
                                    </select>
                                </div>
                                <div className="restaurant-submit-button">
                                    <input type="submit" value="Submit Review" id="restaurant-submit-button"/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="restaurant-reviews-title">Reviews</div>
                    <div className="restaurant-reviews-list">
                        <ul>
                            {props.info[props.idx].reviews.map(element => <li>"{findReview(element)}"</li>)}
                        </ul>
                    </div>
                </div>
            </div>
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
        let arr = (props.resObjs.sort(compareTwoNumVisits))
        arr = arr.reverse()
        return arr[rank - 1].name

    } 

    return(
        <div className="restaurant-top-three">
            <div className="restaurant-top-three-title">
                <p> Our Top Three Restaurants Are: </p>
            </div>
            <ol>
                <div className="restaurant-top-three-list">
                    <div className="restaurant-top-one>">1. {findNthMostVisitedRestaurant(1)}</div>
                    <div className="restaurant-top-two">2. {findNthMostVisitedRestaurant(2)}</div>
                    <div className="restaurant-top-three">3. {findNthMostVisitedRestaurant(3)}</div>
                </div>
            </ol>
            
        </div>
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
                <div className="restaurant-buttons-div">
                    <button className="restaurant-button" name={idx} key={idx} onClick={handleClick}>{user} </button>
                    <br />
                </div>
            </div>
        );
    });

    return (
        <div>
            <Header title="Restaurants" logout={props.logOut} user_id_cookie={props.user_id_cookie}></Header>
            <div className="restuarant-full-page">
                <div className="restaurant-page-top-div">
                    <div className="restaurant-page-desc">
                        <p>Click on a restaurant to view more info and to leave a review! Click again to close info page for each restaurant.</p>
                        <p>Search Instructions: Type in part or all of the name/cuisine you want 
                        and/or the desired amount of $ signs to filter by cost. You can do both simultaneously!</p>
                    </div>
                </div>

                <div className="restaurant-list-div">
                    <div className="restaurant-list">
                        <CuisineCostSearchBar restObjs={allData} onFilter={handleFilter}/>
                        <div className="restaurant-name-list-div">
                            {restaurantButtons.map((element, ind) => filter[ind] && element)}
                        </div>
                    </div>
                    <div className="restaurant-full-information">
                        <div className="restaurant-top-three">
                            {allData.length != 0 && <RestaurantRankingPart resObjs={allData}/>}
                        </div>
                        <div className="restaurant-list-and-info">
                            {restaurants.map((nm, idx) => {
                                return restaurantClicked[idx] && <RestaurantInfoBox info={allData} idx={restaurants.indexOf(nm)} name={nm} uid={props.user_id_cookie} revs={reviewsData}/>
                            })}
                        </div>
                    </div>
                    <br />
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
    
};

export default RestaurantsPage;
