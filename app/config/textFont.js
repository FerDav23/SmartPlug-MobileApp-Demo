import { Platform } from "react-native";

export default {
  text: {
    ...Platform.select({
      ios: {
        fontSize: 18,
        fontFamily: "Avenir", // Example of a different font family for iOS
      },
      android: {
        fontSize: 16,
        fontFamily: "Roboto", // Example of a different font family for Android
      },
    }),
  },
  
  // Standardized title style for all screens
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontFamily: "Avenir",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
  }
};
