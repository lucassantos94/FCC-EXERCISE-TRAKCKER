const { Schema } = require("mongoose");

const exerciseSchema = new Schema({
  description: String,
  duration: Number,
  date: Date
})
module.exports = exerciseSchema