const mongoose = require('mongoose');

const status = {
    AVAILABLE: 0,
    BOOKED: 1,
    BLOCKED: 2,
}

const screenSchema = new mongoose.Schema({
    id: String,
    name: { type: String, required: true },
    format: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    theater_id: String,
    movie_name: { type: String, },
    movie_image: { type: String },
    run_time: { type: String },
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    movie_id: String,
    show_timings: { type: [String], required: true },
    price: { type: Number },
    seating_arrangement: { type: [], required: true },
    occupancy_status: [String],
    total_tickets_booked: { type: Number, default: 0 },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }

});


const ScreenModel = mongoose.model('Screens', screenSchema);


module.exports = {
    status,
    ScreenModel,
};