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

// Rooms: getRooms returns { rooms: [{ room_id, room_name, ... }] }
export const mockRooms = {
  rooms: [
    { room_id: "room1", room_name: "Living Room" },
    { room_id: "room2", room_name: "Kitchen" },
    { room_id: "room3", room_name: "Bedroom" },
    { room_id: "room4", room_name: "Office" },
    { room_id: "room5", room_name: "Bathroom" },
  ],
};

// Smart plug IDs used across rooms (must match device_id in energy data)
const PLUG_LIVING_TV = "plug_001";
const PLUG_LIVING_LAMP = "plug_002";
const PLUG_LIVING_SOUNDBAR = "plug_003";
const PLUG_LIVING_ROUTER = "plug_004";
const PLUG_KITCHEN_COFFEE = "plug_005";
const PLUG_KITCHEN_MICROWAVE = "plug_006";
const PLUG_KITCHEN_TOASTER = "plug_007";
const PLUG_BEDROOM_AC = "plug_008";
const PLUG_BEDROOM_LAMP = "plug_009";
const PLUG_BEDROOM_CHARGER = "plug_010";
const PLUG_OFFICE_MONITOR = "plug_011";
const PLUG_OFFICE_LAPTOP = "plug_012";
const PLUG_OFFICE_LAMP = "plug_013";
const PLUG_BATHROOM_HEATER = "plug_014";
const PLUG_BATHROOM_HAIRDRYER = "plug_015";

export const mockSmartPlugsByRoom = {
  room1: [
    { plug_id: PLUG_LIVING_TV, device_label: "TV & Console", deviceName: "TV & Console", status: 1 },
    { plug_id: PLUG_LIVING_LAMP, device_label: "Floor Lamp", deviceName: "Floor Lamp", status: 1 },
    { plug_id: PLUG_LIVING_SOUNDBAR, device_label: "Soundbar", deviceName: "Soundbar", status: 0 },
    { plug_id: PLUG_LIVING_ROUTER, device_label: "Router", deviceName: "Router", status: 1 },
  ],
  room2: [
    { plug_id: PLUG_KITCHEN_COFFEE, device_label: "Coffee Maker", deviceName: "Coffee Maker", status: 1 },
    { plug_id: PLUG_KITCHEN_MICROWAVE, device_label: "Microwave", deviceName: "Microwave", status: 0 },
    { plug_id: PLUG_KITCHEN_TOASTER, device_label: "Toaster", deviceName: "Toaster", status: 0 },
  ],
  room3: [
    { plug_id: PLUG_BEDROOM_AC, device_label: "AC Unit", deviceName: "AC Unit", status: 0 },
    { plug_id: PLUG_BEDROOM_LAMP, device_label: "Bedside Lamp", deviceName: "Bedside Lamp", status: 1 },
    { plug_id: PLUG_BEDROOM_CHARGER, device_label: "Phone Charger", deviceName: "Phone Charger", status: 1 },
  ],
  room4: [
    { plug_id: PLUG_OFFICE_MONITOR, device_label: "Monitor", deviceName: "Monitor", status: 1 },
    { plug_id: PLUG_OFFICE_LAPTOP, device_label: "Laptop Dock", deviceName: "Laptop Dock", status: 1 },
    { plug_id: PLUG_OFFICE_LAMP, device_label: "Desk Lamp", deviceName: "Desk Lamp", status: 0 },
  ],
  room5: [
    { plug_id: PLUG_BATHROOM_HEATER, device_label: "Heater", deviceName: "Heater", status: 0 },
    { plug_id: PLUG_BATHROOM_HAIRDRYER, device_label: "Hair Dryer", deviceName: "Hair Dryer", status: 0 },
  ],
};

const defaultPlugs = mockSmartPlugsByRoom.room1;

export function getMockSmartPlugs(roomId) {
  return mockSmartPlugsByRoom[roomId] || defaultPlugs;
}

// Energy consumption day: total_energy_kw per device (realistic kWh-ish values per day)
export const mockEnergyConsumptionDayByRoom = {
  room1: [
    { device_id: PLUG_LIVING_TV, total_energy_kw: 1.85 },
    { device_id: PLUG_LIVING_LAMP, total_energy_kw: 0.42 },
    { device_id: PLUG_LIVING_SOUNDBAR, total_energy_kw: 0.28 },
    { device_id: PLUG_LIVING_ROUTER, total_energy_kw: 0.36 },
  ],
  room2: [
    { device_id: PLUG_KITCHEN_COFFEE, total_energy_kw: 0.95 },
    { device_id: PLUG_KITCHEN_MICROWAVE, total_energy_kw: 0.52 },
    { device_id: PLUG_KITCHEN_TOASTER, total_energy_kw: 0.18 },
  ],
  room3: [
    { device_id: PLUG_BEDROOM_AC, total_energy_kw: 3.20 },
    { device_id: PLUG_BEDROOM_LAMP, total_energy_kw: 0.35 },
    { device_id: PLUG_BEDROOM_CHARGER, total_energy_kw: 0.12 },
  ],
  room4: [
    { device_id: PLUG_OFFICE_MONITOR, total_energy_kw: 0.88 },
    { device_id: PLUG_OFFICE_LAPTOP, total_energy_kw: 1.12 },
    { device_id: PLUG_OFFICE_LAMP, total_energy_kw: 0.25 },
  ],
  room5: [
    { device_id: PLUG_BATHROOM_HEATER, total_energy_kw: 2.40 },
    { device_id: PLUG_BATHROOM_HAIRDRYER, total_energy_kw: 0.15 },
  ],
};

// Energy consumption week: same structure, ~7x day values (varied)
export const mockEnergyConsumptionWeekByRoom = {
  room1: [
    { device_id: PLUG_LIVING_TV, total_energy_kw: 12.8 },
    { device_id: PLUG_LIVING_LAMP, total_energy_kw: 2.9 },
    { device_id: PLUG_LIVING_SOUNDBAR, total_energy_kw: 1.9 },
    { device_id: PLUG_LIVING_ROUTER, total_energy_kw: 2.5 },
  ],
  room2: [
    { device_id: PLUG_KITCHEN_COFFEE, total_energy_kw: 6.2 },
    { device_id: PLUG_KITCHEN_MICROWAVE, total_energy_kw: 3.1 },
    { device_id: PLUG_KITCHEN_TOASTER, total_energy_kw: 1.0 },
  ],
  room3: [
    { device_id: PLUG_BEDROOM_AC, total_energy_kw: 18.5 },
    { device_id: PLUG_BEDROOM_LAMP, total_energy_kw: 2.4 },
    { device_id: PLUG_BEDROOM_CHARGER, total_energy_kw: 0.85 },
  ],
  room4: [
    { device_id: PLUG_OFFICE_MONITOR, total_energy_kw: 5.8 },
    { device_id: PLUG_OFFICE_LAPTOP, total_energy_kw: 7.2 },
    { device_id: PLUG_OFFICE_LAMP, total_energy_kw: 1.6 },
  ],
  room5: [
    { device_id: PLUG_BATHROOM_HEATER, total_energy_kw: 14.2 },
    { device_id: PLUG_BATHROOM_HAIRDRYER, total_energy_kw: 0.9 },
  ],
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

// Hourly: full 24h-style data for richer bar charts (energy_watts as string)
function hourlySeries(hoursWithWatts) {
  return hoursWithWatts.map(([hour, watts]) => ({ time_hour: hour, energy_watts: String(watts) }));
}

export const mockHourlyByPlug = {
  [PLUG_LIVING_TV]: {
    energyConsumption: hourlySeries([
      ["00:00", 0.05], ["06:00", 0.08], ["08:00", 0.12], ["12:00", 0.10], ["14:00", 0.15],
      ["18:00", 0.22], ["20:00", 0.28], ["22:00", 0.25], ["23:00", 0.12],
    ]),
  },
  [PLUG_LIVING_LAMP]: {
    energyConsumption: hourlySeries([
      ["07:00", 0.02], ["08:00", 0.03], ["18:00", 0.04], ["19:00", 0.05], ["22:00", 0.03], ["23:00", 0.02],
    ]),
  },
  [PLUG_LIVING_SOUNDBAR]: {
    energyConsumption: hourlySeries([
      ["19:00", 0.04], ["20:00", 0.05], ["21:00", 0.05], ["22:00", 0.03],
    ]),
  },
  [PLUG_LIVING_ROUTER]: {
    energyConsumption: hourlySeries([
      ["00:00", 0.015], ["06:00", 0.015], ["12:00", 0.015], ["18:00", 0.015], ["23:59", 0.015],
    ]),
  },
  [PLUG_KITCHEN_COFFEE]: {
    energyConsumption: hourlySeries([
      ["06:00", 0.35], ["07:00", 0.42], ["08:00", 0.18], ["12:00", 0.22], ["15:00", 0.20],
    ]),
  },
  [PLUG_KITCHEN_MICROWAVE]: {
    energyConsumption: hourlySeries([
      ["07:30", 0.65], ["12:00", 0.58], ["18:30", 0.62],
    ]),
  },
  [PLUG_KITCHEN_TOASTER]: {
    energyConsumption: hourlySeries([
      ["07:00", 0.28], ["08:00", 0.15], ["18:00", 0.22],
    ]),
  },
  [PLUG_BEDROOM_AC]: {
    energyConsumption: hourlySeries([
      ["00:00", 0.18], ["01:00", 0.20], ["02:00", 0.19], ["06:00", 0.15], ["12:00", 0.22],
      ["14:00", 0.25], ["18:00", 0.28], ["22:00", 0.20], ["23:00", 0.18],
    ]),
  },
  [PLUG_BEDROOM_LAMP]: {
    energyConsumption: hourlySeries([
      ["06:00", 0.03], ["07:00", 0.04], ["21:00", 0.04], ["22:00", 0.05], ["23:00", 0.03],
    ]),
  },
  [PLUG_BEDROOM_CHARGER]: {
    energyConsumption: hourlySeries([
      ["22:00", 0.08], ["23:00", 0.10], ["00:00", 0.06], ["01:00", 0.04], ["06:00", 0.02],
    ]),
  },
  [PLUG_OFFICE_MONITOR]: {
    energyConsumption: hourlySeries([
      ["08:00", 0.04], ["09:00", 0.05], ["10:00", 0.05], ["11:00", 0.05], ["12:00", 0.03],
      ["13:00", 0.05], ["14:00", 0.05], ["15:00", 0.05], ["16:00", 0.05], ["17:00", 0.04],
    ]),
  },
  [PLUG_OFFICE_LAPTOP]: {
    energyConsumption: hourlySeries([
      ["08:00", 0.06], ["09:00", 0.07], ["10:00", 0.07], ["11:00", 0.07], ["12:00", 0.04],
      ["13:00", 0.07], ["14:00", 0.07], ["15:00", 0.07], ["16:00", 0.07], ["17:00", 0.05],
    ]),
  },
  [PLUG_OFFICE_LAMP]: {
    energyConsumption: hourlySeries([
      ["08:00", 0.03], ["09:00", 0.04], ["17:00", 0.03],
    ]),
  },
  [PLUG_BATHROOM_HEATER]: {
    energyConsumption: hourlySeries([
      ["06:00", 0.45], ["07:00", 0.52], ["08:00", 0.38], ["20:00", 0.40], ["21:00", 0.35],
    ]),
  },
  [PLUG_BATHROOM_HAIRDRYER]: {
    energyConsumption: hourlySeries([
      ["07:00", 0.85], ["07:15", 0.12], ["20:00", 0.78], ["20:20", 0.10],
    ]),
  },
};

const defaultHourly = {
  energyConsumption: hourlySeries([
    ["08:00", 0.15], ["12:00", 0.22], ["18:00", 0.28], ["21:00", 0.18],
  ]),
};

export function getMockHourlyForPlug(plugID) {
  return mockHourlyByPlug[plugID] || defaultHourly;
}

// Mutations: toggle/add return { smStatus: 0|1, message }; update { success }; delete { success, message? }
export const mockToggleResponse = { smStatus: 1, message: "Demo: toggled" };
export const mockAddSmartPlugResponse = { smStatus: 1, message: "Demo: added" };
export const mockUpdateSmartPlugResponse = { success: true };
export const mockDeleteSmartPlugResponse = { success: true, message: "Demo: deleted" };
