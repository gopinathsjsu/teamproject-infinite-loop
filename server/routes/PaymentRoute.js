const express = require('express');
const router = express.Router();
const { status, ScreenModel } = require('../models/ScreenModel');
const { handler } = require('../Helpers/stripeAPI');
const { RedisHelperAdd, RedisHelperGet, RedisHelperDelete } = require('../Helpers/RedisHelper');
const { HTTP_STATUS_CODES } = require('../constants');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function verifyValidSeatBooking(req, res, next) {
    const key = req.body.key;
    const data = RedisHelperGet(key);
    const newSeatBooking = req.body.seatSelected;
    if (data) { 
       if(data.seatBooking.some(item => newSeatBooking.includes(item))) {
           return res.json({
               message: "Some of the seats are already booked",
               status: HTTP_STATUS_CODES.BAD_REQUEST,
           })
       } else {
           RedisHelperAdd(key, req.body)
              next();
       }
    } else {
        RedisHelperAdd(key, req.body);
        next();
    }

}
router.post('/checkout_sessions', async (req, res) => { 
     if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [{
                    price_data: {
                        currency: 'usd', // Set the currency
                        product_data: {
                            name: 'Ticket', // Or any other name relevant to the ticket
                        },
                        unit_amount: 400, // Assuming 'price' is in the smallest currency unit (like cents for USD)
                    },
                    quantity: 3
                }, {
        
                        price: 'price_1OElaUA475w0fpJunbITKKhP',
                        quantity: 1,
            
                }
                ],
                mode: 'payment',
                success_url: `http://localhost:8080/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
                automatic_tax: { enabled: true },
            });
          //  console.log(session);
            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
});

router.get('/success', async (req, res) => {
    try {
        const session_id = req.query.session_id;
        if (!session_id) {
            return res.status(400).send("Session ID is missing");
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log(session);
        res.send("Payment successful and database updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/buyTickets', async (req, res) => {
    console.log("at payment buy tickets");
    console.log(req.body);
    const date = new Date(req.body.date);
    const filter_date = date.toISOString().split('T')[0];
    const timing = req.body.timing
    const screen_id = req.body.screen;
    const screen_layout = req.body.screenLayout;
    const seat_selected = req.body.seatSelected;
    const movie_id = req.body.movie_id;
    const no_of_seats_booked = seat_selected.length;
    await ScreenModel.findOneAndUpdate({ id: screen_id }, {
        $inc: { [`seats_day_wise.${filter_date}.${timing}.tickets_bought`]: no_of_seats_booked },
        $set: {
            [`seats_day_wise.${filter_date}.${timing}.SeatArray`]: screen_layout
        }
    }).then((result) => {
        console.log(result);
        res.json({
            message: "updated Successfully",
            status: HTTP_STATUS_CODES.OK,
        })
    }).catch((error) => {
        console.error(error);
    })
});
module.exports = router;