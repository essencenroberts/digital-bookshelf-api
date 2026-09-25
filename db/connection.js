const mongoose = require ('mongoose');
// require('dotenv').config();




// connect to MongoDB 
async function connectDB() {
  try {
    //MongoDB connection - get from .env
    const uri = process.env.MONGO_URI;

    await mongoose.connect(uri);
    
    console.log('Succesfully connected to MongoDB!');
  } catch(err) { console.error('connection error', err);
  
    
  }
  
  process.exit(1)
}


module.exports = connectDB


// const db = mongoose.connection db.on('error', (error) => console.log(error.message + 'mongo is not running!'))db.on('connected', () => console.log('mongo is conneted!' ))db.on('disconnected', ()=> console.log('mongo has been disconnected!'))