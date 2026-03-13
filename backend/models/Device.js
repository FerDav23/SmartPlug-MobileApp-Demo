const pool = require("../config/db");

const Device = {
  register: async (userId, deviceName, macAddress) => {
    return pool.query(
      "INSERT INTO devices (user_id, name, mac_address) VALUES ($1, $2, $3) RETURNING *",
      [userId, deviceName, macAddress]
    );
  },

  updateStatus: async (deviceId, status) => {
    return pool.query("UPDATE devices SET status = $1 WHERE id = $2", [
      status,
      deviceId,
    ]);
  },
};

module.exports = Device;
