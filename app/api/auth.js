import apiClient from "./client";

// Return the result of the apiClient.post request
const endpoint = "/users";
const login = async (...credentials) => {
  const result = await apiClient.post(endpoint + "/login", ...credentials);
  return result;
};

const checkToken = async () => {
  console.log("checkToken");
  const result = await apiClient.get(endpoint + "/checkToken");
  return result;
};

export default {
  login,
  checkToken,
};
