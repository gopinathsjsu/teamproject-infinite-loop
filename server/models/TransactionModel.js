const mongoose = require('mongoose');
const uniqid = require('uniqid');

const transactionSchema = new mongoose.Schema({
    id: { type: String },
    user_id: { type: String, default: "" },
    movie_id: { type: String, default: "" },
    theater_id: { type: String, default: "" },
    screen_id: { type: String, default: "" },
    seat_ids: { type: Array, default: [] },
    show_date: { type: Date, default: "" },
    show_time: { type: String, default: "" },
    qr_code: { type: String, default: "" },
    price: { type: Number, default: 0 },
    refund_requested: { type: Boolean, default: false },
    refund_status: { type: String, default: "" },
    payment_method: { type: String, default: "" },
    status: { type: String, default: "" },
    created_on: { type: Date, default: Date.now },
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    movieName: { type: String, default: "" },
    theaterName: { type: String, default: "" },
});

const TransactionModel = mongoose.model('Transactions', transactionSchema);
module.exports = TransactionModel;