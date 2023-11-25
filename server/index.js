const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('./db');
const UserRoute = require('../server/routes/UserRoute')
const TheatreRoute = require('../server/routes/TheatreRoute')
const MovieRoute = require('../server/routes/MovieRoute')
const ScreenRoute = require('../server/routes/ScreenRoute')
const ArtistRoute = require('../server/routes/ArtistRoute')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const paymentRoute = require('../server/routes/PaymentRoute');
const port = 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET_KEY,
    // You can use the default in-memory store or choose another session store here
  }));

  app.use('/api/payment',paymentRoute)
app.use('/api/artist', ArtistRoute)
app.use('/api/theater', TheatreRoute)
app.use('/api/screen', ScreenRoute)
app.use('/api/movie', MovieRoute)
app.use('/api/user', UserRoute)
app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`)
})