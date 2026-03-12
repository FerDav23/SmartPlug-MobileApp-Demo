import { create } from "apisauce";
import authStorage from "../auth/storage";

// Create an API client
const apiClient = create({
  //baseURL: "http://backend.grupofj-pointsapp-apis.xyz:5000/api", // Base URL pointing to your backend
  baseURL: "http://192.168.1.128:5000/api"
});

apiClient.addAsyncRequestTransform(async (request) => {
  try {
    const authToken = await authStorage.getToken();

    if (!authToken) {
      return;
    }
    
    request.headers["Authorization"] = `Bearer ${authToken}`;
  } catch (error) {
    console.error("API Client - Error adding auth token to request:", error);
  }
});

// Monitor responses for debugging

apiClient.addMonitor((response) => {
  const { config, ok, problem } = response;
  const method = config?.method?.toUpperCase() || 'UNKNOWN';
  const url = config?.url || 'UNKNOWN';
  
  if (!ok) {
    console.log(`API Client - [${method}] ${url} failed: ${problem}`);
  } else {
    console.log(`API Client - [${method}] ${url} succeeded`);
  }
});

export default apiClient;
