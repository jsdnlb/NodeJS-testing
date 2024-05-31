import express from 'express';
import bookSchema from '../models/book.js';

const router = express.Router();

// Create book
router.post('/books', (req, res) => {
  const user = bookSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

//Get all books
router.get('/books', (req, res) => {
  bookSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

export default router;
