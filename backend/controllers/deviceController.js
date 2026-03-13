const Device = require("../models/Device");
const mqttClient = require("../config/mqtt");

exports.registerDevice = async (req, res) => {
  try {
    const { userId, deviceName, macAddress } = req.body;
    const device = await Device.register(userId, deviceName, macAddress);
    res.status(201).json(device.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Device registration failed" });
  }
};

exports.toggleDevice = async (req, res) => {
  try {
    const { deviceId, status } = req.body;

    // Publish command to MQTT broker
    mqttClient.publish(`smartplug/${deviceId}/command`, status);

    // Update status in the database
    await Device.updateStatus(deviceId, status);

    res.json({ message: `Sent ${status} command to smart plug ${deviceId}` });
  } catch (error) {
    res.status(500).json({ error: "Device update failed" });
  }
};
