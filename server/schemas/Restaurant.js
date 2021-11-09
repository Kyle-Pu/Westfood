const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantModel = new Schema({
    name: String,
    address: String,
    reviews: [{type: Schema.Types.ObjectId, ref : "Review", default: ""}]
});

module.exports = mongoose.model('restaurants', RestaurantModel);