require('dotenv').config()
const express = require('express')
const router = express.Router();
const { status, ScreenModel } = require('../models/ScreenModel');
const MovieModel = require('../models/MovieModel');
const { upload } = require('../Helpers/S3');
const { HTTP_STATUS_CODES } = require('../constants')
router.post('/addScreen', async (req, res) => {
    try {
        screen = req.body;
        console.log(screen);
        const seatArray = []
        Object.entries(screen.seats).forEach(([row, col]) => {
            seatArray.push({
                Row: `${row}`,
                Status: col
            })
        });
        console.log('at /addScreeen');
        const theater_id = req.body.theater_id;
        const screen_count = await ScreenModel.countDocuments({ theater_id: theater_id });
        console.log(screen_count);
        const newScreen = new ScreenModel({
            screen_id: `${theater_id}_Screen_${screen_count + 1}`,
            screen_name: req.body.screenName,
            show_times: req.body.timing,
            screen_type: req.body.format,
            rows: req.body.rows,
            columns: req.body.col,
            seating_capacity: req.body.rows * req.body.col,
            cost: req.body.cost,
            seat_array: seatArray,
            theater_id: theater_id,
        });
        console.log(newScreen);

        // Save the Screen to the database
        await newScreen.save();
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating user:', error);
        res.json({
            message: "Internal Server Error",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        })
    }
})

router.get('/all', async (req, res) => {
    try {
        console.log('/screen/all');
        const screen = await ScreenModel.find();
        res.json({ message: "Screens Found", status: HTTP_STATUS_CODES.OK, data: screen });
    } catch (error) {
        console.error('Error creating user:', error);
        res.json({
            message: "Internal Server Error",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        })
    }
})
router.get('/:id', async (req, res) => {

    try {
        id = req.params['id'];
        console.log("hello");
        const screen = await ScreenModel.find({ theater_id: id })
        console.log(screen);
        res.json({
            message: 'Screen found',
            status: HTTP_STATUS_CODES.OK,
            data: screen
        })

    }
    catch (err) {
        console.log(err);
        res.json({
            message: 'screen Not found',
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: JSON.stringify("")
        })
    }
})
router.post('/addMovie', async (req, res) => {
    try {
        console.log('/screen/addMovie');
        console.log(req.body);
        const movie_id = req.body.movie;
        const screenId = req.body.screen_id;
        const tkt_price = req.body.ticketPrice;
        const movie = await MovieModel.find({ id: movie_id })
        await ScreenModel.updateOne({ screen_id: screenId }, {
            movie_name: movie[0].title,
            movie_image: movie[0].poster_url,
            run_time: movie[0].run_time,
            cost: tkt_price
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.error(error);
        });
        res.json({ message: "Updated Movies in Screen", status: HTTP_STATUS_CODES.OK, data: "" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.json({
            message: "Internal Server Error",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        })
    }
})
module.exports = router;