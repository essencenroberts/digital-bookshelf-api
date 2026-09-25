//dependcies import
require("dotenv").config()
const express = require('express');
const connectDB = require('./db/connection')
const bookRoutes = require('./routes/Bookroutes')
const app = express();

const mongoose = require("mongoose");

const PORT = process.env.PORT



// database
mongoose.connect(process.env.MONGO_URI);

const books = [
  {
    title: "The 5AM Club",
    author: "Robin Sharma",
    completed: true,
    
  }, 
  {
    title: "Atomic Habits",
    author: "James Clear",
    completed: true,
  }, 
  { 
    title: "No Excuses: The Power of Self-Discipline",
    author: "Bryan Tracy",
    completed: true,

  }, 
  { 
    title:"Be Here Now",
    author: "Ram Das",
    completed: true,   
  }
] // temporary database until we connect to MongoDB

//middleware
app.use(express.json());

//routes
app.use("/api/books", bookRoutes)

app.get("/", (req, res) => {
  res.send("Digital Bookshel API is running")
});


//port
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`)
});