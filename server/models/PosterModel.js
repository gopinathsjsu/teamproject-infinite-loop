const mongoose = require('mongoose');


const posterSchema = new mongoose.Schema({
    id: { type: String, },
    poster_name: { type: String, required: true },
    poster_url: { type: String },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }
});


const PosterModel = mongoose.model('Poster', posterSchema);

module.exports = PosterModel;