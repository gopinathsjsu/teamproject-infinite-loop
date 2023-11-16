require('dotenv').config()
const express = require('express')
const router = express.Router();
const Artist = require('../models/ArtistModel');
const { upload } = require('../Helpers/S3');



router.post('/add', upload.single('image'),async (req, res) => {
    try {
        console.log(req.body);
        const newArtist = new Artist({
            name: req.body.name,
            profile_url: req.file.location,
            type: req.body.roletype,
            profession: req.body.role
        });

        // Save the user to the database
        await newArtist.save();
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;