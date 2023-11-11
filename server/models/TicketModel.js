const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    id: { type: String, required: true },
    user_id: { type: String, required: true },
    movie_id: { type: String, required: true },
    screen_id: { type: String, required: true },
    transaction_id: { type: String, required: true },
    show_time: { type: Date, default: Date.now },
    seat_nos: { type: [String], required: true },
    qr_urls: { type: [String], required: true },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }

});


const TicketModel = mongoose.model('Tickets', ticketSchema);

module.exports = {
    TicketModel: TicketModel,
};