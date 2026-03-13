const express = require("express");
// const { registerDevice, toggleDevice } = require("../controllers/deviceController");
const { printCount, resetCount } = require("../controllers/mqttTestController");

const router = express.Router();

router.get("/getCount", printCount);
router.post("/resetCount", resetCount);

// Fixed wifiTest route
router.get("/wifiTest", (req, res) => {
    console.log("WiFi successfully connected");
    res.status(200).send("WiFi successfully connected");
});

module.exports = router;
