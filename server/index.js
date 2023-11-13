const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('./db');
const UserRoute = require('../server/routes/UserRoute')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 8080
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET_KEY,
    // You can use the default in-memory store or choose another session store here
  }));
app.use('/User',UserRoute)
app.get('/home', (req, res) => {
  res.json({message:'Hello World!'})
})

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`)
})