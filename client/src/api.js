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

export {addUser, getUsers, addRestaurant, getRestaurants, addReview, getReviews};