require('dotenv').config();
const express = require('express');
const router = express.Router();
const Movie = require('../models/MovieModel');

function getMovieDetails() {
    return new Promise((resolve, reject) => {
        Movie.find({}).select({"title": 1, "poster_url": 1}).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    })
}

exports.getMovieDetails = getMovieDetails;