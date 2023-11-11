const mongoose = require('mongoose');

// Defining a screen  schema
const ticketSchema = new mongoose.Schema({
    id: String,
    user_id: String,
    movie_id: String,
    screen_id: String,
    transaction_id: String,
    show_time: { type: Date, default: Date.now },
    seat_no: String,
    qr_url: String,

});

// Creating a User model based on the schema
const TicketModel = mongoose.model('Ticket', ticketSchema);

module.exports = {
    TicketModel: TicketModel,
};