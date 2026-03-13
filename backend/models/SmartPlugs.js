const pool = require("../config/db");

const SmartPlug = {
  register: async (deviceName, scannedID, roomId) => {
    // First check if the scanned ID already exists
    const existingDevice = await pool.query(
      "SELECT * FROM smart_plug WHERE sm_id = $1",
      [scannedID]
    );

    // If device already exists, return empty array
    if (existingDevice.rows.length > 0) {
      return { rows: [] };
    }

    // If device doesn't exist, proceed with insertion
    return pool.query(
      "INSERT INTO smart_plug (status, room_id, device_label, sm_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [false, roomId, deviceName, scannedID]
    );
  },

  getAllSmartPlugsByRoomId: async (roomId) => {
    return pool.query(
      " SELECT DISTINCT sp.device_label, sp.plug_id, sp.status FROM smart_plug sp WHERE sp.room_id = $1",
      [roomId]
    );
  },

  toggleSwitch: async (plugId) => {
    console.log("inside toggleSwitch");
    const currentStatus = await pool.query(
      "SELECT status FROM smart_plug WHERE plug_id = $1",
      [plugId]
    );
    //console.log(currentStatus.rows[0].status);
    // Toggle the status to the opposite value
    const result = await pool.query(
      "UPDATE smart_plug SET status = $1 WHERE plug_id = $2",
      [!currentStatus.rows[0].status, plugId]
    );

    return !currentStatus.rows[0].status;
  },

  getEnergyConsumptionHourly: async (roomId) => {
    return pool.query(
      `SELECT hec.* 
       FROM hourly_energy_consumption hec
       INNER JOIN smart_plug sp ON hec.device_id = sp.plug_id
       WHERE sp.room_id = $1
       AND DATE(hec.hour) = CURRENT_DATE
       ORDER BY hec.hour ASC;`,
      [roomId]
    );
  },

  getEnergyConsumptionDay: async (roomId) => {
    return pool.query(
      ` SELECT da.* 
        FROM dummy_daily_energy_consumption da
        INNER JOIN smart_plug sp ON da.device_id = sp.plug_id
        WHERE sp.room_id = $1;`,
      [roomId]
    );
  },

  getDummyHourlyEnergyConsumption: async (plugID) => {
    return pool.query(
    `SELECT energy_watts, EXTRACT(HOUR FROM date_hour) time_hour
      FROM hourly_energy_consumption
      WHERE device_id = $1
      AND date_hour >= '2025-03-25'::timestamptz
      AND date_hour < '2025-03-26'::timestamptz;`,
      [plugID]
    );
  },

  getHourlyEnergyConsumption: async (plugID) => {
    return pool.query(
    `SELECT energy_watts, EXTRACT(HOUR FROM date_hour) time_hour
      FROM hourly_energy_consumption
      WHERE device_id = $1
      AND date_hour >= date_trunc('day', now());`,
      [plugID]
    );
  },


  getEnergyConsumptionWeekly: async (roomId) => {
    return pool.query(
      ` SELECT da.* 
        FROM dummy_weekly_energy_consumption da
        INNER JOIN smart_plug sp ON da.device_id = sp.plug_id
        WHERE sp.room_id = $1;`,
      [roomId]
    );
  },

  deleteSmartPlug: async (plugID) => {
    return pool.query(
      "DELETE FROM smart_plug WHERE plug_id = $1",
      [plugID]
    );
  },

  updateSMName: async (plugID, deviceName) => {
    return pool.query(
      "UPDATE smart_plug SET device_label = $1 WHERE plug_id = $2",
      [deviceName, plugID]
    );
  },


};

module.exports = SmartPlug;
