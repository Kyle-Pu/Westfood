const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('./schemas/User.js')
const Restaurant = require('./schemas/Restaurant.js')
const Review = require('./schemas/Review.js')

//This part is for posting a review
router.post('/review', (req,res) => {
    console.log('ping /review post')
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
                console.log(response);
                db.Restaurant.update(
                    { "name" : restaurantID},
                    {
                        $push: {
                            reviews: this
                        }
                    }
                )

                db.User.update(
                    { "name" : userID},
                    {
                        $push: {
                            reviews: this
                        }
                    }
                )

                res.status(200).json({ success: 'created a review' });
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


router.post('/restaurant', (req, res) => {
    console.log('ping /restaurant post')
    // check for missing fields
    if(!req.body.name || !req.body.address) {
        res.status(400).json({ error: 'missing a required field' })
    }
    else {
        Restaurant.create({
            name: req.body.name,
            address: req.body.address
        }, (err, response) => {
            if (err) console.log(err);
            else if (response) {
                console.log(response);
                res.status(200).json({ success: 'created restaurant' })
            }
        })
    }
})

router.get('/restaurants', (req, res) => {
    console.log('ping /restaurants get');
    Restaurant.find((err, data) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

