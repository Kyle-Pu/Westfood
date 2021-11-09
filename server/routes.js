const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('./schemas/User.js')

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
            if (err) console.log(err);
            if (response) {
                console.log(response);
                res.status(200).json({ success: 'created user' })
            }
        })
    }
})

module.exports = router