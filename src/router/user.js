import express from 'express';
import userSchema from '../models/user.js';

const router = express.Router();

// Create user
router.post('/users', (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

//Get all users
router.get('/users', (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

//Get specific users
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

//Update specific users
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age, phone, country } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, email, age, phone, country } })
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

//Delete specific users
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

export default router;
