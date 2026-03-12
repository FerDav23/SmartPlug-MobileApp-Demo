import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather"; // ✅ Added missing import

import colors from "../config/colors";

import RoomNavigator from "./RoomsNavigator";

import VentilationScreen from "../screens/VentilationScreen";
import RoomScreen from "../screens/RoomScreen";
import SettingsScreen from "../screens/SettingsScreen"; // ✅ Fixed typo

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      // Styling the tab bar container
      tabBarStyle: {
        backgroundColor: colors.white,
        height: Platform.OS === "android" ? 70 : 100, // Increase the height of the tab bar
        paddingBottom: Platform.OS === "android" ? 10 : 35, // Add some padding to center the icons and labels
      },
      // Styling the tab bar icons
      tabBarIconStyle: {
        justifyContent: "center", // Center the icon vertically
        alignItems: "center", // Center the icon horizontally
      },
      // Styling the tab bar label
      tabBarLabelStyle: {
        fontSize: 12, // Font size of the labels
        fontWeight: "bold", // Make the label text bold
      },
      tabBarItemStyle: {
        justifyContent: "center", // Center the item (icon + label) vertically
        alignItems: "center", // Center the item (icon + label) horizontally
      },
      // Setting custom behavior and color for the icons
      tabBarActiveTintColor: colors.white, // Color for the active icon and label
      tabBarInactiveTintColor: colors.black, // Color for the inactive icon and label
      tabBarActiveBackgroundColor: colors.skyblue, // Background color for the active tab
    }}
  >
    <Tab.Screen
      name={"ventilation"}
      component={VentilationScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <FontAwesome5 name="fan" size={size} color={color} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? colors.white : colors.gray }}>
            Ventilation
          </Text>
        ),
      }}
    />
    <Tab.Screen
      name={"room"}
      component={RoomNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="room-preferences" size={size} color={color} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? colors.white : colors.gray }}>
            Rooms
          </Text>
        ),
      }}
    />
    <Tab.Screen
      name={"settings"}
      component={SettingsScreen} // ✅ Fixed typo
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <Feather name="settings" size={size} color={color} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? colors.white : colors.gray }}>
            Settings
          </Text>
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator; // ✅ Removed extra }
