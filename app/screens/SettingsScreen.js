import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  RefreshControl
} from "react-native";

import LoadingIndicator from "../components/generalComponents/LoadingIndicator";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import icons from "../config/icons";
import colors from "../config/colors";
import textFont from "../config/textFont";
import elementStyles from "../config/elementStyles";

function SettignsScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { logOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => logOut() }
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Add any logic needed to refresh the settings screen
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
      <View style={styles.container}>
        <Text style={textFont.title}>Settings</Text>
        
        <View style={elementStyles.container}>
          <View style={styles.settingInfo}>
            {icons.darkMode}
            <Text style={[textFont.text, styles.settingText]}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
            thumbColor={darkMode ? colors.switchThumbOn : colors.switchThumbOff}
          />
        </View>

        <View style={elementStyles.container}>
          <View style={styles.settingInfo}>
            {icons.notifications}
            <Text style={[textFont.text, styles.settingText]}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
            thumbColor={notifications ? colors.switchThumbOn : colors.switchThumbOff}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          {icons.logout}
          <Text style={[textFont.text, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 80, // Ensure bottom padding for scrolling content
    height: "100%",
    backgroundColor: colors.backgroundColor
  },
  container: {
    width: "90%",
    alignItems: "center",
    marginTop: 40
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  settingText: {
    marginLeft: 15,
    color: colors.text
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.logoutButton,
    borderRadius: 10,
    width: "100%",
    paddingVertical: 15,
    marginTop: 20
  },
  logoutText: {
    color: colors.logoutText,
    fontWeight: "bold",
    marginLeft: 10
  }
});

export default SettignsScreen;
