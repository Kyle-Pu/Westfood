const mongoose = require('mongoose');
const Review = require('./Review')

const Schema = mongoose.Schema;
const UserModel = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  reviews: [{type: Schema.Types.ObjectId, ref : "Review", default: ""}],
  /**restaurantsVisited is basically to indicate which restaurants the user has clicked on */
  /**For the feature in which it displays the user's top three restaurants visited (by the times he or she visited it) */
  restaurantsVisited: [{type: Schema.Types.ObjectId, ref : "Restaurant", default: ""}]
});

module.exports = mongoose.model('users', UserModel);