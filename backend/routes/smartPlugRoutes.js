const express = require("express");
//const { register, login } = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../config/authMiddleware");
const { getAllSmartPlugsByRoomId, toggleSwitch, getEnergyConsumptionDay, getEnergyConsumptionWeekly,
    getHourlyEnergyConsumption, addSmartPlug, deleteSmartPlug, updateSMName } = require("../controllers/smartPlugControllers");

router.get("/getSmartPlugs", protect, getAllSmartPlugsByRoomId);
router.post("/toggleSwitch", protect, toggleSwitch);
router.get("/getEnergyConsumptionDay", protect, getEnergyConsumptionDay);
router.get("/getEnergyConsumptionWeek", protect, getEnergyConsumptionWeekly);
router.get("/getHourlyEnergyConsumption", protect, getHourlyEnergyConsumption);
router.post("/addSmartPlug", protect, addSmartPlug);
router.post("/deleteSmartPlug", protect, deleteSmartPlug);
router.post("/updateSmartPlugName", protect, updateSMName);
module.exports = router;
