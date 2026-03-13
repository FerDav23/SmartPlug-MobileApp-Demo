import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import textFont from "../../config/textFont";
import ErrorMessage from "../generalComponents/ErrorMessage";

function RegInfInput({
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  emailTouched,
  passwordTouched,
  confirmPasswordTouched,

  allErrors,
  fieldTouched,
  ...otherProperties
}) {
  return (
    <>

<View style={[styles.Input, {marginTop:0}]}>
        <TextInput
          style={[textFont.font, styles.text]}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={onEmailChange}
          onBlur={emailTouched}
        />
      </View>
      <ErrorMessage
        errorMessage={allErrors.email}
        visible={fieldTouched.email}
        extraStyling={{ marginLeft: 40, width: "80%", flexWrap: "wrap" }}
      />

      <View style={[styles.Input]}>
        <TextInput
          style={[textFont.font, styles.text]}
          placeholder="Password"
          autoCorrect={false}
          onChangeText={onPasswordChange}
          textContentType="password"
          onBlur={passwordTouched}
        />
      </View>
      <ErrorMessage
        errorMessage={allErrors.password}
        visible={fieldTouched.password}
        extraStyling={{ marginLeft: 40, width: "80%", flexWrap: "wrap" }}
      />

      <View style={[styles.Input]}>
        <TextInput
          style={[textFont.font, styles.text]}
          placeholder="Confirm Password"
          autoCorrect={false}
          onChangeText={onConfirmPasswordChange}
          onBlur={confirmPasswordTouched}
        />
      </View>
      <ErrorMessage
        errorMessage={allErrors.confirmPassword}
        visible={fieldTouched.confirmPassword}
        extraStyling={{ marginLeft: 40, width: "80%", flexWrap: "wrap" }}
      />

      
    </>
  );
}

const styles = StyleSheet.create({
  Input: {
    justifyContent: "center",
    paddingHorizontal: 18,
    width: "85%",
    height: 43,
    borderRadius: 20,
    backgroundColor: "#fff",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 10,
    marginTop: 15,
    top: 5,
  },

  text: {
    fontSize: 15,
  },
});

export default RegInfInput;