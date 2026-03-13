import React from "react";
import { View, StyleSheet, Text } from "react-native";

function NoUserBlock(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Porfavor inicie sesion para poder acceder a las funciones de esta pagina
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    bottom: 50,
    fontSize: 18,
    textAlign: "center",
  },
});

export default NoUserBlock;
