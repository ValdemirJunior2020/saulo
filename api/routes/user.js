import express from 'express';
import User from '../db/Models/UserSchema.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
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
    const { name, email, password} = req.body;
    if (name && email && password){
      const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashPassword});
    res.status(200).json({ msg: 'User registered successfully', user: user });
    }else{
      res.status(400).json({msg: "you forgot your email, name or password"})
    }
    
  } catch (error) {
    res.status(400).json({ msg: 'Failed to register user. Maybe the aliens hacked our system!' });
  }
});
UserRouter.post("/login", async (req, res)=>{
  try {
        const {email, password}= req.body;
        const existUser =await User.findOne({email, password})
        if(!existUser){
          res.status(400).json({error: "user not Found, have you Registered?"})
        }
        res.status(201).json({msg: "user logged in", user: existUser})
  } catch (error) {
      res.status(404).json({error: error})
  }
})
export default UserRouter;
