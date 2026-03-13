const pool = require("../config/db");

const RoomSmartPlug = {
  register: async (roomName, userId) => {
    return pool.query(
      "INSERT INTO rooms (room_name, user_id) VALUES ($1, $2) RETURNING *",
      [roomName, userId]
    );
  },

  getAllRoomsByUserId: async (userId) => {
    return pool.query(
      " SELECT DISTINCT r.room_name, r.room_id FROM rooms r INNER JOIN smart_plug sp ON r.room_id = sp.room_id WHERE r.user_id = $1",
      [userId]
    );
  },

  getAllRoomsIdSmartPlug: async (userId) => {
    return pool.query(
      "SELECT room_id FROM smart_plug WHERE user_id = $1",
      [userId]
    );
  },
  
};

module.exports = RoomSmartPlug;
