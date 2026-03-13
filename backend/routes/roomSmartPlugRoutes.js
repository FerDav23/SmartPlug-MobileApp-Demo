const express = require("express");
//const { register, login } = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../config/authMiddleware");
const { getAllRoomsByUserId } = require("../controllers/roomSmartPlugControllers");

router.get("/getRooms", protect, getAllRoomsByUserId);

module.exports = router;
