const Books = require('../models/Books');
const router = require('express').Router()

// ADD BOOKS
router.post('/add', async (req, res, next) => {

    try {
        const articles = await Books(req.body)
        const save = await articles.save()
        res.status(200).json(save)
        res.status(200).json('book addedd')

        console.log(save)
    } catch (err) {
        next(err);
        console.log(err);
    }

})

// FILTER BY GENRE AND AUTHOR NAME
router.get('/filtered', async (req, res) => {
    try {
        const { genre, publicationDate, author } = req.query;
        const filters = {};

        if (genre) {
            filters.genre = genre;
        }

        if (publicationDate) {
            filters.publicationDate = { $gte: new Date(publicationDate) };
        }

        if (author) {
            filters.author = author;
        }

        const books = await Books.find(filters);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// GET BOOKS
router.get('/get', async (req, res, next) => {
    try {
        const articles = await Books.find()
        res.status(200).json(articles)
    } catch (err) {
        console.log(err)
        next(err)
    }
})
// UPDATE BOOKS DATA
router.patch('/update/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const updates = req.body;

        const updatedBook = await Books.findByIdAndUpdate(
            bookId,
            { $set: updates }, // Use $set to apply partial updates
            { new: true } // Return the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
});

// ADD NEW REVIEWS
router.post('/books/:bookId/reviews', async (req, res) => {
    const { bookId } = req.params;
    const { rating, comment, reviewer } = req.body;
  
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      const newReview = {
        rating,
        comment,
        reviewer,
      };
  
      book.reviews.push(newReview);
      await book.save();
  
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'An error occurred while creating the review' });
    }
  });

// GET BOOKS BY ID
router.get('/get/:id', async (req, res, next) => {
    try {
        const articles = await Books.findById(req.params.id)
        res.status(200).json(articles)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

// DELETE ARTICLE
router.delete('/delete/:id', async (req, res, next) => {
    try {
        await Books.findByIdAndDelete(req.params.id)
        res.status(200).json('article deleted')
    } catch (err) {
        console.log(err)
        next(err)
    }
})

module.exports = router;