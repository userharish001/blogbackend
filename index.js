const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Models/User')

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'https://blogwebsite-17a5.onrender.com', // replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify the allowed methods
}));
const DB = process.env.DB;
const PORT = process.env.PORT || 3001

mongoose.connect(DB);

app.post('/register', (req, res) => {
  UserModel.create(req.body).then(user => res.json(user)).catch(err => res.json(err))

})
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then(user => {
    if (user) {
      if (user.password === password) {
        res.json("success")
      }
      else {
        res.json("the password is wrong")
      }
    }
    else {
      res.json("no record found for this user")
    }
  })
})

app.listen(PORT, () => { console.log(`server is running on ${PORT}`) })