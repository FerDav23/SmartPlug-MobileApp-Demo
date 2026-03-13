import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

import AuthContext from "./app/auth/context";
import authApi from "./app/api/auth";
import useApi from "./app/hooks/useApi";
import authStorage from "./app/auth/storage";
import { isDemoMode } from "./app/config/demoMode";
import { mockAuth } from "./app/api/mock/data";


//SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from hiding automatically

export default function App() {
  
  
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);


  // Initialize animation value
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Function to restore the token and set the user



  const checkToken = async () => {
    try {
      const token = await authStorage.getToken();
      
      if (!token) {
        console.log("App.js - No token found");
        return false;
      }
      
      const result = await authApi.checkToken();
      
      if (result.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("App.js - Error checking token:", error.message);
      return false; // Return false if an error occurs
    }
  };

  const restoreUser = async () => {
    try {
      console.log("App.js - Attempting to restore user...");

      const token = await authStorage.getToken();

      // Demo mode: if no token, either show login (user just logged out) or auto-login
      if (isDemoMode && !token) {
        const demoLoggedOut = await authStorage.getDemoLogoutFlag();
        if (demoLoggedOut) {
          await authStorage.removeDemoLogoutFlag();
          setUser(null);
          return;
        }
        await authStorage.storeToken(mockAuth.login.token);
        const demoUser = await authStorage.getUser();
        if (demoUser) {
          setUser(demoUser);
          return;
        }
      }

      // First check if the token is valid
      const validToken = await checkToken();

      if (!validToken) {
        await authStorage.removeToken();
        setUser(null);
        return;
      }

      const currentUser = await authStorage.getUser();

      if (!currentUser) {
        console.log("App.js - Could not get user from token");
        return;
      }

      console.log("App.js - User restored successfully");
      setUser(currentUser);
    } catch (error) {
      console.warn("App.js - Error restoring user:", error);
      setUser(null);
    }
  };


  // Prepare the application (e.g., prevent splash screen auto-hide and restore the token)
  
  const prepareApp = async () => {
    try {
      await restoreUser();
    } catch (error) {
      console.warn("Error during app preparation:", error);
    } finally {
      setIsReady(true);
    }
  };
  

  useEffect(() => {
    prepareApp();
  }, []);

  const handleNavigationReady = async () => {
    if (isReady) {
      try {
        // Hide the splash screen
        await SplashScreen.hideAsync();

        // Start the fade-in animation once the splash screen is hidden
        Animated.spring(fadeAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.warn("Error hiding splash screen:", error);
      }
    }
  };

  if (!isReady) return null; // Wait until `isReady` is true to render the app

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer onReady={handleNavigationReady}>
        <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
          {user ? <AppNavigator key="app" /> : <AuthNavigator key="auth" />}
        </Animated.View>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
