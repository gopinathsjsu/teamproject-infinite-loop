const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
    id: String,
    name: {type: String, required:true},
    dob: {type: Date, required : true},
    movies: [String],
    location: String,
    description: String,
    film_profession: {type: String, required:true},
    image_urls: [String],
    created_on : {type: Date , default: Date.now},
    updated_on : {type: Date , default: Date.now}
});


const ArtistModel = mongoose.model('Artist', artistSchema);

module.exports = {
    ArtistModel: ArtistModel,
};