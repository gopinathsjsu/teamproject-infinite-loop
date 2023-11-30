require('dotenv').config();
const express = require('express');
const router = express.Router();
const Theater = require('../models/TheaterModel');

function getTheaterDetails() { 
    return new Promise((resolve, reject) => {
        Theater.find({}).select({"name": 1, "address": 1, "id": 1, "screens": 1}).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    })
}

exports.getTheaterDetails = getTheaterDetails;