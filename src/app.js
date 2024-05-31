import express from 'express';
import { v4 } from 'uuid';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './router/user.js';
import bookRoutes from './router/book.js';

dotenv.config();
const app = express();

app.use(express.json());

// mongodb connection
const url = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then(() => {
    console.log('Correctly connected to db');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });

// middlware
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

//routes
app.get('/', (req, res) => {
  res.send('Welcome to home again!');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/tasks', (req, res) => {
  res.json([]);
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) return res.sendStatus(400);

  res.json({
    title,
    description,
    id: v4(),
  });
});

export default app;
