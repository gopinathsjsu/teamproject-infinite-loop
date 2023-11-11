const mongoose = require('mongoose');

// Defining a screen  schema
const actorSchema = new mongoose.Schema({
    id: String,
    name: String,
    dob: Date,
    rows: Number,
    movies: Array,
    location: String,
    description: String,
    film_profession: String,
    image_url: String,
});

// Creating a User model based on the schema
const ActorModel = mongoose.model('Actor', actorSchema);

module.exports = {
    ActorModel: ActorModel,
};