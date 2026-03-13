import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  SafeAreaView,
  Text,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Linking
} from "react-native";

import colors from "../config/colors";
import textFont from "../config/textFont";
import LoadingIndicator from "../components/generalComponents/LoadingIndicator";
import smartPlugsApi from "../api/smartPlugs";
import useApi from "../hooks/useApi";
import SPInfoDropdown from "../components/roomDetails/SPInfoDropDown";
import PieChartCK, { generateChartData } from "../components/generalComponents/PieChartCK";
import QRScanner from "../components/roomDetails/QRScanner";
import NewSPComponent from "../components/roomDetails/NewSPComponent";
import { useCameraPermissions } from 'expo-camera';

function RoomDetailsScreen({ navigation, route }) {
  const [isDaily, setIsDaily] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [isNewSPVisible, setIsNewSPVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const { roomId, buttonName } = route.params;
  
  const getSmartPlugsApi = useApi(smartPlugsApi.getSmartPlugs);
  const getEnergyConsumptionDayApi = useApi(smartPlugsApi.getEnergyConsumptionDay); 
  const getEnergyConsumptionWeekApi = useApi(smartPlugsApi.getEnergyConsumptionWeek);
  const addSmartPlugApi = useApi(smartPlugsApi.addSmartPlug);
  
  const [smartPlugs, setSmartPlugs] = useState([]);
  const [energyConsumptionDay, setEnergyConsumptionDay] = useState([]);
  const [energyConsumptionWeek, setEnergyConsumptionWeek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  
  const loadSmartPlugs = async () => {
    const response = await getSmartPlugsApi.request({ roomId });
    setSmartPlugs(response.data.smartPlugs);
  };

  const loadEnergyConsumptionDay = async () => {
    const response = await getEnergyConsumptionDayApi.request({ roomId });
    setEnergyConsumptionDay(response.data.energyConsumption);
  };

  const loadEnergyConsumptionWeek = async () => {
    const response = await getEnergyConsumptionWeekApi.request({ roomId });
    setEnergyConsumptionWeek(response.data.energyConsumption);
    //setLoading(false);
  };

  const toggleTimeframe = () => {
    setIsDaily(!isDaily);
  };

const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        loadSmartPlugs(),
        loadEnergyConsumptionDay(),
        loadEnergyConsumptionWeek()
      ]);
      setLoading(false);
    };

  useEffect(() => {
    
    
    loadAllData();
  }, []);

  // Update chart when data or timeframe changes
  useEffect(() => {
    if (smartPlugs.length > 0 && 
        ((isDaily && energyConsumptionDay.length > 0) || 
        (!isDaily && energyConsumptionWeek.length > 0))) {
      const consumptionData = isDaily ? energyConsumptionDay : energyConsumptionWeek;
      const { chartData: newChartData, totalConsumption: newTotalConsumption } = 
        generateChartData(smartPlugs, consumptionData, isDaily);
      setChartData(newChartData);
      setTotalConsumption(newTotalConsumption);
    }else{
      console.log("No data");
      setChartData([]);
      setTotalConsumption(0);
    }
  }, [smartPlugs, energyConsumptionDay, energyConsumptionWeek, isDaily]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAllData();
    setRefreshing(false);
  };

  const handleScan = (data) => {
    console.log('Scanned QR Code:', data);
    setScannedData(data);
    setIsScannerVisible(false);
    setIsNewSPVisible(true);
  };

  const handleSaveNewSP = async (data) => {
    console.log('Saving new smart plug:', data);
    try {
      const response = await addSmartPlugApi.request(data);
      console.log('Response:', response.data.message);
      
      await loadSmartPlugs();
      
      // Show success message
      if (response.data.smStatus === 1) {
      Alert.alert(
        "Success",
        response.data.message,
        [{ text: "OK" }]
      );}
      else if(response.data.smStatus === 0){
        Alert.alert(
          "Error",
          response.data.message,
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error('Error registering smart plug:', error);
      Alert.alert(
        "Error",
        "Failed to add smart plug. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const openSettings = () => {
    Alert.alert(
      "Camera Permission Required",
      "Please enable camera access in your device settings to scan QR codes.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Open Settings", 
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          }
        }
      ]
    );
  };

  const handleQRScan = async () => {
    console.log('Current permission status:', permission.status);
    if (permission.status === 'granted') {
      setIsScannerVisible(true);
    } else {
      console.log('Requesting camera permission...');
      const result = await requestPermission();
      console.log('Permission request result:', result);
      
      if (result.granted) {
        setIsScannerVisible(true);
      } else if (!result.canAskAgain) {
        openSettings();
      }
    }
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      > 
        <LoadingIndicator visible={loading} />
        
        {/* Room name header */}
        
        {/* Section with the graph */}
        <View style={styles.secondaryContainer}>
          {/* Energy Consumption Chart */}
          <PieChartCK
            isDaily={isDaily}
            onToggleTimeframe={toggleTimeframe}
            chartData={chartData}
            totalConsumption={totalConsumption}
            title={`${buttonName} - ${isDaily ? "Daily" : "Weekly"} Energy Consumption`}
          />

          {/* Smart Plugs Section */}
          <Text style={styles.sectionTitle}>Smart Plugs</Text>
          <View style={styles.infoContainer}>
            {smartPlugs.map((plug) => {
              // Find matching energy consumption for this plug
   
              
              return (
                <SPInfoDropdown
                  key={plug.plug_id}
                  smartPlugName={plug.device_label}
                  smartPlugId={plug.plug_id}
                  energyConsumption="0.00"
                  energySaved="0.00" // Replace with actual savings data when available
                  status={plug.status}
                />
              );
            })}
          </View>
        </View>
        <TouchableOpacity 
            onPress={handleQRScan}
            style={[styles.buttonContainer, styles.settingsButton]}
          >
            <Text style={[textFont.text, { color: colors.white, fontWeight: '600' }]}>
              Add Smart Plug
            </Text>
          </TouchableOpacity>

        <QRScanner
          visible={isScannerVisible}
          onClose={() => setIsScannerVisible(false)}
          onScan={handleScan}
        />

        <NewSPComponent
          roomId={roomId}
          visible={isNewSPVisible}
          onClose={() => setIsNewSPVisible(false)}
          onSave={handleSaveNewSP}
          scannedData={scannedData}
        />
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  scrollView: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    backgroundColor: colors.backgroundColor,
  },
  roomHeader: {
    ...textFont.font,
    fontSize: 22,
    fontWeight: "700",
    color: colors.title,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  secondaryContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 5,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    ...textFont.font,
    fontSize: 18,
    fontWeight: "700",
    color: colors.title,
    alignSelf: "flex-start",
    marginLeft: 5,
    marginBottom: 12,
  },
  infoContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
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
    backgroundColor: colors.black,

  },

});

export default RoomDetailsScreen;
