import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "../auth/storage";
import { jwtDecode } from "jwt-decode"; // Fixed import of jwt-decode
import usersApi from "../api/users";
import useApi from "../hooks/useApi";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const getUserApi = useApi(usersApi.getUser);

  // Log in by setting the user and storing the token
  const logIn = async (authToken) => {
    try {
      const decodedUser = jwtDecode(authToken);
      setUser(decodedUser);
      await authStorage.storeToken(authToken);
      await authStorage.removeDemoLogoutFlag();
      return true; // Indicate successful login
    } catch (error) {
      console.error("Failed to decode auth token:", error);
      return false; // Indicate failed login
    }
  };

  // Log out by removing the token first, then clearing the user
  const logOut = async () => {
    await authStorage.removeToken();
    setUser(null);
  };

  // Refresh user data from the backend (e.g., to get updated points)
  const refreshUserToken = async () => {
    try {
      const response = await getUserApi.request({ userID: user.id }); // API call to fetch user
      if (response.ok) {
        authStorage.storeToken(response.data.token);
      } else {
        console.error("Failed to fetch user data:", response.problem);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const logInReg = async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) console.error("not token founded");
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Failed to decode auth token:", error);
    }
  };

  const getUserReg = async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) console.error("not token founded");
      const decodedUser = jwtDecode(token);
      return decodedUser;
    } catch (error) {
      console.error("Failed to decode auth token:", error);
    }
  };

  return {
    user,
    setUser,
    logOut,
    logIn,
    refreshUserToken,
    logInReg,
    getUserReg,
  };
};

export default useAuth;
