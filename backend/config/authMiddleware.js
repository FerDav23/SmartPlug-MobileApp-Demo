// config/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user object to the request (assuming User.findByPk is valid)
      req.user = await User.findByPk(decoded.userId, {
        attributes: { exclude: ["password"] },
      });

      next(); // Pass control to the next middleware/route handler
    } catch (error) {
      console.log("error", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Export the protect middleware
module.exports = { protect };