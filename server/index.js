const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('./db');
const UserRoute = require('../server/routes/UserRoute')
const TheatreRoute = require('../server/routes/TheatreRoute')
const PosterRoute = require('../server/routes/PosterRoute')
const MovieRoute = require('../server/routes/MovieRoute')
const ScreenRoute = require('../server/routes/ScreenRoute')
const ArtistRoute = require('../server/routes/ArtistRoute')
const DiscountRouter = require('../server/routes/DiscountRouter')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const paymentRoute = require('../server/routes/PaymentRoute');
const winston = require('winston');
const port = 8080
const corsOptions = {
  origin: ['http://localhost:3000', 'https://checkout.stripe.com'],
  credentials: true,
};
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});
app.use((req, res, next) => {
  logger.info(`Accessed route: ${req.method}  ${req.url}`);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET_KEY,
    // You can use the default in-memory store or choose another session store here
  }));
app.use('/api/discount', DiscountRouter);
app.use('/api/payment', paymentRoute)
app.use('/api/artist', ArtistRoute)
app.use('/api/theater', TheatreRoute)
app.use('/api/poster', PosterRoute)
app.use('/api/screen', ScreenRoute)
app.use('/api/movie', MovieRoute)
app.use('/api/user', UserRoute)
app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`)
})