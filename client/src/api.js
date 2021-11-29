import axios from "axios"

// create user object, accepts JSON with all neede parameters
const addUser = async (body) => {
    return await axios.post('http://localhost:8000/user', body)
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err);
        return err;
    });
}

// checks to see if there is a stored username and password which matches a request
const verifyUser = async (body) => {
    const enteredUsername = body.email;
    const enteredPassword = body.password;
    const users = await getUsers();
    const userData = users.data;
    let userFound = false;
    for(let i = 0; i < userData.length; i++){
        let userObject = userData[i];
        let userUsername = userObject.username;
        let userPassword = userObject.password;
        // see if entered username and password match one in the database
        if(userUsername == enteredUsername && userPassword == enteredPassword){
            userFound = userObject;
            break;
        }
    }
    return userFound;
}

// get user object
const getUsers = async () => {
    return await axios('http://localhost:8000/users')
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(err => console.log(err));
}

// create restuarant object
const addRestaurant = async (body) => {
    return await axios.post('http://localhost:8000/restaurant', body)
    .then( res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

// get restaurant object
const getRestaurants = async () => {
    return await axios('http://localhost:8000/restaurants')
    .then( res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

// create review object
const addReview = async (body) => {
    return await axios.post('http://localhost:8000/review', body)
    .then( res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

// get review object
const getReviews = async () => {
    return await axios('http://localhost:8000/reviews')
    .then( res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

//Add the restaurant id every time the user goes to a particular restaurant page
const addVisitorsToRestaurant = async (restId) => {
    return await axios.put('http://localhost:8000/restaurants/' + restId)
    .then( res =>{
        console.log(res);
        return res; 
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

const addRestaurantToVisitors = async (userId) => {
    return await axios.put('http://localhost:8000/users/' + userId)
    .then( res =>{
        console.log(res);
        return res; 
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

export {addUser, verifyUser, getUsers, addRestaurant, getRestaurants, addReview, getReviews, addVisitorsToRestaurant, addRestaurantToVisitors};