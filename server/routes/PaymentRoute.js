const express = require('express');
const router = express.Router();
const { status, ScreenModel } = require('../models/ScreenModel');
const handler = require('../Helpers/stripeAPI');
const { HTTP_STATUS_CODES } = require('../constants');

// router.post('/checkout_sessions', handler);


router.post('/buyTickets', async (req, res) => {
    console.log("at payment buy tickets");
    console.log(req.body);
    const date = new Date(req.body.date);
    const filter_date = date.toISOString().split('T')[0];
    const timing = req.body.timing
    const screen_id = req.body.screen;
    const screen_layout = req.body.screenLayout;
    const update = {
        $set: {
            [`seats_day_wise.${filter_date}.${timing}.SeatArray`]: screen_layout
        }
    };
    console.log(update);
    console.log(screen_layout);
    await ScreenModel.updateOne({ id: screen_id }, update).then((result) => {
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