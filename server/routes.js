const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('./schemas/User.js')
const Restaurant = require('./schemas/Restaurant.js')

router.post('/user', (req, res) => {
    console.log("ping /user post")
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
            if (err) console.log(err);
            if (response) {
                console.log(response);
                res.status(200).json({ success: 'created user' })
            }
        })
    }
})

router.get('/users', (req, res) => {
    console.log("ping /user get")
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
    Restaurant.find((err, data) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

module.exports = router