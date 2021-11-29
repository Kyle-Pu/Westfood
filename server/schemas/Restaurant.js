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
    cuisine: { //limit the creation of restaurant objects to only be from this cuisine list
        type: String,
        enum: ['Hibachi', 'Korean', 'American', 'Thai', 'Cocktails', 'Mediterranean', 'Chinese', 'French', 'Mexican', 'Italian', 'Dessert', 'Fish', 'Asian', 'Pizza'],
        required: true
    },
    cost: { //limit the creation of restaurant objects to only be from this cost list
        type: String,
        enum: ['$', '$$', '$$$', '$$$$'],
        required: true
    },
    reviews: [{type: Schema.Types.ObjectId, ref : "Review", default: ""}],
    /** Have a number of users visited for ranking uses */
    numUsersVisited: Number
});

module.exports = mongoose.model('restaurants', RestaurantModel);