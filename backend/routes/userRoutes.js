const express = require("express");
const { register, login } = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../config/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/checkToken", protect, (req, res) => {
    console.log("checking token");
    res.status(201).json({ isValid: true });
  });

module.exports = router;
