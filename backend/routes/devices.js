const express = require("express");
const { registerDevice, toggleDevice } = require("../controllers/deviceController");
const router = express.Router();

router.post("/register", registerDevice);
router.post("/toggle", toggleDevice);

module.exports = router;
