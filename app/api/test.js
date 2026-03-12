
import apiClient from "./client";

// Return the result of the apiClient.post request
const endpoint = "/mqttTest";


const getCount = async () => {
  console.log("in get count");
  const result = await apiClient.get(endpoint + "/getCount");
  if (!result.ok) {
    console.error("Failed to get count", result.problem);
    return null;
  }

  return result;
};

const resetCount = async () => {
  const result = await apiClient.post(endpoint + "/resetCount");
  if (!result.ok) {
    console.error("Failed to reset count", result.problem);
    return null;
  }

  return result;
};

export default {
  
  getCount,
  resetCount
};
