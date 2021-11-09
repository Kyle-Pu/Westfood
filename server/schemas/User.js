const mongoose = require('mongoose');
const Review = require('./Review')

const Schema = mongoose.Schema;
const UserModel = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  reviews: [{type: Schema.Types.ObjectId, ref : "Review", default: ""}]
});

module.exports = mongoose.model('users', UserModel);