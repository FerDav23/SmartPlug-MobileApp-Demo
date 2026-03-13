import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import textFont from "../../config/textFont";
import icons from "../../config/icons";
import ErrorMessage from "../generalComponents/ErrorMessage";

function LoginInput({
  onUserChange,
  onPasswordChange,
  allErrors,
  userTouched,
  passwordTouched,
  fieldTouched,
  ...otherProperties
}) {
  return (
    <>
      <View style={[styles.loginInput, styles.loginInputUser]}>
        <TextInput
          style={[textFont.font, styles.input]}
          placeholder="Username"
          onChangeText={onUserChange}
          textContentType="user"
          onBlur={userTouched}
        />

        {icons.signIn}
      </View>
      <ErrorMessage
        errorMessage={allErrors.user}
        visible={fieldTouched.user}
        extraStyling={{ marginLeft: 40 }}
      />
      <View style={[styles.loginInput, styles.loginInputPassword]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={[textFont.font, styles.input]}
          placeholder="Password"
          onChangeText={onPasswordChange}
          textContentType="password"
          onBlur={passwordTouched}
        />

        {icons.showPassword}
      </View>
      <ErrorMessage
        errorMessage={allErrors.password}
        visible={fieldTouched.password}
        extraStyling={{ marginLeft: 40 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loginInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    width: "85%",
    height: 45,
    borderRadius: 20,
    backgroundColor: "#fff",
    // Shadow for iOS
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 2 }, // Offset for the shadow
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blur radius of the shadow
    // Shadow for Android
    elevation: 10, // Elevation for shadow effect
  },
  input: {
    fontSize: 16,
    width: "80%",
  },

  loginInputUser: {},
  loginInputPassword: {
    marginTop: 10,
    marginBottom: 15
    
  },
});

export default LoginInput;