const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('./db');
const port = 8080

app.use(cors());
app.get('/home', (req, res) => {
  res.json({message:'Hello World!'})
})

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`)
})