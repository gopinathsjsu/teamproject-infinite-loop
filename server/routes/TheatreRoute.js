require('dotenv').config();
const express = require('express');
const router = express.Router();
const { upload } = require('../Helpers/S3');
const { HTTP_STATUS_CODES } = require('../constants')
const Theater = require('../models/TheaterModel');
router.post('/add', upload.single('file'), async (req, res) => {
    try {
        console.log('at /addTheater');
        // console.log(JSON.parse(req.body.data).theater_name);
        const post_data = JSON.parse(req.body.data);
        const count = await Theater.countDocuments();
        image_url = req.file.location;
        console.log(req.body);
        const newTheater = new Theater({
            name: post_data.theater_name,
            description: post_data.description,
            location: post_data.state,
            zipcode: post_data.zipcode,
            theater_url: post_data.location_url,
            image_url: image_url,
            theater_constructed_date: post_data.theatre_constructed_date,
            theater_id: `${post_data.theater_name}_${count + 1}`,
            address: post_data.address,
            mobile: post_data.phno,
            city: post_data.city,
            mail: post_data.email
        })
        console.log(newTheater);
        await newTheater.save();
        res.json({ message: "Theatre Created successfully", status: HTTP_STATUS_CODES.OK, data: newTheater });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: 'Uff...Contact..Admin',
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: JSON.stringify(err)
        })

    }
})

router.get('/all', async (req, res) => {
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