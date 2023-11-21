require('dotenv').config()
const express = require('express')
const moment = require('moment');
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
        let count0 = 0;
        let count1 = 0;
        let count2 = 0;
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
router.get('/:id/:value?', async (req, res) => {

    try {
        id = req.params['id'];
        console.log("at Scressns/get");
        console.log(req.params['value']);
        // return "";
        if (req.params['value']) {
            const date = new Date(Number(req.params['value']));
            const filter_data = date.toISOString().split('T')[0];
            // return "";
            const screen = await ScreenModel.find({
                [`seats_day_wise.${filter_data}`]: { $exists: true }
            });
            console.log(screen);
            // return "";
            res.json({
                message: 'Screen found',
                status: HTTP_STATUS_CODES.OK,
                data: screen
            })
        }
        else {
            const screen = await ScreenModel.find({ theater_id: id });
            console.log(screen);
            // return "";
            res.json({
                message: 'Screen found',
                status: HTTP_STATUS_CODES.OK,
                data: screen
            })
        }


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
        const theater_id = req.body.theater_id;
        const movie = await MovieModel.find({ id: movie_id })
        const screen = await ScreenModel.find({ screen_id: screenId })
        console.log(screen);
        seatArray = screen[0].seat_array;
        const timestampsForDays = {};
        for (let i = 0; i < 5; i++) {
            const currentDate = moment().add(i, 'days');
            const formattedDate = currentDate.format('YYYY-MM-DD');
            timestampsForDays[formattedDate] = {};

            // Assuming you want a single timestamp for each day at 9:00 AM
            timestampsForDays[formattedDate]['09:00 am'] = {
                SeatArray: seatArray,
                occupancy_status: 'available', // Replace with the actual occupancy status
            };
            timestampsForDays[formattedDate]['1:00 pm'] = {
                SeatArray: seatArray,
                occupancy_status: 'available', // Replace with the actual occupancy status
            };
            timestampsForDays[formattedDate]['06:00 pm'] = {
                SeatArray: seatArray,
                occupancy_status: 'available', // Replace with the actual occupancy status
            };
            timestampsForDays[formattedDate]['10:00 pm'] = {
                SeatArray: seatArray,
                occupancy_status: 'available', // Replace with the actual occupancy status
            };
        }
        if (screen[0].movie_name) {
            res.json({ message: "screen already have a movie ", status: HTTP_STATUS_CODES.BAD_REQUEST, data: "" });
        }
        else {
            await ScreenModel.updateOne({ screen_id: screenId }, {
                movie_name: movie[0].title,
                movie_image: movie[0].poster_url,
                run_time: movie[0].run_time,
                cost: tkt_price,
                seats_day_wise: timestampsForDays
            }).then((result) => {
                console.log(result);
            }).catch((error) => {
                console.error(error);
            });
            res.json({ message: "Updated Movies in Screen", status: HTTP_STATUS_CODES.OK, data: "" });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.json({
            message: "Internal Server Error",
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        })
    }
})
module.exports = router;