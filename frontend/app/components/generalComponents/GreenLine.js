import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

function GreenLine({ style }) {
  return <View style={[styles.line, style]} />;
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: colors.black,
    width: 300,
    height: 3,
    marginVertical: 20
  },
});

export default GreenLine;
