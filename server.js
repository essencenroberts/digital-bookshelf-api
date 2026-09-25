//dependcies import
const express = reuire('express');
const app = express();
require("dotenv").config()
const mongoose = require("mongoose");


// database
mongoose.connect(process.env.MONGO_URI);

//middleware

//routes



//port