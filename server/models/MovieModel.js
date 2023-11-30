const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
  id:{type: String},
  title: {type: String,default:""},
  cast: {type: Array,default:[]},
  description: { type: String ,default:""},
  format: {type:String,default:"2D"},
  genres: { type: Array ,default:[]},
  languages: {type:Array,default:[]},
  run_time:{type: Number,default:0},
  rating: { type: Number ,default:0},
  trailer_url: {type: String,default:""},
  release_date:{type: Date, default: ""},
  end_date : {type : Date, default: ""},
  ticket_price:{type: Number  ,default:0},
  tickets_sold: { type: Number  ,default:0},
  day_wise_tickets_sold: { type: Array, default: [] },
  no_of_days: { type: Number, default: 0 },
  poster_url: { type: String  ,default:""},
  banner_url: { type: String ,default:""},
  cast: { type: Array ,default:[]},
  crew: { type: Array ,default:[]},
  certificate: {type: String,default:""},
  popularity: {type: Number ,default:0},
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
