import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp= async (req, res) => {
    try {
      console.log("Request body:", req.body);
  
      const { name, email, password, confirmPassword } = req.body;
  
      // Validate all fields
      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      console.log("Hashing password...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      console.log("Saving user...");
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      console.log("Generating token...");
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1d" });
  
      console.log("User created successfully");
      res.status(201).json({
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
