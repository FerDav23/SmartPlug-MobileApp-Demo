const RoomSmartPlug = require("../models/RoomSmartPlug");
//const mqttClient = require("../config/mqtt");

exports.getAllRoomsByUserId = async (req, res) => {
    console.log("getAllRoomsByUserId");
  try {
    const { userId } = req.query;
    const rooms = await RoomSmartPlug.getAllRoomsByUserId(userId);
    res.status(200).json({rooms: rooms.rows});
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve rooms" });
  }
};


