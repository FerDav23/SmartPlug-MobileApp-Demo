import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    if (!authToken) {
      console.error("Attempted to store null or undefined token");
      return false;
    }
    await SecureStore.setItemAsync(key, authToken);
    console.log("Token stored successfully");
    return true;
  } catch (error) {
    console.error("Error storing the auth token", error);
    return false;
  }
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(key);
    return token;
  } catch (error) {
    console.error("Error getting the auth token", error);
    return null;
  }
};

const getUser = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    
    // Decode the token to get user info
    const decodedUser = jwtDecode(token);
    return decodedUser;
  } catch (error) {
    console.error("Error decoding token to get user", error);
    return null;
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (error) {
    console.error("Error removing the auth token", error);
    return false;
  }
};

export default { getUser, removeToken, storeToken, getToken };
