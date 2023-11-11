const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
  movie_id:{type: String},
  title: {type: String},
  cast: {type: Array},
  description: {type: String},
  genres: {type: Array},
  run_time:{type: Number},
  rating:{type: Number},
  release_date:{type: Date},
  ticket_price:{type: Number},
  tickets_sold:{type: Number},
  movie_url:{type: String},
  popularity: {type: Number},
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
