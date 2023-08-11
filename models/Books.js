const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  reviewer: {
    type: String,
  },
}, {
  timestamps: true,
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  photo: String, // Corrected syntax
  published: {
    type: Boolean,
    default: false,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema], // Add the array of reviews
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
