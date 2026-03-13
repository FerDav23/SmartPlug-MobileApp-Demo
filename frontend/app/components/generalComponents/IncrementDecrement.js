import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import textFont from "../../config/textFont";
import icons from "../../config/icons";

const IncrementDecrement = ({
  unit,
  value,
  setValue,
  changeQuantity = () => {},
}) => {
  const increment = () => {
    const newValue = value + unit;
    setValue(newValue);
    changeQuantity(newValue);
  };

  const decrement = () => {
    const newValue = value - unit >= 0 ? value - unit : 0;
    setValue(newValue);
    changeQuantity(newValue);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement}>
        <View style={styles.deButton}>
          {value === unit ? (
            <View style={styles.iconContainer}>{icons.trashcan}</View>
          ) : (
            <Text style={[textFont.font, styles.buttonText]}>-</Text>
          )}
        </View>
      </TouchableOpacity>

      <Text style={[textFont.font, styles.valueText]}>{value}</Text>

      <TouchableOpacity onPress={increment}>
        <View style={styles.inButton}>
          <Text style={[textFont.font, styles.buttonText]}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 30,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between", // Spread elements horizontally
    alignItems: "center", // Vertically center items
    marginTop: 10,
    marginLeft: 5,
  },
  valueText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  deButton: {
    alignItems: "center",
    height: 30,
    width: 20,
    backgroundColor: colors.grey,
  },
  inButton: {
    alignItems: "center",
    height: 30,
    width: 20,
    backgroundColor: colors.grey,
  },
  buttonText: {
    fontSize: 20,
  },
  iconContainer: {
    marginTop: 4,
  },
});

export default IncrementDecrement;
