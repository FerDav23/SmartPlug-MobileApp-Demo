import apiClient from "./client";
import { isDemoMode } from "../config/demoMode";
import {
  getMockSmartPlugs,
  getMockEnergyDayForRoom,
  getMockEnergyWeekForRoom,
  getMockHourlyForPlug,
  mockToggleResponse,
  mockAddSmartPlugResponse,
  mockUpdateSmartPlugResponse,
  mockDeleteSmartPlugResponse,
} from "./mock/data";

const endpoint = "/smartPlugs";

const getSmartPlugsReal = async (...query) => {
  const result = await apiClient.get(endpoint + "/getSmartPlugs", ...query);
  return result;
};

const getEnergyConsumptionDayReal = async (...query) => {
  const result = await apiClient.get(endpoint + "/getEnergyConsumptionDay", ...query);
  return result;
};

const getEnergyConsumptionWeekReal = async (...query) => {
  const result = await apiClient.get(endpoint + "/getEnergyConsumptionWeek", ...query);
  return result;
};

const getHourlyEnergyConsumptionReal = async (...query) => {
  console.log("in hourly consumption");
  const result = await apiClient.get(endpoint + "/getHourlyEnergyConsumption", ...query);
  return result;
};

const toggleSmartPlugReal = async (...body) => {
  console.log("in toggle smart plug");
  const result = await apiClient.post(endpoint + "/toggleSwitch", ...body);
  return result;
};

const addSmartPlugReal = async (...body) => {
  console.log("in add smart plug");
  const result = await apiClient.post(endpoint + "/addSmartPlug", ...body);
  return result;
};

const updateSmartPlugReal = async (...body) => {
  const result = await apiClient.post(endpoint + "/updateSmartPlugName", ...body);
  return result;
};

const deleteSmartPlugReal = async (...body) => {
  console.log("in delete smart plug");
  const result = await apiClient.post(endpoint + "/deleteSmartPlug", ...body);
  return result;
};

// Mock implementations: extract params from first arg (object)
const getSmartPlugsMock = async (params = {}) => {
  const roomId = params.roomId;
  const smartPlugs = getMockSmartPlugs(roomId);
  return { ok: true, status: 200, data: { smartPlugs } };
};

const getEnergyConsumptionDayMock = async (params = {}) => {
  const energyConsumption = getMockEnergyDayForRoom(params.roomId);
  return { ok: true, status: 200, data: { energyConsumption } };
};

const getEnergyConsumptionWeekMock = async (params = {}) => {
  const energyConsumption = getMockEnergyWeekForRoom(params.roomId);
  return { ok: true, status: 200, data: { energyConsumption } };
};

const getHourlyEnergyConsumptionMock = async (params = {}) => {
  const data = getMockHourlyForPlug(params.plugID);
  return { ok: true, status: 200, data };
};

const toggleSmartPlugMock = async () => {
  return { ok: true, status: 200, data: mockToggleResponse };
};

const addSmartPlugMock = async () => {
  return { ok: true, status: 200, data: mockAddSmartPlugResponse };
};

const updateSmartPlugMock = async () => {
  return { ok: true, status: 200, data: mockUpdateSmartPlugResponse };
};

const deleteSmartPlugMock = async () => {
  return { ok: true, status: 200, data: mockDeleteSmartPlugResponse };
};

const getSmartPlugs = isDemoMode ? getSmartPlugsMock : getSmartPlugsReal;
const getEnergyConsumptionDay = isDemoMode ? getEnergyConsumptionDayMock : getEnergyConsumptionDayReal;
const getEnergyConsumptionWeek = isDemoMode ? getEnergyConsumptionWeekMock : getEnergyConsumptionWeekReal;
const getHourlyEnergyConsumption = isDemoMode ? getHourlyEnergyConsumptionMock : getHourlyEnergyConsumptionReal;
const toggleSmartPlug = isDemoMode ? toggleSmartPlugMock : toggleSmartPlugReal;
const addSmartPlug = isDemoMode ? addSmartPlugMock : addSmartPlugReal;
const updateSmartPlug = isDemoMode ? updateSmartPlugMock : updateSmartPlugReal;
const deleteSmartPlug = isDemoMode ? deleteSmartPlugMock : deleteSmartPlugReal;

export default {
  getSmartPlugs,
  getEnergyConsumptionDay,
  getEnergyConsumptionWeek,
  getHourlyEnergyConsumption,
  toggleSmartPlug,
  addSmartPlug,
  updateSmartPlug,
  deleteSmartPlug,
};
