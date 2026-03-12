import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import textFont from "../../config/textFont";
import colors from "../../config/colors";

function TestButton({ activated, buttonName, ...otherProperties }) {
  const [isHighlighted, setIsHighlighted] = useState(false); // Moved inside the component

  return (
    <TouchableWithoutFeedback
      onPressIn={() => setIsHighlighted(true)} // Arrow function
      onPressOut={() => setIsHighlighted(false)} // Arrow function
      {...otherProperties}
    >
      <View
        style={[
          styles.container,
          isHighlighted ? styles.highlight : styles.normal,
          !activated ? styles.inactive : null,
        ]}
      >
        <Text style={[textFont.font, styles.text]}>{buttonName}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 45, // Removed duplicate height definition
    borderRadius: 15,
  },
  normal: {
    backgroundColor: colors.darkGreen,
  },
  inactive: {
    backgroundColor: colors.grey,
  },
  highlight: {
    backgroundColor: colors.ligthGreen, // Fixed typo
  },
  text: {
    color: colors.white,
    fontSize: 14,
  },
});

export default TestButton;
