const mongoose = require('mongoose');


const screenSchema = new mongoose.Schema({
    id: String,
    screen_type: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    movie_id: String,
    show_times: { type: Date, required: true },
    cost: { type: Number, required: true },
    theatre_id: String,
    seat_matrix: { type: [[Number]], required: true },
    occupancy_status: [String],
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }

});


const ScreenModel = mongoose.model('Screens', screenSchema);


module.exports = ScreenModel;