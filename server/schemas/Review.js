const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewModel = new Schema({
    rating: Number,
    description: String,
    restaurantID: String,
    userID: String
});

module.exports = mongoose.model('reviews', ReviewModel);

