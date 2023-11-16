const mongoose = require('mongoose');


const theaterSchema = new mongoose.Schema({
  theater_id: { type: String },
  name: { type: String },
  description: { type: String },
  location: { type: String },
  address: { type: String },
  zipcode: { type: Number },
  theater_constructed_date: { type: Date },
  mobile: { type: Number },
  mail: { type: String },
  city: { type: String },
  theater_url: String,
  screen_details: { type: Array },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});


const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
