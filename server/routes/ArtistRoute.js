require('dotenv').config()
const express = require('express')
const router = express.Router();
const Artist = require('../models/ArtistModel');
const { upload } = require('../Helpers/S3');
const { HTTP_STATUS_CODES } = require('../constants')
const uniqid = require('uniqid');


router.post('/add', upload.single('image'), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const newArtist = new Artist({
            id: uniqid(),
            name: req.body.fullname,
            gender: req.body.gender,
            description: req.body.about,
            profile_url: req.file.location,
            type: req.body.category,
            profession: req.body.profession,
            dob: req.body.dateOfBirth
        });

        // Save the user to the database
        const artist = await newArtist.save();
        res.json({ artist: newArtist, message: "Added artist successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating artist:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/all', async (req, res) => {
    try {
        const Cast = await Artist.find({ type: 'Cast' }).select({ "name": 1, "profile_url": 1, "id": 1, "_id": 0, "profession": 1, "description": 1 });;
        const Crew = await Artist.find({ type: 'Crew' }).select({ "name": 1, "profile_url": 1, "id": 1, "_id": 0, "profession": 1, "description": 1 });;
        res.json({ Cast: Cast, Crew: Crew, status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error sending artist details:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/updateArtist', upload.single('image'), async (req, res) => {
    console.log(req.body);
    if (req.file) {
        profile_url = req.file.location;
    }
    const update = {
        name: req.body.fullname,
        gender: req.body.gender,
        description: req.body.about,
        ...(req.file && { profile_url }),
        type: req.body.category,
        profession: req.body.profession,
        dob: req.body.dateOfBirth
    };

    // Save the user to the database
    await Artist.updateOne({ id: req.body.id }, update).then((result) => {
        console.log(result);
        res.status(HTTP_STATUS_CODES.OK).send("updated successfully")
    }).catch((err) => {
        console.error(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("Internal server error")
    })
});
router.post('/deleteArtist', async (req, res) => {
    id = req.body.id;
    await Artist.deleteOne({ id: id }).then((result) => {
        console.log(result);
        res.status(HTTP_STATUS_CODES.OK).send("deleted Successfully");
    }).catch((err) => {
        console.log(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("Internal server Error");
    })
});
router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findOne({ id: req.params.id });
        res.json({ artist: artist, status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error sending artist details:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;