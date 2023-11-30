require('dotenv').config();
const express = require('express');
const router = express.Router();
const Movie = require('../models/MovieModel');

function getMovieDetails() {
    return new Promise((resolve, reject) => {
        Movie.find({}).select({"title": 1, "poster_url": 1,"id":1}).then((result) => {
            const movies = {};
        // Iterate over the result and populate the movies object
        result.forEach(movie => {
            // Use the movie's ID as the key and map it to an object containing the name and poster URL
            movies[movie.id] = {name: movie.title, poster_url: movie.poster_url};
        });
            resolve(movies);
        }).catch((err) => {
            reject(err);
        })
    })
}

exports.getMovieDetails = getMovieDetails;