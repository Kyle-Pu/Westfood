const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantModel = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        enum: ['Asian', 'French', 'Mexican', 'Italian'],
        required: true
    },
    cost: {
        type: String,
        enum: ['$', '$$', '$$$', '$$$$'],
        required: true
    },
    reviews: [{type: Schema.Types.ObjectId, ref : "Review", default: ""}]
});

module.exports = mongoose.model('restaurants', RestaurantModel);