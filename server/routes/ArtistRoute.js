require('dotenv').config()
const express = require('express')
const router = express.Router();
const  Artist  = require('../models/ArtistModel');
const { upload } = require('../Helpers/S3');
const { HTTP_STATUS_CODES } = require('../constants')



router.post('/add', upload.single('image'),async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const newArtist = new Artist({
            id:uniqid(),
            name: req.body.fullname,
            gender: req.body.gender,
            profile_url: req.file.location,
            type: req.body.category,
            profession: req.body.profession,
            dob:req.body.dateOfBirth
        });

        // Save the user to the database
      const artist =  await newArtist.save();
        res.json({artist:newArtist, message: "Added artist successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating artist:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/all', async (req, res) => {
    try {
        const Cast = await Artist.find({type : 'Cast'}).select({ "name": 1,"profile_url":1,"id":1,  "_id": 0});;
         const Crew = await Artist.find({type:'Crew'}).select({ "name": 1, "profile_url":1,"id":1,"_id": 0});;
        res.json({ Cast: Cast,Crew:Crew, status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error sending artist details:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/get/:id', async (req, res) => { 
    try {
        const artist = await Artist.findOne({id: req.params.id});
        res.json({ artist: artist, status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error sending artist details:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;