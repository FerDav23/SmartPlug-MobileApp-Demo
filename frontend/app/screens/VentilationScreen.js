import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Platform,
  RefreshControl
} from "react-native";

import colors from "../config/colors";
import textFont from "../config/textFont";
import LoadingIndicator from "../components/generalComponents/LoadingIndicator";
import InfoDropdown from "../components/InfoDropdown";

function VentilationScreen({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Add any logic needed to refresh the ventilation screen
        setRefreshing(false);
    };

    return (
        <ScrollView 
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <LoadingIndicator visible={false} />
            
            {/* Section with Title and Image */}
            <View style={styles.secondaryContainer}>
                <Text style={textFont.title}>Ventilation system</Text>
                <Image 
                    source={require("../assets/energyConsumption2.png")}
                    style={styles.graph}
                    resizeMode="contain"
                />
                <InfoDropdown buttonName={"Living Room"} energyConsumption={"58.3"} energySaved={"23.6"}/>
                <InfoDropdown buttonName={"Bedroom"} energyConsumption={"48.9"} energySaved={"13.6"}/>
                <InfoDropdown buttonName={"Kitchen"} energyConsumption={"88.7"} energySaved={"30.1"}/>

                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 100,
    backgroundColor: colors.backgroundColor,
  },

  secondaryContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:Platform.OS === "ios" ? 60 : 40,
     // Added space below title/image to avoid crowding
  },

  graph: {
    marginVertical: 15,
    width: 270,
    height: 250,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
    borderRadius: 20,
  },

  infoContainer: {
    width: "90%", // Prevents stretching on wide screens
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VentilationScreen;
