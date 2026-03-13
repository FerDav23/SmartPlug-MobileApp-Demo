import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoomDetailsScreen from "../screens/RoomDetailsScreen";
import RoomScreen from "../screens/RoomScreen";
import Routes from "./Routes";
import SmartPlugSettings from '../screens/SmartPlugSettings';

const Stack = createNativeStackNavigator();

const RoomNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={"rooms page"}
      component={RoomScreen}
      options={{ headerShown: false, animation: "slide_from_left" }}
    />
    <Stack.Screen
      name={Routes.roomDetails}
      component={RoomDetailsScreen}
      options={({ route }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        animation: "slide_from_right",
        title: route.params?.buttonName || "Room Details"
      })}
    />
    <Stack.Screen
      name={Routes.smartPlugSettings}
      component={SmartPlugSettings}
      options={{
        headerShown: true,
        headerTitleAlign: 'center',
        animation: "slide_from_right"
      }}
    />
  </Stack.Navigator>
);

export default RoomNavigator;
