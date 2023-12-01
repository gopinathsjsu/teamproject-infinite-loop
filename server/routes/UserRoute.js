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
const { createCustomer, getCustomer } = require('../Helpers/stripeAPI');
const { sendSignUpEmail, sendTicketEmail } = require('../Helpers/sendGridHelper');
const { generateAndPingQRCode } = require('../Helpers/qrCodeGenerator');
const Movie = require('../models/MovieModel');
const Transaction = require('../models/TransactionModel');
const saltRounds = 10;
const { getMovieDetails } = require('../controllers/MovieController');
const { getTheaterDetails } = require('../controllers/TheaterController');
const { get } = require('request');
const { getUrl } = require('../Helpers/S3');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { ScreenModel } = require('../models/ScreenModel');
router.get('/addUser', async (req, res) => {
    // RedisHelperAdd(req, res, "hello", { "token": "hello" })
    // const data = await RedisHelperGet("hello");
    // console.log('_______');
    // console.log(data);
    // res.json({
    //    /     data: JSON.parse(data)
    // })
    // const data = {
    //     email: 'mahendrachittupolu@gmail.com',
    //     name: 'Mahendra',
    //     movieName: 'Animal',
    //     showTime: '9:00 Am',
    //     seatNos: 'A1 B1 C1 D1',
    //     theaterName: "sandhya",
    //     qrlink: "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
    // };
    // // sendSignUpEmail(data);
    // // console.log(data)
    qr_key = await generateAndPingQRCode('pi_3OIKToA475w0fpJu1zAzct1t6');
    console.log(qr_key);
    get_qr_url = getUrl(qr_key);
    // sendTicketEmail(data);
    res.send(get_qr_url);
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
            user_id: email,
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
        const customerID = await createCustomer(newUser.user_id, name, email, phoneNumber);
        newUser.stripe_customer_id = customerID;
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
router.get('/isPrimeMember/:id', async (req, res) => {
    const user = await User.findOne({ user_id: req.params["id"] }).select({ "email": 1 })
    const customers = await stripe.customers.list({
        email: user.email,
        limit: 1 // Assuming email is unique per customer
    });
    const customer = customers.data[0];
    const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
    });

    res.json({
        message: 'uuser details found',
        status: HTTP_STATUS_CODES.OK,
        data: subscriptions.data[0].status
    })
})
router.post("/login", async (req, res) => {
    try {
        email = req.body.email;
        password = req.body.password;
        console.log(email);
        const users = await User.findOne({ email: email });
        console.log(users);
        // users_obj = JSON.parse(users);
        // console.log(users_obj.password);
        if (users == null) {
            // res.json({
            //     message: 'user not found',
            //     status: HTTP_STATUS_CODES.NOT_FOUND
            // })
            res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("user not found");
        }
        else {
            data = { email: req.body.email, fullname: users.fullname, isAdmin: users.is_admin, profile_url: users.profile_url, user_id: users.user_id }
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
    post_data = req.body;
    console.log(post_data);
    if (req.file) {
        profile_url = req.file.location;
    }
    const cast = req.body.favoriteCast;
    const crew = req.body.favoriteCrew;
    await User.updateOne({ user_id: post_data.id }, {
        fullname: post_data.fullName,
        email: post_data.email,
        firstname: '',
        lastname: '',
        dob: post_data.dob,
        gender: post_data.gender,
        mobile: post_data.phoneNumber,
        genres: post_data.genres,
        favourite_artists: cast,
        favourite_crew: crew,
        preferred_languages: post_data.preferredLanguages,
        address1: post_data.address1,
        address2: post_data.address2,
        city: post_data.city,
        state: post_data.state,
        country: post_data.scountry,
        zipcode: post_data.zipCode,
        ...(req.file && { profile_url }),
    }).then((result) => {
        console.log(result);
        res.status(HTTP_STATUS_CODES.OK).send("updated successfully");
    }).catch((error) => {
        console.error(error);
    })
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
router.get('/profileDetails/:id', async (req, res) => {
    id = req.params['id'];
    console.log(id);
    await User.findOne({ user_id: id }).then((result) => {
        console.log(result);
        res.json({
            message: "User details",
            status: HTTP_STATUS_CODES.OK,
            data: result
        })
    }).catch((err) => {
        console.error(err);
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Internal server Error");
    })

});

router.get('/getPurchaseHistory/:id', async (req, res) => {
    id = req.params['id'];
    console.log(id);
    console.log("at get purchanse Hisory");
    const movies = await getMovieDetails();
    //console.log(movies);
    const theaters = await getTheaterDetails();
    const purchase_history = await Transaction.find({ user_id: id });
    const response = [];
    purchase_history.forEach((item) => {
        var itemm = {};
        console.log(movies[item.movie_id]);
        itemm.movie = movies[item.movie_id];
        itemm.theater = theaters[item.theater_id];
        itemm.qr_url = getUrl(item.qr_code);
        itemm.details = item;
        response.push(itemm);
    });
    console.log(purchase_history);

    res.json({
        message: "Purchase history",
        status: HTTP_STATUS_CODES.OK,
        data: response
    });
});

router.get('/getReommendedMovies/:id', async (req, res) => {
    id = req.params['id'];
    const user = await User.findOne({ user_id: id });
    const userPreferredGenresString = user.genres[0];
    const userPreferredGenres = userPreferredGenresString.split(',').map(genre => genre.trim());
    console.log(userPreferredGenres);
    try {
        const recommendedMovies = await Movie.find({
            $or: userPreferredGenres.map(genre => ({ genres: new RegExp(genre, 'i') })),
        });
        res.json({
            status: HTTP_STATUS_CODES.OK,
            message: "found Movies",
            data: recommendedMovies
        })
    }
    catch (err) {
        console.error(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("OOPS>>>....");
    }
})

router.get('/getRewards/:id', async (req, res) => {
    id = req.params['id'];
    console.log(id);
    await User.findOne({ user_id: id }).select({ "rewards": 1 }).then((result) => {
        console.log(result);
        res.json({
            message: "Rewards details",
            status: HTTP_STATUS_CODES.OK,
            data: result.rewards
        })
    }).catch((err) => {
        console.error(err);
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Internal server Error");
    })
});

router.post('/cancelTicket', async (req, res) => {
    const transaction_data = await Transaction.findOne({ id: req.body.details.id });
    console.log(transaction_data);
    data = req.body.details
    seat_ids = data.seat_ids;
    const no_of_seats_booked = seat_ids.length;
    date = data.show_date.split('T')[0];
    console.log(date);
    console.log(data.show_time)
    // const screen = await ScreenModel.findOne({ name: data.screen_id, movie_id: data.movie_id });
    // const screen = await ScreenModel.findOne({ name: data.screen_id, movie_id: data.movie_id }).select(`seats_day_wise.2023-11-30.9:00 am`);
    try {
        const screen = await ScreenModel.findOne({
            [`seats_day_wise.${date}`]: { $exists: true }, movie_id: data.movie_id, name: data.screen_id
        }).select(`seats_day_wise.${date} cost`);
        screenLayout = transaction_data.screenLayout;
        console.log(screen.seats_day_wise[date][data.show_time].SeatArray);
        screenLayout = screen.seats_day_wise[date][data.show_time].SeatArray;
        seat_ids.forEach(seat => {
            const row = seat.charAt(0);
            const number = parseInt(seat.slice(1), 10) - 1; // Convert to zero-based index
            if (screenLayout[row]) {
                let offset = 0;
                for (let i = 0; i < screenLayout[row].length; i++) {
                    if (screenLayout[row][i] === 3) {
                        offset++; // Skip over unavailable seats
                    } else if (i - offset === number) {
                        if (screenLayout[row][i] === 1) {
                            screenLayout[row][i] = 0; // Cancel the booking by setting it to 0
                        }
                        break;
                    }
                }
            }
        });
        console.log(screenLayout);
        await ScreenModel.findOneAndUpdate({ movie_id: data.movie_id, name: data.screen_id }, {
            $inc: { [`seats_day_wise.${date}.${data.show_time}.tickets_bought`]: -no_of_seats_booked, 'total_tickets_booked': -no_of_seats_booked },
            $set: {
                [`seats_day_wise.${date}.${data.show_time}.SeatArray`]: screenLayout
            }
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
        await Transaction.updateOne({ id: data.id }, { refund_requested: true });
        console.log(data.user_id);
        console.log(data.price);
        await User.updateOne({ user_id: data.user_id }, {
            $inc: { 'rewards': -data.price }
        })
        // console.log(await ScreenModel.findOne({ name: data.screen_id, movie_id: data.movie_id }));
        res.json({
            status: HTTP_STATUS_CODES.OK,
            message: 'refund successfull',
        })
    }
    catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send("internal server error");
    }

});
module.exports = router;