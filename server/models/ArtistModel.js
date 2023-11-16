const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
    id: {type: String},
    name: {type: String, required:true},
    dob: {type: Date},
    movies: [String],
    location: {type: String},
    description: { type: String },
    type: {type:String},
    profession: {type: String, required:true},
    profile_url: {type: String},
    created_on : {type: Date , default: Date.now},
    updated_on : {type: Date , default: Date.now}
});


const ArtistModel = mongoose.model('Artist', artistSchema);

module.exports = ArtistModel;