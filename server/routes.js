const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('./schemas/User.js')
const Restaurant = require('./schemas/Restaurant.js')
const Review = require('./schemas/Review.js')

//This part is for posting a review
router.post('/review', (req,res) => {
    console.log("ping /review review")
    //check for missing fields
    if(!req.query.description || !req.query.rating){
        res.status(400).json({error: 'missing a required field' })
    }
    else{
        Review.create({
            description: req.query.description,
            rating: req.query.rating
        }, (err, response) => {
            if (err){
                console.log(err);
                res.status(400).json({ error: 'error in posting a review'});
            }
            if (response){
                console.log(response);
                res.status(200).json({ success: 'created a review'});
            }
        })

    }
}

)

router.post('/user', (req, res) => {
    console.log("ping /user post")
    // check for missing fields
    if(!req.query.username || !req.query.password || !req.query.firstName || !req.query.lastName){
        res.status(400).json({ error: 'missing a required field' })
    }
    else {
        User.create({
            username: req.query.username, 
            password: req.query.password,
            firstName: req.query.firstName,
            lastName: req.query.lastName
        }, (err, response) => {
            if (err){
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

router.post('/restaurant', (req, res) => {
    console.log('ping /restaurant post')
    // check for missing fields
    if(!req.query.name || !req.query.address) {
        res.status(400).json({ error: 'missing a required field' })
    }
    else {
        Restaurant.create({
            name: req.query.name,
            address: req.query.address
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
    Restaurant.find((err, data) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

module.exports = router