import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function LoadingIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <LottieView
        autoPlay
        loop
        style={styles.container}
        source={require("../../assets/animations/loader.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  container: {
    width: "100%", // Adjust size if needed
    height: "120%",
    backgroundColor: "rgba(64, 64, 64, 0.5)",
    marginBottom: 100, // Moves the animation 50 pixels up
  },
});

export default LoadingIndicator;
