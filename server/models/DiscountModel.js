const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    id: { type: String, default: "1" },
    tuesday_discount_percentage: { type: String, default: "10" },
    nighttime_discount_percentage: { type: String, default: "10" },
    tuesday_discount_coupon: { type: String, default: "" },
    nighttime_discount_coupon: { type: String, default: "" },
    created_on : {type: Date , default: Date.now},
});

const DiscountModel = mongoose.model('Discount', discountSchema);

module.exports = DiscountModel;