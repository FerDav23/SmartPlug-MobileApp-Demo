import apiClient from "./client";
import { isDemoMode } from "../config/demoMode";
import { mockUsers } from "./mock/data";

const endpoint = "/users";

const registerReal = async (...userInfo) => {
  console.log("in register");
  const result = await apiClient.post(endpoint + "/register", ...userInfo);
  return result;
};

const getUserReal = async (...query) => {
  const result = await apiClient.get(endpoint, ...query);
  if (!result.ok) {
    console.error("Failed to get user", result.problem);
    return null;
  }
  return result;
};

const updateUserReal = async (...body) => {
  const result = await apiClient.post(endpoint + "/update", ...body);
  if (!result.ok) {
    console.error("Failed to update user", result.problem);
    return null;
  }
  return result;
};

const emailExistReal = async (...query) => {
  const result = await apiClient.get(endpoint + "/emailExists", ...query);
  if (!result.ok) {
    console.error("Failed to check if email exist", result.problem);
    return null;
  }
  return result;
};

const userExistReal = async (...query) => {
  const result = await apiClient.get(endpoint + "/userExists", ...query);
  if (!result.ok) {
    console.error("Failed to check if user exist", result.problem);
    return null;
  }
  return result;
};

const registerMock = async () => {
  return { ok: true, status: 200, data: mockUsers.register };
};

const getUserMock = async () => {
  return { ok: true, status: 200, data: mockUsers.getUser };
};

const updateUserMock = async () => {
  return { ok: true, status: 200, data: mockUsers.updateUser };
};

const emailExistMock = async () => {
  return { ok: true, status: 200, data: mockUsers.emailExist };
};

const userExistMock = async () => {
  return { ok: true, status: 200, data: mockUsers.userExist };
};

const register = isDemoMode ? registerMock : registerReal;
const getUser = isDemoMode ? getUserMock : getUserReal;
const updateUser = isDemoMode ? updateUserMock : updateUserReal;
const emailExist = isDemoMode ? emailExistMock : emailExistReal;
const userExist = isDemoMode ? userExistMock : userExistReal;

export default { register, getUser, updateUser, emailExist, userExist };
