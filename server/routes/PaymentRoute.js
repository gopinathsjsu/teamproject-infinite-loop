const express = require('express');
const router = express.Router();
const { status, ScreenModel } = require('../models/ScreenModel');
const { handler } = require('../Helpers/stripeAPI');
const User = require('../models/UserModel');
const Movie = require('../models/MovieModel');
const { RedisHelperAdd, RedisHelperGet, RedisHelperDelete } = require('../Helpers/RedisHelper');
const { HTTP_STATUS_CODES } = require('../constants');
const Transaction = require('../models/TransactionModel');
const Discount = require('../models/DiscountModel');
const { generateAndPingQRCode } = require('../Helpers/qrCodeGenerator');
const uniqid = require('uniqid');
const { daysDifference } = require('../controllers/MovieController');
const { sendTicketEmail } = require('../Helpers/sendGridHelper');
const Theater = require('../models/TheaterModel');
const { getUrl } = require('../Helpers/S3');
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
router.post('/checkout_sessions/:id/:rewards', async (req, res) => {
    console.log("at payment checkout session");
    console.log("-------------------");
    console.log(req.params['id']);
    console.log("-------------------");
    rewards = req.params['rewards'];
    const redis_data = await RedisHelperGet(req.params['id']);
    const rewards_flag = req.params['rewards'];
    console.log(redis_data);
    const data = JSON.parse(JSON.parse(redis_data).body);
    // console.log(data);
    const coupon = await stripe.coupons.create({
        percent_off: 20,
        duration: 'once',
    });
    var final_price = data.price;
    var final_rewards = (data.rewards / 10);
    if (rewards_flag === "true") {
        if (final_price > final_rewards)
            final_price = final_price - (data.rewards / 10);
        else
            final_price = 0;
    }
    final_price = final_price * 100;
    if (req.method === 'POST') {
        const lineItems = [{
            price_data: {
                currency: 'usd', // Set the currency
                product_data: {
                    name: 'Ticket', // Or any other name relevant to the ticket
                },
                unit_amount: final_price, // Assuming 'price' is in the smallest currency unit (like cents for USD)
            },
            quantity: data.seatSelected.length, // The quantity of tickets
        }, {

            price: 'price_1OElaUA475w0fpJunbITKKhP',
            quantity: 1,

        },
        ];
        var discount_coupon = undefined;
        if (data.discount) {
            const discount = await Discount.findOne({ id: "1" });
            if (data.discount = "tuesday") {
                discount_coupon = [
                    { coupon: discount.tuesday_discount_coupon }
                ];
            }
            else {
                discount_coupon = [
                    { coupon: discount.nighttime_discount_coupon }
                ];
            }
        }
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: lineItems,
                discounts: discount_coupon,
                mode: 'payment',
                success_url: `http://localhost:8080/payment/success?session_id={CHECKOUT_SESSION_ID}&key=${req.params.id}&rewards=${rewards_flag}`,
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

router.get('/prime/checkout_sessions/:id', async (req, res) => {
    try {
        // Create a new Checkout Session for the subscription using the existing price ID
        const user = await User.findOne({ user_id: req.params.id });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer: user.stripe_customer_id,
            line_items: [{
                price: 'price_1OGqZ5A475w0fpJubtRJsfyw', // Replace with your actual price ID
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `http://localhost:8080/payment/prime/success?session_id={CHECKOUT_SESSION_ID}&user_id=${req.params.id}`,
            cancel_url: `http://localhost:3000/?canceled=true`,
        });

        res.redirect(303, session.url);
    } catch (e) {
        res.status(400).send(`Error creating checkout session: ${e.message}`);
    }
});
router.get('/prime/success/:session_id/:user_id', async (req, res) => {
    try {
        const session_id = req.query.session_id;
        if (!session_id) {
            return res.status(400).send("Session ID is missing");
        }
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const user = await User.findOneAndUpdate({ user_id: req.params.user_id }, {
            $set: {
                is_prime: true
            }
        });
        console.log(session);
        console.log("at payment success success");
        res.redirect(303, 'http://localhost:3000');
    } catch (err) {
        res.status(500).send(err.message);
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
        const rewards = data.price * seat_selected.length * 10;
        const qr_code = await generateAndPingQRCode(session.payment_intent);
        const screenDetails = await ScreenModel.findOneAndUpdate({ id: screen_id, theater_id: theater_id }, {
            $inc: { [`seats_day_wise.${filter_date}.${timing}.tickets_bought`]: no_of_seats_booked, 'total_tickets_booked': no_of_seats_booked },
            $set: {
                [`seats_day_wise.${filter_date}.${timing}.SeatArray`]: screen_layout
            }
        });
        if (rewards == "true") {
            const User = await User.findOne({ user_id: data.user_id });
            var final_rewards = data.rewards;
            if (final_price > (final_rewards / 10))
                User.rewards = final_rewards % 10 + (final_price - (final_rewards / 10)) * 10;
            else
                User.rewards = (final_rewards / 10) - final_price + (final_rewards % 10);
            await User.save();
        }
        const movie_details = await Movie.findOneAndUpdate({ id: movie_id });
        const current_day = daysDifference(movie_details.release_date, date);
        movie_details.day_wise_tickets_sold[current_day] = movie_details.day_wise_tickets_sold[current_day] + no_of_seats_booked;
        movie_details.save();
        const theaters_details = await Theater.findOne({ id: theater_id });
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
            email: session.customer_details.email,
            name: session.customer_details.name,
            movieName: movie_details.title,
            theaterName: theaters_details.name,

        });
        await transaction.save();
        // await ScreenModel.findOneAndUpdate({ id: screen_id }, {
        //     $inc: { [`seats_day_wise.${filter_date}.${timing}.tickets_bought`]: no_of_seats_booked },
        //     $set: {
        //         [`seats_day_wise.${filter_date}.${timing}.SeatArray`]: screen_layout
        //     }
        // }).then((result) => {
        //     console.log(result);
        // }).catch((error) => {
        //     console.error(error);
        // });
        const email_data = {
            email: session.customer_details.email,
            name: session.customer_details.name,
            movieName: movie_details.title,
            showTime: timing,
            seatNos: seat_selected.join(' '),
            screenName: screenDetails.name,
            theaterName: theaters_details.name,
            date: filter_date,
            qrlink: getUrl(qr_code),
        }
        await sendTicketEmail(email_data)
        await RedisHelperDelete(req.query.key);
        res.redirect(303, 'http://localhost:3000/book-ticket/ticket/' + transaction.id);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/getTicketData/:id', async (req, res) => {
    const ticketDetails = await Transaction.findOne({ id: req.params['id'] })
    ticketDetails.qr_code = getUrl(ticketDetails.qr_code)
    console.log(ticketDetails);
    res.json({
        data: ticketDetails,
        status: HTTP_STATUS_CODES.OK
    })
})
router.post('/merchandise/checkout_session/:qty/:price', async (req, res) => { 
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'T-shirt',
                },
                unit_amount: req.params.price*100,
              },
              quantity: req.params.qty,
            }],
            mode: 'payment',
            success_url: `http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/`,
            cancel_url: `http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/`,
          });
      
          res.redirect(303, session.url);
    } catch (error) {
        console.log(error);
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