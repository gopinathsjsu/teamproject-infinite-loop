const mongoose = require('mongoose');

const status = {
    AVAILABLE: 0,
    BOOKED: 1,
    BLOCKED: 2,
}

const screenSchema = new mongoose.Schema({
    screen_id: String,
    screen_type: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    theatre_id: String,
    screen_name: { type: String, required: true },
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    movie_name: String,
    movie_image: String,
    run_time: String,
    show_times: { type: [String], required: true },
    cost: { type: Number },
    theater_id: String,
    seat_array: { type: [], required: true },
    occupancy_status: [String],
    seats_day_wise: { type: Object },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }

});


const ScreenModel = mongoose.model('Screens', screenSchema);


module.exports = {
    status,
    ScreenModel,
};