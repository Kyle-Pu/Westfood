const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewModel = new Schema({
    rating: Number,
    description: String
});

module.exports = mongoose.model('reviews', ReviewModel);

