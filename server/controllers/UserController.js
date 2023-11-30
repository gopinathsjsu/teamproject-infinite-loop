require('dotenv').config();
const express = require('express');
const router = express.Router();
const user = require('../models/UserModel');
const { HTTP_STATUS_CODES } = require('../constants');

exports.updateUserDetails = async (userID, update) => { 
    try {
        const result = await user.updateOne({ id: userID }, { $set: update });
        if (result.nModified == 0) {
            console.log('No user found with the given userID');
            return false;
        }
        return true;
    } catch (err) {
        console.error('Error occured while updating the user details: ', err.message);
        throw err;
    }
};