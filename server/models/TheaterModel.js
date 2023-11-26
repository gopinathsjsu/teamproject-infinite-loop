const mongoose = require('mongoose');


const theaterSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String },
  description: { type: String },
  location: { type: String },
  address: { type: String },
  zipcode: { type: Number },
  theater_constructed_date: { type: Date },
  mobile: { type: Number },
  mail: { type: String },
  city: { type: String },
  state: { type: String },
  theater_url: { type: String },
  image_url: { type: String },
  screen_ids: { type: Array },
  movie_ids: { type: Array, default: [] },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});


const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
