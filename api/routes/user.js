import express from "express";
import User from "../db/Models/UserSchema.js";

const UserRouter = express.Router();

// Create a new user
UserRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(200).json({ msg: "User created successfully", user: user });
  } catch (error) {
    res.status(400).json({ error: "Failed to create user." });
  }
});

export default UserRouter;
