const mongoose = require('mongoose');
const uniqid = require('uniqid');

const transactionSchema = new mongoose.Schema({
    id: { type: String},
    user_id: { type: String  },
    movie_id: { type: String  },
    booking_details: { type: Object  },
    qr_code: { type: String  },
    price: { type: Number  },
    refund_requested: { type: Boolean, default: false },
    refund_status: { type: String },
    payment_method: { type: String  },
    status: { type: String  },
    created_on: { type: Date, default: Date.now },
});

const TransactionModel = mongoose.model('Transactions', transactionSchema);
module.exports = TransactionModel;