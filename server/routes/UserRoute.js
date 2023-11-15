require('dotenv').config()
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const { HTTP_STATUS_CODES } = require('../constants')
const { createToken } = require('../Helpers/JwtAuth');
const { upload } = require('../Helpers/S3');
const saltRounds = 10;
router.get('/addUser', (req, res) => {
    res.send('Hello, world!');
});

router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const password = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            fullname: req.body.name,
            email: req.body.email,
            password: password,
        });

        // Save the user to the database
        await newUser.save();
        res.json({ message: "User registered successfully", status: HTTP_STATUS_CODES.OK });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.post("/login", async (req, res) => {
    try {
        email = req.body.email;
        password = req.body.password;
        const users = await User.find({ email: email });
        console.log(users[0]);
        // users_obj = JSON.parse(users);
        // console.log(users_obj.password);
        if (users.length === 0) {
            res.json({
                message: 'user not found',
                status: HTTP_STATUS_CODES.NOT_FOUND
            })
        }
        else {
            data = { email: req.body.email, fullname: users[0].fullname }
            createToken(req, res, email, password);
            console.log(res.getHeaders()['set-cookie']);
            password_match = await bcrypt.compare(password, users[0].password)
            if (password_match) {
                res.json({
                    message: 'user found',
                    status: HTTP_STATUS_CODES.OK,
                    data: JSON.stringify(data)
                })
            }
            else {
                res.json({
                    message: 'password incorrect',
                    status: HTTP_STATUS_CODES.NOT_FOUND,
                    data: JSON.stringify(data)
                })
            }

        }

    }
    catch (error) {
        console.error('Error loggin in user', error);
        res.json({
            message: 'Uff..Somethin went wrong..Contact admin',
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        })
    }
})

router.post('/uploadFile', upload.single('banner'), (req, res) => {
     const uploadedFile = req.file;
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadedFile.key}`;
    res.json({ imageUrl });
});
module.exports = router;