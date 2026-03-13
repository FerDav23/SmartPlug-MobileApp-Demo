import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegScreen from "../screens/RegScreen";
import AppNavigator from "./AppNavigator"
import routes from "./Routes";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.login}
      component={LoginScreen}
      options={{ headerShown: false, animation: "slide_from_left" }}
    />
    
    <Stack.Screen
      name={routes.signup}
      component={RegScreen}
      options={{ headerShown: true, animation: "slide_from_right" }}
    /> 

<Stack.Screen
      name={routes.home}
      component={AppNavigator}
      options={{ headerShown: false, animation: "slide_from_right" }}
    /> 
    

  </Stack.Navigator>
);

export default AuthNavigator;
