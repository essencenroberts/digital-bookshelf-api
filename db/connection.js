const mongoose = require ('mongoose');
require('dotenv').config();

//MongoDB connection
const uri = process.env.MONGO_URI;

// connect to MongoDB 
mongoose.connect(uri)
  .then(() => console.log('Succesfully connected to MongoDB!'));
  .catch(err => console.error('connection error', err));




// const db = mongoose.connection db.on('error', (error) => console.log(error.message + 'mongo is not running!'))db.on('connected', () => console.log('mongo is conneted!' ))db.on('disconnected', ()=> console.log('mongo has been disconnected!'))