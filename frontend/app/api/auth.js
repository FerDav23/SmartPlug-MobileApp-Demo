import apiClient from "./client";
import { isDemoMode } from "../config/demoMode";
import { mockAuth } from "./mock/data";

// Return the result of the apiClient.post request
const endpoint = "/users";

const loginReal = async (...credentials) => {
  const result = await apiClient.post(endpoint + "/login", ...credentials);
  return result;
};

const checkTokenReal = async () => {
  console.log("checkToken");
  const result = await apiClient.get(endpoint + "/checkToken");
  return result;
};

const loginMock = async () => {
  return { ok: true, status: 200, data: mockAuth.login };
};

const checkTokenMock = async () => {
  return { ok: true, status: 201, data: mockAuth.checkToken };
};

const login = isDemoMode ? loginMock : loginReal;
const checkToken = isDemoMode ? checkTokenMock : checkTokenReal;

export default {
  login,
  checkToken,
};
