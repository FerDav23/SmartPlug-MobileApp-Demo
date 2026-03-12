import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import colors from "../config/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import elementStyles from "../config/elementStyles";
import textFont from "../config/textFont";

export default function InfoDropdown({buttonName, energyConsumption, energySaved }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity style={elementStyles.container} onPress={() => setExpanded(!expanded)}>
        <Text style={[styles.buttonText, textFont.text]}>{buttonName}</Text>
        <AntDesign 
          name={expanded ? "upcircleo" : "downcircleo"} 
          size={24} 
          color="black" 
          style={styles.icon} 
        />
      </TouchableOpacity>

      {/* Dropdown Content */}
      {expanded && (
        <View style={styles.dropdownContent}>
          <Text style={[styles.subtitle, textFont.text]}>
            Total Energy Consumption
          </Text>
          <Text style={[styles.infoText, textFont.text]}>
            {energyConsumption} kWh
          </Text>
          <Text style={[styles.subtitle, textFont.text]}>
            Energy Saved 
          </Text>
          <Text style={[styles.infoText, textFont.text]}>
            {energySaved} kWh
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "90%",
   
  },
  dropdownButton: {
    width: 300,
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 10,
    flexDirection: "row",  // ✅ Row direction for text + icon
    justifyContent: "space-between",  // ✅ Space between text & icon
    alignItems: "center",  // ✅ Centers items vertically
  },
  buttonText: {
    color: colors.black,
  },
  icon: {
    marginLeft: 10, // Ensures spacing between text and icon
  },
  dropdownContent: {
    marginTop: 5, // Ensures spacing between button and dropdown
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  infoText: {
    marginLeft: 5
  },
  subtitle: {
    fontWeight: "700"
  },
});

