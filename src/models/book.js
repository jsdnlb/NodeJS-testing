import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    language: { type: String, default: 'English' },
    availableCopies: { type: Number, default: 1 },
    pages: { type: Number, required: true },
    genres: [String],
    publisher: String,
    description: String,
    coverImage: String,
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
