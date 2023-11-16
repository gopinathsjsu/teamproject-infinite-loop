require('dotenv').config()
const express = require('express')
const router = express.Router();
const Screen = require('../models/ScreenModel');
const { upload } = require('../Helpers/S3');

router.post('/add', async (req, res) => {
     try {
        console.log(req.body);
        const newScreen = new Screen({
           
        });

        // Save the user to the database
        await newScreen.save();
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/list/all', async (req, res) => {
     try {
      
        // Save the user to the database
        const screen = await Screen.find();
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK,screens:screen });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;