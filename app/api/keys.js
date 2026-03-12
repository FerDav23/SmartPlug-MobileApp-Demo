import apiClient from "./client";

// Return the result of the apiClient.post request
const endpoint = "/keys";

const getKeys = async () => {
  const result = await apiClient.get(endpoint);
  if (!result.ok) {
    console.error("Failed to get keys", result.problem);
    return null;
  }
  return result;
};

export default {
  getKeys,
};
