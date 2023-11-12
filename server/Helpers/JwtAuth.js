var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

exports.createToken = (req,res, email,password) => {
      var token = jwt.sign({
          email: email,
          password : password
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400
      });
      req.session.isAuth=true;
      req.session.email=email;
      res.cookie("jwt",token,{
        expires:new Date(Date.now()+ 100000),
        httpOnly:true
      })
 }