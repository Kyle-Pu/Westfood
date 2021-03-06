const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('./schemas/User.js')
const Restaurant = require('./schemas/Restaurant.js')
const Review = require('./schemas/Review.js')
const { findByIdAndUpdate } = require('./schemas/Review.js')


module.exports = router;

//This part is for posting a review
router.post('/review', (req,res) => {
    console.log('ping /review post')
    console.log(req.body)
    //check for missing fields
    if(!req.body.description || !req.body.rating){
        res.status(400).json({error: 'missing a required field' })
    }
    else{
        Review.create({ 
            description: req.body.description,
            rating: req.body.rating,
            userID: req.body.userID,
            restaurantID: req.body.restaurantID

        }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: 'error in posting a review' });
            }
            if (response) {
                res.status(200).json({ success: 'created a review' });

                var updateUserById = function(userID){
                    User.findByIdAndUpdate(userID, { $push: { reviews: response._id}},(error, result) => {
                        if(error)
                        {
                            console.log(error)
                        }else{
                            console.log("The user has been updated successfully with the corresponding review")
                        }
                })
            };

            var updateRestaurantById = function(restaurantID){
                Restaurant.findByIdAndUpdate(restaurantID, { $push: { reviews: response._id}},(error, result) => {
                    if(error)
                    {
                        console.log(error)
                    }else{
                        console.log("The restaurant has been updated successfully with the corresponding review")
                    }
            })
        };

            updateUserById(req.body.userID)
            updateRestaurantById(req.body.restaurantID)

            }

                
        })
    }
})

router.get('/reviews', (req, res) => {
    console.log('ping /reviews get');
    Review.find((err, data) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

router.post('/user', (req, res) => {
    console.log('ping /user post')
    // check for missing fields
    if(!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName){
        res.status(400).json({ error: 'missing a required field' })
    }
    else {
        User.create({
            username: req.body.username, 
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: 'error in creating an account' });
            } 
            if (response) {
                console.log(response);
                res.status(200).json({ success: 'created user' })
            }
        })
    }
})

router.get('/users', (req, res) => {
    console.log('ping /users get')
    User.find((err, data) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

router.put('/users/:id/:restaurantID', (req,res) => {
    var addRestaurantToUser = function(userID,restaurantID){
        User.findByIdAndUpdate(userID, {$push: {restaurantsVisited : restaurantID}},(error, result) => {
            if(error)
            {
                console.log(error)
            }else{
                console.log("The restaurant ID has been added to the user.")
            }
    })
};
addRestaurantToUser(req.params.id, req.params.restaurantID);
res.send({type:'PUT'});
}) 


router.post('/restaurant', (req, res) => {
    console.log('ping /restaurant post')
    // check for missing fields

    if(!req.body.name || !req.body.address || !req.body.cuisine || !req.body.cost) {
        res.status(400).json({ error: 'missing a required field' })
    }
    else {
        Restaurant.create({
            name: req.body.name,
            address: req.body.address,
            cuisine: req.body.cuisine,
            cost: req.body.cost,
            numUsersVisited: 0
        }, (err, response) => {
            if (err) console.log(err);
            else if (response) {
                console.log(response);
                res.status(200).json({ success: 'created restaurant' })
            }
        })
    }
})

router.get('/restaurants', async(req, res) => {
    console.log('ping /restaurants get');
    // allow filtering by cuising and/or cost
    try {
        if (req.query.cuisine && req.query.cost) {
            restaurants = await Restaurant.find({
                cuisine: req.query.cuisine,
                cost: req.query.cost
            });
        } else if (req.query.cuisine) {
            restaurants = await Restaurant.find({
                cuisine: req.query.cuisine
            });
        } else if (req.query.cost) {
            restaurants = await Restaurant.find({
                cost: req.query.cost
            });
        } else {
            restaurants = await Restaurant.find();
        }

        if (restaurants.length == 0) {
            res.status(404).json({ error: 'no matches' })
        } else {
            res.status(200).send(restaurants);
        }
    } catch(err) {
        res.status(400).send(err);
    }
    
})

router.put('/restaurants/:id', (req,res) => {
    var incRestaurantVisitors = function(restaurantID){
        Restaurant.findByIdAndUpdate(restaurantID, {$inc: {numUsersVisited : 1}},(error, result) => {
            if(error)
            {
                console.log(error)
            }else{
                console.log("The restaurant's number of visitors has successfully been incremented by one.")
            }
    })
};
incRestaurantVisitors(req.params.id);
res.send({type:'PUT'});
}) 

