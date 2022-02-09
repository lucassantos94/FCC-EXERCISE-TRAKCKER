const mongoose = require('mongoose');
const exerciseSchema = require('./exercise.model');

const User = new mongoose.Schema({
  username: String,
  exercise: [exerciseSchema]
});

const UserModel = mongoose.model('User', User);

module.exports = UserModel