/**
 * Mock data for demo mode. Shapes match what the app expects from response.data
 * and from chart helpers (PieChartCK.generateChartData, BarChartCK.generateChartData).
 */

// JWT that decodes to { id: 1, userId: 1, email: "demo@example.com" } (no verification in demo)
const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoxLCJlbWFpbCI6ImRlbW9AZXhhbXBsZS5jb20ifQ.demo";

// Auth: login expects { status, token, message? }; checkToken expects status 201
export const mockAuth = {
  login: {
    status: true,
    token: DEMO_TOKEN,
    message: "Demo login",
  },
  checkToken: {}, // App.js only checks result.status === 201
};

// Users: register expects { success, token }; getUser expects { token }
export const mockUsers = {
  register: { success: true, token: DEMO_TOKEN },
  getUser: { token: DEMO_TOKEN },
  updateUser: { success: true },
  emailExist: { exists: false },
  userExist: { exists: false },
};

// Rooms: getRooms returns { rooms: [{ room_id, room_name, ... }] } (RoomScreen uses room_id, room_name)
export const mockRooms = {
  rooms: [
    { room_id: "room1", room_name: "Living Room" },
    { room_id: "room2", room_name: "Kitchen" },
    { room_id: "room3", room_name: "Bedroom" },
  ],
};

// Smart plugs: plug_id must match device_id in energy consumption for charts
const PLUG_1 = "plug_001";
const PLUG_2 = "plug_002";

export const mockSmartPlugsByRoom = {
  room1: [
    { plug_id: PLUG_1, device_label: "TV & Console", deviceName: "TV & Console", status: 1 },
    { plug_id: PLUG_2, device_label: "Lamp", deviceName: "Lamp", status: 0 },
  ],
  room2: [
    { plug_id: "plug_003", device_label: "Coffee Maker", deviceName: "Coffee Maker", status: 1 },
  ],
  room3: [
    { plug_id: "plug_004", device_label: "AC", deviceName: "AC", status: 0 },
  ],
};

// Default room for unknown roomId
const defaultPlugs = mockSmartPlugsByRoom.room1;

export function getMockSmartPlugs(roomId) {
  return mockSmartPlugsByRoom[roomId] || defaultPlugs;
}

// Energy consumption day/week: array of { device_id, total_energy_kw }; device_id must match plug_id
export const mockEnergyConsumptionDayByRoom = {
  room1: [
    { device_id: PLUG_1, total_energy_kw: 1.25 },
    { device_id: PLUG_2, total_energy_kw: 0.35 },
  ],
  room2: [{ device_id: "plug_003", total_energy_kw: 0.8 }],
  room3: [{ device_id: "plug_004", total_energy_kw: 2.1 }],
};

export const mockEnergyConsumptionWeekByRoom = {
  room1: [
    { device_id: PLUG_1, total_energy_kw: 8.5 },
    { device_id: PLUG_2, total_energy_kw: 2.1 },
  ],
  room2: [{ device_id: "plug_003", total_energy_kw: 5.2 }],
  room3: [{ device_id: "plug_004", total_energy_kw: 14.0 }],
};

function getMockEnergyDay(roomId) {
  return mockEnergyConsumptionDayByRoom[roomId] || mockEnergyConsumptionDayByRoom.room1;
}

function getMockEnergyWeek(roomId) {
  return mockEnergyConsumptionWeekByRoom[roomId] || mockEnergyConsumptionWeekByRoom.room1;
}

export function getMockEnergyDayForRoom(roomId) {
  return getMockEnergyDay(roomId);
}

export function getMockEnergyWeekForRoom(roomId) {
  return getMockEnergyWeek(roomId);
}

// Hourly: { energyConsumption: [{ energy_watts, time_hour }] } for BarChartCK.generateChartData
export const mockHourlyByPlug = {
  [PLUG_1]: {
    energyConsumption: [
      { time_hour: "00:00", energy_watts: "0.1" },
      { time_hour: "06:00", energy_watts: "0.2" },
      { time_hour: "12:00", energy_watts: "0.25" },
      { time_hour: "18:00", energy_watts: "0.3" },
    ],
  },
  [PLUG_2]: {
    energyConsumption: [
      { time_hour: "00:00", energy_watts: "0.05" },
      { time_hour: "12:00", energy_watts: "0.15" },
    ],
  },
  plug_003: {
    energyConsumption: [
      { time_hour: "07:00", energy_watts: "0.4" },
      { time_hour: "08:00", energy_watts: "0.2" },
    ],
  },
  plug_004: {
    energyConsumption: [
      { time_hour: "14:00", energy_watts: "0.5" },
      { time_hour: "15:00", energy_watts: "0.6" },
    ],
  },
};

export function getMockHourlyForPlug(plugID) {
  return mockHourlyByPlug[plugID] || { energyConsumption: [{ time_hour: "12:00", energy_watts: "0.1" }] };
}

// Mutations: toggle/add return { smStatus: 0|1, message }; update { success }; delete { success, message? }
export const mockToggleResponse = { smStatus: 1, message: "Demo: toggled" };
export const mockAddSmartPlugResponse = { smStatus: 1, message: "Demo: added" };
export const mockUpdateSmartPlugResponse = { success: true };
export const mockDeleteSmartPlugResponse = { success: true, message: "Demo: deleted" };
