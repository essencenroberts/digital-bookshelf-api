const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// function to handle Eroors
function mongooseError(res, err) {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message});
  }
  if (err.name === "idError") {
    return res.status(400).json({
      message: "That is not a valid book id" 
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "A book with that ISBN already exists"
    });
  }

  return res.status(500).json({ message: err.message });
}


// NOTES
// POST = Create -> Add a new book
router.post("/", async(req, res) => {
  try {
    // req.body
    const newBook = await Book.create(req.body);

    res.status(201).json(newBook);
  } catch (error) {
    mongooseError(res, err)
  }
});

// GET  /api/books = Read -> Show me books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    mongooseError(res, err);
  }
});
  // /api/books/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }

    res.status(200).json(book)
  } catch (err) {
    mongooseError( res, err);
  }
});
// PUT /api/books/:id = update -> Change this book
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await book.findByIdAndUpdate(
      req.params.id,
      req.body, 
      {
        new: true,

        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    mongooseError(res, err);
  }
});


// DELETE = Delete /api/books/:id -> Remove this book

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      deletedBook,
    });
  } catch (err) {
    mongooseError(res, err);
  }
});

module.exports = router;