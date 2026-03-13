import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  RefreshControl,
  Modal
} from "react-native";

import LoadingIndicator from "../components/generalComponents/LoadingIndicator";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import icons from "../config/icons";
import colors from "../config/colors";
import textFont from "../config/textFont";
import elementStyles from "../config/elementStyles";
import { isDemoMode } from "../config/demoMode";
import authStorage from "../auth/storage";

function SettignsScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { logOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [showReloadModal, setShowReloadModal] = useState(false);

  const handleLogout = () => {
    if (isDemoMode) {
      setShowReloadModal(true);
      return;
    }
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
    <>
      <Modal
        visible={showReloadModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReloadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Leave demo</Text>
            <Text style={styles.modalMessage}>
              To return to the login screen, please reload the browser.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowReloadModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
        {isDemoMode && (
          <Text style={styles.demoBadge}>Demo mode — use "Leave demo" below to return to login, then refresh the browser.</Text>
        )}
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
          <Text style={[textFont.text, styles.logoutText]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
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
  demoBadge: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    fontSize: 13,
    textAlign: "center",
    borderRadius: 8,
    overflow: "hidden"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 320
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 12,
    textAlign: "center"
  },
  modalMessage: {
    fontSize: 15,
    color: colors.text,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22
  },
  modalButton: {
    backgroundColor: colors.logoutButton,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center"
  },
  modalButtonText: {
    color: colors.logoutText,
    fontWeight: "bold",
    fontSize: 16
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
