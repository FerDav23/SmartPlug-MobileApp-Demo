const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT Token function
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the email is already in use
    const existingUser = await User.findByEmail(email);
    if (existingUser.rows.length > 0) {
      console.log("Email is already in use");
      return res.status(200).json({ message: "Email is already in use", success: 0 });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create(email, hash);
    const token = generateToken(newUser.rows[0].user_id);
    res.status(201).json({ success: 1, token });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
 console.log("Registra");
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user.rows.length) return res.status(200).json({ message: "User not found", status: 0 });

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(200).json({ message: "Invalid credentials", status: 0 });
    console.log("user.rows[0].user_id", user.rows[0].user_id);
    const token = generateToken(user.rows[0].user_id);
    res.status(200).json({ token, status: 1 });
  } catch (error) {
    res.status(200).json({ message: "Login failed", status: 0 });
  }
};
