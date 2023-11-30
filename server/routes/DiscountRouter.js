require('dotenv').config();
const express = require('express');
const router = express.Router();
const {  HTTP_STATUS_CODES,DISCOUNTS } = require('../constants');

router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        DISCOUNTS.tuesday = req.body.tuesday;
        DISCOUNTS.night_time = req.body.night_time;
        res.json({ message: "Added discount successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating discount:', error);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
});

router.get('/all', async (req, res) => {
    try {
        res.json({ message: " discounts loaded successfully", data: DISCOUNTS, status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error sending discount details:', error);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
});

module.exports = router;