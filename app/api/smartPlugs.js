import apiClient from "./client";

const endpoint = "/smartPlugs";

const getSmartPlugs = async (...query) => {
  const result = await apiClient.get(endpoint + "/getSmartPlugs", ...query);
  return result;
};

const getEnergyConsumptionDay = async (...query) => {
  const result = await apiClient.get(endpoint + "/getEnergyConsumptionDay", ...query);
  return result;
};

const getEnergyConsumptionWeek = async (...query) => {
  const result = await apiClient.get(endpoint + "/getEnergyConsumptionWeek", ...query);
  return result;
};

const getHourlyEnergyConsumption = async (...query) => {
  console.log("in hourly consumption");
  const result = await apiClient.get(endpoint + "/getHourlyEnergyConsumption", ...query);
  return result;
};

const toggleSmartPlug = async (...body) => {
  console.log("in toggle smart plug");
  const result = await apiClient.post(endpoint + "/toggleSwitch", ...body);
  return result;
};

const addSmartPlug = async (...body) => {
  console.log("in add smart plug");
  const result = await apiClient.post(endpoint + "/addSmartPlug", ...body);
  return result;
};

const updateSmartPlug = async (...body) => {
  const result = await apiClient.post(endpoint + "/updateSmartPlugName", ...body);
  return result;
};

const deleteSmartPlug = async (...body) => {
  console.log("in delete smart plug");
  const result = await apiClient.post(endpoint + "/deleteSmartPlug", ...body);
  return result;
};

export default { 
  getSmartPlugs, 
  getEnergyConsumptionDay, 
  getEnergyConsumptionWeek, 
  getHourlyEnergyConsumption, 
  toggleSmartPlug,
  addSmartPlug,
  updateSmartPlug,
  deleteSmartPlug
};
