const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');
const todoRoute = require('./routes/todo');

mongoose.connect('');


const app = express();
app.use(express.json());
app.use(cors());

app.use(userRoute);
app.use(todoRoute);

app.listen("3011",()=>{
  console.log("http://localhost:3011")
})

module.exports = app;
