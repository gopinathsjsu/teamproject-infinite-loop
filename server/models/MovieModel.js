const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
  id:{type: String},
  title: {type: String},
  cast: {type: Array},
  description: { type: String },
  format: {type:String},
  genres: { type: Array },
  languages: {type:Array},
  run_time:{type: Number},
  rating: { type: Number },
  movie_trailer_url: {type: String},
  release_date:{type: Date},
  ticket_price:{type: Number},
  tickets_sold:{type: Number},
  poster_url: { type: String },
  banner_url: { type: String },
  cast: { type: Array },
  crew: { type: Array },
  certificate: {type: String},
  popularity: {type: Number},
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
