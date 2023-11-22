const mongoose = require('mongoose');
const uniqid = require('uniqid');

const transactionSchema = new mongoose.Schema({
    id: { type: String, default: uniqid() },
    user_id: { type: String, required: true },
    ticket_id: { type: String, required: true },
    price: { type: Number, required: true },
    refund_requested: { type: Boolean, default: false },
    refund_status: { type: String },
    payment_method: { type: String, required: true },
    status: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
});

const TransactionModel = mongoose.model('Transactions', transactionSchema);
module.exports = TransactionModel;