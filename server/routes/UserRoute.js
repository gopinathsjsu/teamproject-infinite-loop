const express = require('express')
const router = express.Router();
const User = require('../models/UserModel');
const { HTTP_STATUS_CODES } = require('../constants')

router.get('/addUser', (req, res) => {
    res.send('Hello, world!');
  });

router.post('/signup', async (req, res) => {
    try {
     const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user to the database
    await newUser.save();
        res.json({ message:"User registered successfully",status:HTTP_STATUS_CODES.OK});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
})

router.get
module.exports = router;