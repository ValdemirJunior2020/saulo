import express from 'express';
import User from '../db/Models/UserSchema.js';

const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users. The gremlins stole them!' });
  }
});

UserRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(200).json({ msg: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ msg: 'Failed to register user. Maybe the aliens hacked our system!' });
  }
});

export default UserRouter;
