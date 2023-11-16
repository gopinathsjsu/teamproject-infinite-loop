require('dotenv').config();
const express = require('express');
const router = express.Router();
const { upload } = require('../Helpers/S3');
const { HTTP_STATUS_CODES } = require('../constants')
const Theater = require('../models/TheaterModel');
router.post('/addTheatre', upload.single('file'), async (req, res) => {
    try {
        const count = await Theater.countDocuments();
        image_url = req.file.location;
        console.log(typeof (image_url));
        const newTheater = new Theater({
            name: req.body.theatreName,
            description: req.body.description,
            location: req.body.state,
            zipcode: req.body.zipcode,
            theater_url: req.file.location,
            theater_constructed_date: req.body.theatre_constructed_date,
            theater_id: `${req.body.theatreName}_${count + 1}`,
            address: req.body.address,
            mobile: req.body.phno,
            city: req.body.city,
            mail: req.body.gmail
        })
        console.log(newTheater);
        await newTheater.save();
        res.json({ message: "Theatre Created successfully", status: HTTP_STATUS_CODES.OK });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: 'Uff...Contact..Admin',
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: JSON.stringify("")
        })

    }
})

router.post('/getAllTheater', async (req, res) => {
    try {
        const theaters = await Theater.find();
        console.log(theaters)
        res.json({
            message: 'Theater found',
            status: HTTP_STATUS_CODES.OK,
            data: JSON.stringify(theaters)
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            message: 'Theater Not found',
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: JSON.stringify("")
        })
    }
})

router.get('/getTheaterDetail/:id', async (req, res) => {

    try {
        id = req.params['id'];
        const theater = await Theater.find({ theater_id: id });
        console.log(theater);

        res.json({
            message: 'Theater found',
            status: HTTP_STATUS_CODES.OK,
            data: JSON.stringify(theater)
        })

    }
    catch (err) {
        console.log(err);
        res.json({
            message: 'Theater Not found',
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: JSON.stringify("")
        })
    }
})
module.exports = router; 