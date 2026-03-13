import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Platform,
} from "react-native";

import colors from "../../config/colors";
import textFont from "../../config/textFont";

function SubRegButton({...otherProperties }) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => setIsHighlighted(true)} // Wrap in arrow function
      onPressOut={() => setIsHighlighted(false)} // Wrap in arrow function
      {...otherProperties}

    >
      <View
        style={[
          styles.SubRegButton,
          isHighlighted
            ? styles.SubRegButtonHighlight
            : styles.SubRegButtonNormal,
        ]}
      >
        <Text style={[textFont.font, styles.ButtonText]}>Sign Up</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  SubRegButton: {
    top: "10%",
    alignContent: "center",
    justifyContent: "center",
    height: 50,
    width: 200,
    borderRadius: 22,
    elevation: 10,
  },
  SubRegButtonNormal: {
    backgroundColor: colors.black,
  },
  SubRegButtonHighlight: {
    backgroundColor: colors.ligthGreen, // Change to highlight color when pressed
  },
  ButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "500",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default SubRegButton;