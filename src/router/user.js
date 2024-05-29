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

export default router;
