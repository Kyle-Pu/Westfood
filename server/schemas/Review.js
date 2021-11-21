const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewModel = new Schema({
    restaurant: [{type: Schema.Types.ObjectId, ref : "Restaurant"}],
    user: [{type: Schema.Types.ObjectId, ref : "User"}],
    rating: Number,
    description: String
});

module.exports = mongoose.model('reviews', ReviewModel);

