const mongoose = require('mongoose');

// Defining a screen  schema
const paymentSchema = new mongoose.Schema({
    id: String,
    transaction_id: String,
    card_details: { type: mongoose.Schema.Types.Mixed, default: {} },
    address: String,
    status: String,
    user_id: String,
    mode_of_payment: String,

});

// Creating a User model based on the schema
const TicketModel = mongoose.model('Ticket', ticketSchema);

module.exports = {
    TicketModel: TicketModel,
};