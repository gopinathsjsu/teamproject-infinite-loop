const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    transaction_id: { type: String, required: true },
    card_details: { type: mongoose.Schema.Types.Mixed, default: {} },
    address: String,
    status: { type: String, required: true },
    user_id: { type: String, required: true },
    mode_of_payment: String,
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now }

});


const PaymentModel = mongoose.model('Payments', paymentSchema);

module.exports = {
    PaymentModel: PaymentModel,
};