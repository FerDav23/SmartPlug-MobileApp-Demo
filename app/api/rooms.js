import apiClient from "./client";

const endpoint = "/rooms";

const getRooms = async (...query) => {
  const result = await apiClient.get(endpoint + "/getRooms", ...query);
  return result;
};

export default { getRooms };
