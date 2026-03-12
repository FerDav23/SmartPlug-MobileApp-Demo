import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";

import gradientColors from "../config/gradientColors";
import icons from "../config/icons";
import colors from "../config/colors";
import textFont from "../config/textFont";
import GreenLine from "../components/generalComponents/GreenLine";
import RegInfInput from "../components/Register/RegInfInput";
import SubRegButton from "../components/Register/SubRegButton";
import { userValidationSchema } from "../components/Register/validationSchema";
import LoadingIndicator from "../components/generalComponents/LoadingIndicator";
import useApi from "../hooks/useApi";
import registerApi from "../api/users";
import useAuth from "../auth/useAuth";
import Routes from "../navigation/Routes";
import storage from "../auth/storage";

function RegScreen({ navigation }) {
  const regApi = useApi(registerApi.register);
  const { logIn } = useAuth();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    () => {
      setKeyboardVisible(true); // Keyboard is open
    }
  );
  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      setKeyboardVisible(false); // Keyboard is closed
    }
  );

  // Add effect to listen for keyboard show/hide events
  useEffect(() => {
    // Clean up listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleRegisterSubmit = async (values) => {

    const response = await regApi.request(values);
    if (!response.ok) {
      // Handle registration error
      console.log("Registration failed", response.problem);
      return;
    }
    if (response.data.success) {
      if (logIn(response.data.token)) {
        navigation.navigate(Routes.home);
      } else {
        console.error("Login failed, navigation aborted.");
      }
    } else {
      alert("The email is already in use. Please use a different email.");
    }

  };

  const onRefresh = () => {
    setRefreshing(true);
    // Add any logic needed to refresh the registration screen
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollViewContent,
        isKeyboardVisible && Platform.OS === "ios" && { paddingBottom: 300 }, // Add extra padding when keyboard is open
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <LoadingIndicator visible={regApi.loading} />

      <Text style={textFont.title}>User Information</Text>
      <GreenLine />

      {/* Formik */}

      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: ""
        }}
        onSubmit={handleRegisterSubmit}
        validationSchema={userValidationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          setFieldTouched,
          touched,
        }) => (
          <>
            <RegInfInput
              onEmailChange={handleChange("email")}
              onPasswordChange={handleChange("password")}
              onConfirmPasswordChange={handleChange("confirmPassword")}
              emailTouched={() => setFieldTouched("email")}
              passwordTouched={() => setFieldTouched("password")}
              confirmPasswordTouched={() => setFieldTouched("confirmPassword")}
              allErrors={errors}
              fieldTouched={touched}
            />
            <SubRegButton onPress={handleSubmit} />
          </>
        )}
      </Formik>
      {/* Formik */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    
  },
  scrollViewContent: {
    alignItems: "center",
    paddingBottom: Platform.OS === "android" ? 100 : 100, // Add some padding to the bottom to ensure all content is scrollable
    height: "100%",
    backgroundColor: colors.backgroundColor
  },
  
});

export default RegScreen;
