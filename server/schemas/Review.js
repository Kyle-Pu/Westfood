const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewModel = new Schema({
    rating: Number,
    description: String,
    restaurantID: ObjectId,
    userID: ObjectId
});

module.exports = mongoose.model('reviews', ReviewModel);

