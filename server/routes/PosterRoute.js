const express = require('express');
const router = express.Router();
const PosterModel = require('../models/PosterModel');
const { upload } = require('../Helpers/S3');
const { HTTP_STATUS_CODES } = require('../constants');
const uniqid = require('uniqid');
require('dotenv').config();


router.post('/addposter', upload.single('poster'), async (req, res) => {
    console.log(req.file.location);
    console.log(req.body);
    const poster = new PosterModel({
        id: uniqid(),
        poster_name: req.body.posterName,
        poster_id: req.body.posterId,
        poster_url: req.file.location
    })
    try {
        await poster.save();
        res.json({
            message: "fetched data",
            data: poster,
            status: HTTP_STATUS_CODES.OK
        })
    }
    catch (err) {
        console.error(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("ooops");
    }
})

router.get('/all', async (req, res) => {
    try {
        const posters = await PosterModel.find();
        console.log(posters);
        res.json({
            message: "fetched data",
            data: posters,
            status: HTTP_STATUS_CODES.OK
        })
    }
    catch (err) {
        console.error(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("internal server error");
    }

});
module.exports = router; 