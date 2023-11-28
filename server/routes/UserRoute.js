require('dotenv').config()
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const { HTTP_STATUS_CODES } = require('../constants')
const { createToken } = require('../Helpers/JwtAuth');
const { upload } = require('../Helpers/S3');
const { sendMessage } = require('../Helpers/WhatsappAPI');
const uniqid = require('uniqid');
const { RedisHelperAdd, RedisHelperGet, RedisHelperDelete } = require('../Helpers/RedisHelper');
const {createCustomer} = require('../Helpers/stripeAPI');
const { sendSignUpEmail } = require('../Helpers/sendGridHelper');
const { generateAndPingQRCode } = require('../Helpers/qrCodeGenerator');
const saltRounds = 10;
router.get('/addUser', (req, res) => {
    // RedisHelperAdd(req, res, "hello", { "token": "hello" })
    // const data = {
    //     email: 'mahendrachittupolu@gmail.com',
    //     name: 'Mahendra'
    // };
    // sendSignUpEmail(data);
    // console.log(data)
    generateAndPingQRCode('123456789', "Test");
    res.send('Hello, world!');
});

router.post('/signup', upload.single('file'), async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const name = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const password_value = req.body.password;
    const confirmPassword = req.body.confirmPassword
    const dob = req.body.dateOfBirth;
    const gender = req.body.gender;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const zipCode = req.body.zipCode;
    const address1 = req.body.address1;
    const genres = req.body.genres;
    const cast = req.body.favoriteArtists;
    const crew = req.body.favoriteCrew;
    const profile_url = req.file.location;
    const preferredLanguages = req.body.preferredLanguages

    const password = await bcrypt.hash(password_value, saltRounds);
    isAdmin = false;
    if (req.body.name == 'admin' && req.body.email == 'boxoffice3108@gmail.com') {
        isAdmin = true;
    }
    if (password_value == confirmPassword) {
        const newUser = new User({
            user_id: uniqid(),
            fullname: name,
            email: email,
            password: password,
            firstname: '',
            lastname: '',
            dob: dob,
            gender: gender,
            mobile: phoneNumber,
            genres: genres,
            stripe_customer_id: '',
            profile_url: profile_url,
            favourite_artists: cast,
            favourite_crew: crew,
            preferred_languages: preferredLanguages,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            country: country,
            zipcode: zipCode,
            is_admin: isAdmin,
            is_prime: false,
        });
      //  const customerID = await createCustomer(newUser.user_id, name, email, phoneNumber);
    //    newUser.stripe_customer_id = customerID;
        console.log(newUser);
        // Save the user to the database

        try {
             await newUser.save();

            res.status(HTTP_STATUS_CODES.OK).send("user registered successfully");
        }
        catch (err) {
            console.error(err);
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("internal server error");
        }
    }
    else {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("passwords Not Matching");
    }

})

router.post("/login", async (req, res) => {
    try {
        email = req.body.email;
        password = req.body.password;
        const users = await User.findOne({ email: email });
        console.log(users);
        // users_obj = JSON.parse(users);
        // console.log(users_obj.password);
        if (users.length === 0) {
            res.json({
                message: 'user not found',
                status: HTTP_STATUS_CODES.NOT_FOUND
            })
        }
        else {
            data = { email: req.body.email, fullname: users.fullname, isAdmin: users.is_admin, profile_url: users.profile_url }
            createToken(req, res, email, password);
            console.log(res.getHeaders()['set-cookie']);
            password_match = await bcrypt.compare(password, users.password)
            if (password_match) {
                res.json({
                    message: 'user found',
                    status: HTTP_STATUS_CODES.OK,
                    data: data
                })
            }
            else {
                res.json({
                    message: 'password incorrect',
                    status: HTTP_STATUS_CODES.NOT_FOUND,
                    data: data
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

router.post('/updateProfile', upload.single('file'), async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        user.firstname = req.body.firstName
        user.lastname = req.body.lastName
        user.dob = req.body.birthDate
        user.gender = req.body.identity
        user.mobile = req.body.phone
        user.genres = [];
        if (req.file)
            user.profile_url = req.file.location
        user.favourite_artists = [];
        await user.save();
        res.json({ message: "User details updated successfully", status: HTTP_STATUS_CODES.OK });
    } else {
        res.json({ message: "Cannot update user details", status: HTTP_STATUS_CODES.NOT_FOUND });
    }
});


router.post('/uploadFile', upload.single('file1'), (req, res) => {
    upload.single('file2')
    const uploadedFile = req.file;
    console.log(uploadedFile);
    const imageUrls = uploadedFile.map((file) => {
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`;
    });
    res.json({ imageUrls });
});

router.get('/sendMessage', async (req, res) => {
    // console.log(req.body);
    sendMessage(req, res);
    // res.json({ message: "User details updated successfully", status: HTTP_STATUS_CODES.OK });
});
router.get('/profileDetails/:id', async(req,res) => {
        id = req.params['id'];
        await User.findOne({id : id}).then((result) => {
            console.log(result);
            res.json({
                message : "User details",
                status : HTTP_STATUS_CODES.OK,
                data: result
            })

        }).catch((err) => {
            console.error(err);
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Internal server Error");
        })
});
module.exports = router;