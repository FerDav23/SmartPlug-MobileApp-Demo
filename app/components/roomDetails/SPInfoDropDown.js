import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";

// Fixed width so the component never grows when expanded (matches parent infoContainer)
const CONTAINER_WIDTH = Math.min(Dimensions.get("window").width - 34, 400);
import AntDesign from "@expo/vector-icons/AntDesign";
import elementStyles from "../../config/elementStyles";
import textFont from "../../config/textFont";
import useApi from "../../hooks/useApi";
import smartPlugsApi from "../../api/smartPlugs";
import BarChartCK, { generateChartData } from "../generalComponents/BarChartCK";
import { useNavigation } from '@react-navigation/native';
import Routes from "../../navigation/Routes";

export default function SPInfoDropdown({ smartPlugName, smartPlugId, energyConsumption, energySaved, status}) {
  const [expanded, setExpanded] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [totalConsumption, setTotalConsumption] = useState("0.00");
  const [active, setActive] = useState(false);

  const getHourlyEnergyConsumptionApi = useApi(smartPlugsApi.getHourlyEnergyConsumption);
  const toggleSmartPlugApi = useApi(smartPlugsApi.toggleSmartPlug);
  const navigation = useNavigation();


  const toggleSmartPlug = async () => {
    try {
      const result = await toggleSmartPlugApi.request({plugID: smartPlugId});
      //console.log(result);
      setActive(!active);
    } catch (error) {
      console.error("Failed to toggle smart plug:", error);
    }
  };
    
  const loadChartData = async () => {
    try {
      const result = await getHourlyEnergyConsumptionApi.request({plugID: smartPlugId});
      const { chartData: newData, totalConsumption } = generateChartData(result.data);
      
      // Format data for the BarChart component
      const formattedData = {
        labels: newData.map(item => item.dateHour),
        datasets: [{
          data: newData.map(item => item.value)
        }]
      };
      
      setChartData(formattedData);
      setTotalConsumption(totalConsumption);
    } catch (error) {
      console.error("Failed to load chart data:", error);
    }
  }

  useEffect(() => {
    setActive(status);
  }, []);

  useEffect(() => {
    if (expanded) {
      loadChartData();
    }
  }, [expanded]);


  return (
    <View style={[styles.container, { width: CONTAINER_WIDTH }]}>
      {/* Dropdown Button */}
      <TouchableOpacity style={[elementStyles.container, { width: CONTAINER_WIDTH }]} onPress={() => setExpanded(!expanded)}>
        <View style={styles.nameContainer}>
          <Text style={[styles.buttonText, textFont.text]}>{smartPlugName}</Text>
          <View style={[styles.statusDot, active ? styles.activeDot : styles.inactiveDot]} />
        </View>
        <AntDesign 
          name={expanded ? "upcircleo" : "downcircleo"} 
          size={24} 
          color="black" 
          style={styles.icon} 
        />
      </TouchableOpacity>

      {/* Dropdown Content */}
      {expanded && (
        <View style={[styles.dropdownContent, { width: CONTAINER_WIDTH }]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.chartTitle, textFont.text]}>Hourly Energy Consumption</Text>
            <View style={styles.titleUnderline} />
          </View>
          <View style={styles.chartWrapper}>
            <BarChartCK chartData={chartData} xLabel="" yLabel="" />
          </View>

          <Text style={[textFont.text, styles.titleText ]}>Total Energy Consumption</Text>
          <Text style={[textFont.text, styles.infoText ]}>
            {totalConsumption} Watts
          </Text>
          <View style={styles.mainButtonContainer}>
          <TouchableOpacity 
            onPress={toggleSmartPlug}
            style={[styles.buttonContainer, active ? styles.powerButtonActive : styles.powerButtonInactive]}
          >
            <Text style={[textFont.text, { color: colors.white, fontWeight: '600' }]}>
              {active ? "Turn Off" : "Turn On"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate(Routes.smartPlugSettings, { smartPlugId, currentLabel: smartPlugName })}
            style={[styles.buttonContainer, styles.settingsButton]}
          >
            <Text style={[textFont.text, { color: colors.white, fontWeight: '600' }]}>
              Settings
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "hidden",
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 7,
    marginLeft: 8,
  },
  activeDot: {
    backgroundColor: '#02AD11', // Green when active
  },
  inactiveDot: {
    backgroundColor: '#C0C0C0', // Light grey when inactive
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    marginLeft: 10,
  },
  chartWrapper: {
    width: "100%",
    overflow: "hidden",
  },
  dropdownContent: {
    marginBottom: 12,
    overflow: "hidden",
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "900",
    marginTop: 16,
    paddingBottom: 4,
    borderBottomColor: colors.lightGray,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "600",
    textAlign: "center",
  },
  titleUnderline: {
    width: "95%",
    height: 3,
    backgroundColor: colors.skyblueBar,
    marginTop: 8,
    borderRadius: 1.5,
  },
  energyConsumptionTitle: {
    fontSize: 17,
    color: colors.black,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 14,
    paddingLeft: 10,
    paddingBottom: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.skyblue,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginVertical: 15,
    width: 220,
  },
  powerButtonActive: {
    backgroundColor: '#02AD11',
  },
  powerButtonInactive: {
    backgroundColor: '#C0C0C0',
  },

  mainButtonContainer: {
    width: '100%',
    alignItems: 'center',
    //flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  settingsButton: {
    marginVertical: 0,
    backgroundColor: colors.black,
  }
});

