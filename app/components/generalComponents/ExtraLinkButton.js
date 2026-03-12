import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Platform,
} from "react-native";
import textFont from "../../config/textFont";
import colors from "../../config/colors";

function ExtraLinkButton({ text, moreStyles, ...otherProperties }) {
  const [isHighlighted, setIsHighlighted] = useState(false); // Moved inside the component

  return (
    <TouchableWithoutFeedback
      onPressIn={() => setIsHighlighted(true)} // Arrow function
      onPressOut={() => setIsHighlighted(false)} // Arrow function
      {...otherProperties}
    >
      <Text
        style={[
          textFont.font,
          styles.text,
          isHighlighted ? styles.hilight : null,
          moreStyles,
        ]}
      >
        {text}
      </Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  hilight: {
    color: colors.ligthGreen,
  },
  text: {
    marginTop: 10,
    fontSize: Platform.OS === "android" ? 13 : 14,
    textDecorationLine: "underline", // Apply underline
  },
});

export default ExtraLinkButton;
