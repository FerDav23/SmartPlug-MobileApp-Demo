import React from "react";
import { View, StyleSheet, Text } from "react-native";
import textFont from "../../config/textFont";
import colors from "../../config/colors";

function ErrorMessage({ errorMessage, visible, extraStyling }) {
  if (!visible || !errorMessage) return null;
  return (
    <Text style={[textFont.font, styles.errorText, extraStyling]}>
      {errorMessage}
    </Text>
  );
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: 2,
    marginLeft: 10,
    alignSelf: "flex-start",
    fontSize: 14,
    color: colors.redDanger,
  },
});

export default ErrorMessage;
