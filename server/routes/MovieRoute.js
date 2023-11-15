require('dotenv').config()
const express = require('express')
const router = express.Router();
const Movie = require('../models/MovieModel');
const { upload } = require('../Helpers/S3');

router.post('/add', async (req, res) => {
     try {
        console.log(req.body);
        const newMovie = new Movie({
           
        });

        // Save the user to the database
        await newMovie.save();
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/list/all', async (req, res) => {
     try {
      
        // Save the user to the database
        const movies = await Movie.find();
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK,movies:movies });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/:id', async (req, res) => {
     try {
      
        // Save the user to the database
        const movies = await Movie.find({movie_id:id});
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK,movies:movies });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
})