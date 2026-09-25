const mongoose = require("mongoose")
const { Schema } = mongoose;

// define scheme for Book with title, author, isbn, publshedDate, inStock 

const bookSchema = new Schema(
  {
    title: {type: String, required: true,},
    author: {type: String, required: true,},
    isbn: {type: String, unique: true,}, // needs to be unique
    publishedDate: {type: Date},
    inStock: {type:Boolean, default: true} // Boolean true
  }
)

// export model
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;