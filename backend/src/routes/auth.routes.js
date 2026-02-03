import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Router for auth-related endpoints
const router = express.Router();

router.post("/register", async (req, res) => {
  // Read input from request body
  const { name, email, password } = req.body;

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create and store the user in MongoDB
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  // Read login credentials
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare the provided password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create a JWT token containing the user id
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return res.json({ token });
});


// Protected route example
import authMiddleware from "../middleware/auth.middleware.js";
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

export default router;
