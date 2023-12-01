require('dotenv').config();
const express = require('express');
const router = express.Router();
const { HTTP_STATUS_CODES, DISCOUNTS } = require('../constants');
const Discount = require('../models/DiscountModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
          tuesday_discount = await stripe.coupons.create({
            name: "Tuesday Dicount", 
            percent_off:req.body.tuesday, 
            currency: 'usd', // Set the currency (if amount_off is used)
            duration: 'repeating', // 'forever', 'once', or 'repeating'
            duration_in_months: 4, // Required only if duration is 'repeating'
          });
        nighttime_discount = await stripe.coupons.create({
            name: "Night Time Dicount", // Set the name of the coupon
            percent_off: req.body.night_time, // Set the percentage off (if applicable)
            currency: 'usd', // Set the currency (if amount_off is used)
            duration: 'repeating', // 'forever', 'once', or 'repeating'
            duration_in_months: 4, // Required only if duration is 'repeating'
          });
        const discount = new Discount({
            tuesday_discount_percentage: req.body.tuesday,
            nighttime_discount_percentage: req.body.night_time,
            tuesday_discount_coupon: tuesday_discount.id,
            nighttime_discount_coupon:nighttime_discount.id,
        });
       await discount.save();
        res.json({ message: "Added discount successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating discount:', error);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
});

router.get('/all', async (req, res) => {
    try {
        const discount = await Discount.findOne({ "id": 1 });
        res.json({ message: " discounts loaded successfully", data: discount, status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error sending discount details:', error);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
});


module.exports = router;