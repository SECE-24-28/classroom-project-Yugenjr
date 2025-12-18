import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    console.log('Registration attempt:', { name, email, phone, password: password ? 'provided' : 'missing' });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    console.log('User created:', user.email);
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ message: "User registered", user: userWithoutPassword });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log('User found:', user.email);
    console.log('Password provided:', password ? 'Yes' : 'No');
    console.log('Stored password hash:', user.password ? 'Yes' : 'No');

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};
