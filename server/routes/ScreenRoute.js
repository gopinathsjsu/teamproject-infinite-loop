require('dotenv').config()
const express = require('express')
const moment = require('moment');
const router = express.Router();
const { status, ScreenModel } = require('../models/ScreenModel');
const MovieModel = require('../models/MovieModel');
const TheaterModel = require('../models/TheaterModel');
const { upload } = require('../Helpers/S3');
const uniqid = require('uniqid');
const { HTTP_STATUS_CODES } = require('../constants')
router.post('/addScreen', async (req, res) => {
    try {
        screen = req.body;
        console.log(screen);
        seatArray = {}
        seatArray = { ...seatArray, ...screen.seats };
        console.log('at /addScreeen');
        const theater_id = req.body.theater_id;
        // const screen_count = await ScreenModel.countDocuments({ theater_id: theater_id });
        // console.log(screen_count);
        const newScreen = new ScreenModel({
            id: uniqid(),
            name: req.body.screenName,
            show_timings: req.body.timing,
            format: req.body.format,
            rows: req.body.rows,
            columns: req.body.col,
            seating_capacity: req.body.rows * req.body.col,
            cost: req.body.cost,
            seating_arrangement: seatArray,
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
        console.log(id);
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
            console.log(id);
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
        const movie = await MovieModel.findOne({ id: movie_id })
        const screen = await ScreenModel.findOne({ id: screenId })
        movie_added_date = new Date();
        end_date = new Date(movie.end_date);
        const oneDay = 24 * 60 * 60 * 1000;
        const daysDifference = Math.round(Math.abs((movie_added_date - end_date) / oneDay));
        console.log(daysDifference);
        const theater = await TheaterModel.findOne({ id: theater_id });
        await TheaterModel.updateOne({ id: theater_id }, {
            movie_ids: [...theater.movie_ids, movie_id]
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.error(error);
        });
        console.log(screenId);
        console.log(screen);
        console.log(movie);
        seatArray = screen.seating_arrangement;
        const timestampsForDays = {};
        for (let i = 0; i < daysDifference; i++) {
            const currentDate = moment().add(i, 'days');
            const formattedDate = currentDate.format('YYYY-MM-DD');
            timestampsForDays[formattedDate] = {};

            timestampsForDays[formattedDate]['9:00 am'] = {
                SeatArray: seatArray,
                occupancy_status: 'available',
                tickets_bought: 0,
            };
            timestampsForDays[formattedDate]['1:00 pm'] = {
                SeatArray: seatArray,
                occupancy_status: 'available',
                tickets_bought: 0,
            };
            timestampsForDays[formattedDate]['6:00 pm'] = {
                SeatArray: seatArray,
                occupancy_status: 'available',
                tickets_bought: 0,
            };
            timestampsForDays[formattedDate]['10:00 pm'] = {
                SeatArray: seatArray,
                occupancy_status: 'available',
                tickets_bought: 0,
            };
        }
        if (screen.movie_name) {
            res.send(HTTP_STATUS_CODES.BAD_REQUEST);
        }
        else {
            await ScreenModel.updateOne({ id: screenId }, {
                movie_name: movie.title,
                movie_image: movie.poster_url,
                movie_id: movie.id,
                run_time: movie.run_time,
                movie_id: movie.id,
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
// router.get('/getScreenLayout/:theater_id/:screen_id/:value/:movie_id/:time', async (req, res) => {
router.post('/getScreenLayout', async (req, res) => {
    try {
        // id = req.params['theater_id'];
        console.log("at Scressns/getScreenLayout");
        // console.log(req.params['value']);
        // time_selected = req.params['time'];
        // console.log(time_selected);
        // movie_id_val = req.params['movie_id'];
        // screen_id_val = req.params['screen_id'];
        // return "";
        id = req.body.theater_id;
        screen_id_val = req.body.screen_id;
        movie_id_val = req.body.movie_id;
        time_selected = req.body.time;
        date_value = req.body.value;
        console.log(date_value);
        const date = new Date(date_value);
        console.log(date);
        const filter_data = date.toISOString().split('T')[0];
        // return "";
        console.log(time_selected);
        const screen = await ScreenModel.findOne({
            [`seats_day_wise.${filter_data}`]: { $exists: true }, movie_id: movie_id_val, id: screen_id_val
        }).select(`seats_day_wise.${filter_data} cost`);
        // return "";
        console.log(screen);
        console.log(filter_data);
        console.log(screen.seats_day_wise[filter_data][time_selected].SeatArray);
        // console.log(screen[filter_data][time_selected]);
        // return "";
        // console.log(screen.seats_day_wise[filter_data][String(time_selected)]);
        // screen_layout = screen[0].seats_day_wise[filter_data][String(time_selected)];
        res.json({
            message: 'Screen found',
            status: HTTP_STATUS_CODES.OK,
            data: {
                seatArray: screen.seats_day_wise[filter_data][time_selected].SeatArray,
                occupancy_status: screen.seats_day_wise[filter_data][time_selected].occupancy_status,
                cost: screen.cost,
                tickets_bought: screen.seats_day_wise[filter_data][time_selected].tickets_bought
            }
        })
    }
    catch (err) {
        console.log(err);
        res.send(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
});
router.post('/updateScreen', async (req, res) => {
    screen = req.body;
    console.log(screen);
    seatArray = {}
    seatArray = { ...seatArray, ...screen.seats };
    const update = {
        name: req.body.screenName,
        show_timings: req.body.timing,
        format: req.body.format,
        rows: req.body.rows,
        columns: req.body.col,
        seating_capacity: req.body.rows * req.body.col,
        cost: req.body.cost,
        seating_arrangement: seatArray,
        theater_id: req.body.theater_id,
    }
    await ScreenModel.updateOne({ id: req.body.id }, update).then((result) => {
        console.log(result);
        res.status(HTTP_STATUS_CODES.OK).send("updated successfully");
    }).catch((error) => {
        console.error(error)
    })
});
router.post('/deleteScreen', async (req, res) => {
    id = req.body.id;
    await ScreenModel.deleteOne({ id: id }).then((result) => {
        console.log(result);
        res.status(HTTP_STATUS_CODES.OK).send("deleted Successfully");
    }).catch((err) => {
        console.log(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("Internal server Error");
    })
});
module.exports = router;