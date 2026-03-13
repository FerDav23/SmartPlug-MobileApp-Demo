import apiClient from "./client";
import { isDemoMode } from "../config/demoMode";
import { mockRooms } from "./mock/data";

const endpoint = "/rooms";

const getRoomsReal = async (...query) => {
  const result = await apiClient.get(endpoint + "/getRooms", ...query);
  return result;
};

const getRoomsMock = async () => {
  return { ok: true, status: 200, data: mockRooms };
};

const getRooms = isDemoMode ? getRoomsMock : getRoomsReal;

export default { getRooms };
