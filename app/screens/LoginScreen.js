import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import LoginButton from "../components/login/LoginButton";
import LoginInput from "../components/login/LoginInput";
import RegButton from "../components/login/RegButton";
import Routes from "../navigation/Routes";
import colors from "../config/colors";
import ErrorMessage from "../components/generalComponents/ErrorMessage";
import LoadingIndicator from "../components/generalComponents/LoadingIndicator";
import GreenLine from "../components/generalComponents/GreenLine";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";

// Get screen dimensions
const { height, width } = Dimensions.get("window");

// Validation schema
const validationSchema = Yup.object().shape({
  user: Yup.string().required("Please, insert your email").email("Please insert a valid email"),
  password: Yup.string()
    .required("Please, insert your password"),
});

// Function that returns true after 2 seconds


function LoginScreen({ navigation }) {
    //const [screenLoading, setScreenLoading] = useState(false);
    const loginApi = useApi(authApi.login);
    const auth = useAuth(); // Call the useAuth hook to get the auth object

    const handleLogin = async (values) => {
      console.log("in login");
        const result = await loginApi.request({email: values.user, password: values.password});
       // console.log(result.data);
        if (!result.data.status) {
          alert(result.data.message);
        } else {
          await auth.logIn(result.data.token);

        }
    }
    useEffect(() => {
        
    }, []);

  return (
    <View style={styles.container}>
      <LoadingIndicator visible={loginApi.loading} />

      {/* Foreground Content */}
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.contentContainer}>
          <Image
            source={require("../assets/SmartHomeLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.secondContainer}>
              <Formik
                initialValues={{ user: "", password: "" }}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
              >
                {({
                  handleChange,
                  handleSubmit,
                  errors,
                  setFieldTouched,
                  touched,
                }) => (
                  <>
                    <LoginInput
                      onUserChange={handleChange("user")}
                      onPasswordChange={handleChange("password")}
                      allErrors={errors}
                      userTouched={() => setFieldTouched("user")}
                      passwordTouched={() => setFieldTouched("password")}
                      fieldTouched={touched}
                    />

                    <RegButton
                      onPress={() => navigation.navigate(Routes.signup)}
                    />

                    <GreenLine />

                    <LoginButton onPress={handleSubmit} />
                  </>
                )}
              </Formik>

            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      justifyContent: "center",  // Centers everything vertically
      alignItems: "center",       // Centers everything horizontally
    },
    formContainer: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      bottom: 40
    },
    logo: {
      width: 250,
      height: 100,
      marginBottom: 20, // Adds space below the logo
    },
    scrollContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    secondContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,  // Reduced spacing for better centering
    
    },
  });
  

export default LoginScreen;
