require('dotenv').config()
const express = require('express')
const router = express.Router();
const Movie = require('../models/MovieModel');
const { upload } = require('../Helpers/S3');

router.post('/add', upload.single('file'),async (req, res) => {
     try {
        console.log(req.body);
        const newMovie = new Movie({
            movie_id:{type: String},
            title: req.body.movieName,
            cast: req.body.cast,
            description: req.body.AboutTheMovie,
            genres: req.body.genre,
            format: req.body.format,
            languages: req.body.languages,
            movie_trailer_url: req.body.movieTrailerLink,
            run_time:req.body.Runtime,
            rating:0,
            release_date: req.body.releaseDate,
            end_date: req.body.endDate,
            cast: req.body.cast,
            crew: req.body.crew,
            certificate:req.body.certificate,
            ticket_price:0,
            tickets_sold:0,
            movie_url:req.file.location,
            popularity: 0,          
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

module.exports = router;