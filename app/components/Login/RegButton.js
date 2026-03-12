import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Text } from "react-native";

import colors from "../../config/colors";
import textFont from "../../config/textFont";

function RegButton({ ...otherProperties }) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => setIsHighlighted(true)} // Wrap in arrow function
      onPressOut={() => setIsHighlighted(false)} // Wrap in arrow function
      {...otherProperties}
    >
      <Text
        style={[
          textFont.font,
          styles.regButton,
          isHighlighted ? styles.regButtonHighlight : styles.regButtonNormal,
        ]}
      >
        Sign Up
      </Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  regButton: {
    marginTop: 5,
    fontWeight: "700",
    fontSize: 16,
    textDecorationLine: "underline", // Apply underline
  },
  regButtonNormal: {
    color: colors.black,
  },
  regButtonHighlight: {
    color: colors.ligthGreen, // Change to highlight color when pressed
  },
});

export default RegButton;