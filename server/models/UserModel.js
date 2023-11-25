const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  user_id: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  fullname: { type: String },
  dob: { type: Date },
  gender: {},
  mobile: {},
  genres: { type: Array },
  profile_url: { type: String },
  favourite_artists: { type: Array },
  is_admin: { type: Boolean },
  is_prime: { type: Boolean },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rewards: { type: String },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
