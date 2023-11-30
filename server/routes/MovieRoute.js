require('dotenv').config()
const express = require('express')
const router = express.Router();
const Movie = require('../models/MovieModel');
const Artist = require('../models/ArtistModel');
const uniqid = require('uniqid');
const { upload } = require('../Helpers/S3');
const { HTTP_STATUS_CODES } = require('../constants');
const { get } = require('mongoose');
const { daysDifference } = require('../controllers/MovieController');

router.post('/add', upload.array('movieposter', 2), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const daysDifference = daysDifference(req.body.endDate, req.body.releaseDate);
        const newMovie = new Movie({
            id: uniqid(),
            title: req.body.movieName,
            cast: req.body.cast,
            description: req.body.AboutTheMovie,
            genres: req.body.genre,
            format: req.body.format,
            languages: req.body.languages,
            trailer_url: req.body.movieTrailerLink,
            run_time: req.body.Runtime,
            no_of_days: daysDifference,
            day_wise_tickets_sold: Array(daysDifference).fill(0),
            rating: 0,
            release_date: req.body.releaseDate,
            end_date: req.body.endDate,
            cast: req.body.castIds.split(','),
            crew: req.body.crewIds.split(','),
            certificate: req.body.certificate,
            ticket_price: 0,
            tickets_sold: 0,
            poster_url: req.files[0].location,
            banner_url: req.files[1].location,
            popularity: 0,
        });

        // Save the user to the database
        await newMovie.save();
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
})
router.post('/updateMovie', upload.array('movieposter', 2), async (req, res) => {
    if (req.file) {
        poster_url = req.files[0].location;
        banner_url = req.files[1].location;
    }
    const update = {
        title: req.body.movieName,
        cast: req.body.cast,
        description: req.body.AboutTheMovie,
        genres: req.body.genre,
        format: req.body.format,
        languages: req.body.languages,
        trailer_url: req.body.movieTrailerLink,
        run_time: req.body.Runtime,
        rating: 0,
        release_date: req.body.releaseDate,
        end_date: req.body.endDate,
        cast: req.body.castIds.split(','),
        crew: req.body.crewIds.split(','),
        certificate: req.body.certificate,
        ticket_price: 0,
        tickets_sold: 0,
        ...(req.file && { poster_url }),
        ...(req.file && { banner_url }),
        popularity: 0,
    };

    // Save the user to the database
    await Movie.updateOne({ id: req.body.id }, update).then((result) => {
        console.log(result);
        res.status(HTTP_STATUS_CODES.OK).send("updated movie details successfully");
    }).catch((err) => {
        console.log(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("Internal server error");
    })

})
router.post('/deleteMovie', async (req, res) => {
    id = req.body.id;
    await Movie.deleteOne({ id: id }).then((result) => {
        console.log(result);
        res.status(HTTP_STATUS_CODES.OK).send("deleted Successfully");
    }).catch((err) => {
        console.log(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("Internal server Error");
    })
});
router.get('/all', async (req, res) => {
    try {

        // Save the user to the database
        const movies = await Movie.find();
        res.json({ message: "loaded all movie successfully", status: HTTP_STATUS_CODES.OK, movies: movies });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
})

router.get('/getAllMoviesNames', async (req, res) => { 
    const response = await Movie.find().select({ title: 1, _id: 0 });
    res.json({
        message: "get movie names",
        status: HTTP_STATUS_CODES.OK,
        data: response
    })
});
router.get('/getRecommendedMovies', async (req, res) => {
    console.log('at recommended movies');
    try {
        const results = await Movie.aggregate([
            { $sample: { size: 6 } },
            { $project: { id: 1, title: 1, banner_url: 1, genres: 1 } }
        ]).exec();
        res.json({
            message: "get recommended movies",
            status: HTTP_STATUS_CODES.OK,
            data: results
        })
    }
    catch (err) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
})

async function getMovieArtists(movie, key) {
    const artists = movie[key];
    //  console.log(artists);
    const artists_details = await Artist.find({ id: { $in: artists } });
    console.log(artists_details);
    return artists_details;
}
router.get('/getMovieOccupancyDayWise/:id', async (req, res) => { 
    try {
        const movie = await Movie.findOne({ id: req.params.id }).select({ 'day_wise_tickets_sold': 1 });
        const occupancy = movie.day_wise_tickets_sold;
        console.log(occupancy);
        res.json({
            message: "get occupancy",
            status: HTTP_STATUS_CODES.OK,
            data: occupancy
        })
    }
    catch (err) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
});
router.get('/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        // Save the user to the database
        const movie = await Movie.findOne({ id: req.params.id });
        const cast = await getMovieArtists(movie, 'cast');
        const crew = await getMovieArtists(movie, 'crew');
        //  console.log(movie);
        res.json({ message: "Added movie successfully", status: HTTP_STATUS_CODES.OK, movie: movie, cast: cast, crew: crew });
    } catch (error) {
        console.error('Error ', error);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
})


module.exports = router;