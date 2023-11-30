const express = require('express');
const router = express.Router();
const { status, ScreenModel } = require('../models/ScreenModel');
const { handler } = require('../Helpers/stripeAPI');
const User = require('../models/UserModel');
const Movie = require('../models/MovieModel');
const { RedisHelperAdd, RedisHelperGet, RedisHelperDelete } = require('../Helpers/RedisHelper');
const { HTTP_STATUS_CODES } = require('../constants');
const Transaction = require('../models/TransactionModel');
const { generateAndPingQRCode } = require('../Helpers/qrCodeGenerator');
const uniqid = require('uniqid');
const { daysDifference } = require('../controllers/MovieController');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/storeTicketBookingDetails', async (req, res) => {
    console.log("at payment checkout session");
    console.log(req.body);
    const key = req.body.key;
    console.log(key);
    const data = await RedisHelperGet(key);
    console.log("data:::::");
    // console.log(JSON.parse(JSON.parse(data).body));
    // check_data = JSON.parse(JSON.parse(data).body);
    const newSeatBooking = req.body.seatSelected;
    if (Object.entries(JSON.parse(data)).length !== 0) {
        check_data = JSON.parse(JSON.parse(data).body);
        if (check_data.seatSelected.some(item => newSeatBooking.includes(item))) {
            return res.json({
                message: "Some of the seats are already booked",
                status: HTTP_STATUS_CODES.BAD_REQUEST,
            })
        } else {
            value_add = {
                body: JSON.stringify(req.body)
            }
            await RedisHelperAdd(key, value_add)
            res.json({
                message: "Seat booking details stored",
                status: HTTP_STATUS_CODES.OK,
            })
        }
    } else {
        value_add = {
            body: JSON.stringify(req.body)
        }
        await RedisHelperAdd(key, value_add);
        res.json({
            message: "Seat booking details stored",
            status: HTTP_STATUS_CODES.OK,
        })
    }
});
router.post('/checkout_sessions/:id', async (req, res) => {
    console.log("at payment checkout session");
    console.log("-------------------");
    console.log(req.params['id']);
    console.log("-------------------");
    const redis_data = await RedisHelperGet(req.params['id']);
    console.log(redis_data);
    const data = JSON.parse(JSON.parse(redis_data).body);
    // console.log(data);
    const coupon = await stripe.coupons.create({
        percent_off: 20,
        duration: 'once',
    });
    if (req.method === 'POST') {
        const lineItems = [{
            price_data: {
                currency: 'usd', // Set the currency
                product_data: {
                    name: 'Ticket', // Or any other name relevant to the ticket
                },
                unit_amount: data.price, // Assuming 'price' is in the smallest currency unit (like cents for USD)
            },
            quantity: data.seatSelected.length, // The quantity of tickets
        }, {

            price: 'price_1OElaUA475w0fpJunbITKKhP',
            quantity: 1,

        },
        ];
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: lineItems,
                discounts: [
                    {
                        coupon: 'f80FGkXD',
                    },
                ],
                mode: 'payment',
                success_url: `http://localhost:8080/payment/success?session_id={CHECKOUT_SESSION_ID}&key=${req.params.id}`,
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
        console.log("at payment success success");
        const redis_data = await RedisHelperGet(req.query.key);
        data = JSON.parse(JSON.parse(redis_data).body);
        console.log(data);
        const date = new Date(data.date);
        const filter_date = date.toISOString().split('T')[0];
        const timing = data.timing
        const screen_id = data.screen;
        const theater_id = data.theater;

        const screen_layout = data.screenLayout;
        const seat_selected = data.seatSelected;
        const movie_id = data.movie_id;
        const no_of_seats_booked = seat_selected.length;
        const rewards = data.price * seat_selected.length;
        const qr_code = await generateAndPingQRCode(session.payment_intent, 'http://localhost:8080/verifyTicket/' + session.payment_intent);
        const screenDetails = await ScreenModel.findOneAndUpdate({ id: screen_id, theater_id: theater_id }, {
            $inc: { [`seats_day_wise.${filter_date}.${timing}.tickets_bought`]: no_of_seats_booked, 'total_tickets_booked': no_of_seats_booked },
            $set: {
                [`seats_day_wise.${filter_date}.${timing}.SeatArray`]: screen_layout
            }
        });
        const movie_details = await Movie.findOneAndUpdate({ id: movie_id });
        const current_day = daysDifference(movie_details.release_date, date);
        movie_details.day_wise_tickets_sold[current_day] = movie_details.day_wise_tickets_sold[current_day] + no_of_seats_booked;
        movie_details.save();
        const transaction = new Transaction({
            id: uniqid(),
            user_id: data.user_id,
            movie_id: movie_id,
            theater_id: theater_id,
            screen_id: screenDetails.name,
            seat_ids: seat_selected,
            show_date: filter_date,
            show_time: timing,
            qr_code: qr_code,
            price: data.price,
            payment_method: session.payment_method_types[0],
            status: session.payment_status,
        });
        await transaction.save();
        await ScreenModel.findOneAndUpdate({ id: screen_id }, {
            $inc: { [`seats_day_wise.${filter_date}.${timing}.tickets_bought`]: no_of_seats_booked },
            $set: {
                [`seats_day_wise.${filter_date}.${timing}.SeatArray`]: screen_layout
            }
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.error(error);
        });
        await RedisHelperDelete(req.query.key);
        res.redirect(303, 'http://localhost:3000/book-ticket/ticket');
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