import apiClient from "./client";

const endpoint = "/users";

const register = async (...userInfo) => {
  console.log("in register");
  const result = await apiClient.post(endpoint + "/register", ...userInfo);

  return result;
};

const getUser = async (...query) => {
  const result = await apiClient.get(endpoint, ...query);
  if (!result.ok) {
    console.error("Failed to get user", result.problem);
    return null;
  }

  return result;
};

const updateUser = async (...body) => {
  const result = await apiClient.post(endpoint + "/update", ...body);
  if (!result.ok) {
    console.error("Failed to update user", result.problem);
    return null;
  }

  return result;
};

const emailExist = async (...query) => {
  const result = await apiClient.get(endpoint + "/emailExists", ...query);
  if (!result.ok) {
    console.error("Failed to check if email exist", result.problem);
    return null;
  }

  return result;
};

const userExist = async (...query) => {
  const result = await apiClient.get(endpoint + "/userExists", ...query);
  if (!result.ok) {
    console.error("Failed to check if user exist", result.problem);
    return null;
  }

  return result;
};

export default { register, getUser, updateUser, emailExist, userExist };
