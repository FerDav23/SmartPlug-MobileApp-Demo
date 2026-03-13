import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../config/colors";
import elementStyles from "../../config/elementStyles";
import textFont from "../../config/textFont";
import Routes from "../../navigation/Routes";

export default function RoomButton({buttonName, roomId}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={elementStyles.container} 
        onPress={() => navigation.navigate(Routes.roomDetails, { 
          roomId: roomId,
          buttonName: buttonName 
        })}
      >
        <Text style={[styles.buttonText, textFont.text]}>{buttonName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 300,
  },
  buttonText: {
    color: colors.black,
  },
  icon: {
    marginLeft: 10,
  },
  dropdownContent: {
    marginTop: 5,
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

