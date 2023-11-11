const mongoose = require('mongoose');

// Defining a screen  schema
const screenSchema = new mongoose.Schema({
    id: String,
    type_screen: Array,
    seating_capacity: Number,
    rows: Number,
    columns: Number,
    movie_id: String,
    show_times: Array,
    cost: Number,
    theatre_id: String,
    seat_matrix: Array,
    occupancy_status: Array,

});

// Creating a User model based on the schema
const ScreenModel = mongoose.model('Screen', screenSchema);

module.exports = {
    ScreenModel: ScreenModel,
};