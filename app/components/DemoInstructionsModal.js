import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";

export const DEMO_INSTRUCTIONS = [
  "Welcome to demo mode. To sign in, use any email (e.g. demo@example.com) and any password—no real account is required.",
  "No real backend is connected. All data (rooms, smart plugs, ventilation) is mock data and resets when you leave.",
  "You can explore the full UI: rooms, devices, toggle switches, and view charts. Nothing is saved to a server.",
  "It is important to note that this is a demo and some features may not work as expected, as server-side logic is not implemented.",
  "To use the real app, run it without demo mode (see .env.example).",
];

/** Inline instructions block for use on login screen or elsewhere */
export function DemoInstructionsContent({ style }) {
  return (
    <View style={[styles.instructionsContent, style]}>
      <View style={styles.header}>
        <MaterialIcons name="info-outline" size={24} color={colors.skyblue} />
        <Text style={styles.title}>Demo mode</Text>
      </View>
      {DEMO_INSTRUCTIONS.map((line, index) => (
        <View key={index} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.paragraph}>{line}</Text>
        </View>
      ))}
    </View>
  );
}

export default function DemoInstructionsModal({ visible, onDismiss }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <MaterialIcons name="info-outline" size={28} color={colors.skyblue} />
            <Text style={styles.title}>Demo mode</Text>
          </View>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {DEMO_INSTRUCTIONS.map((line, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.paragraph}>{line}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={onDismiss} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.title,
  },
  scroll: {
    maxHeight: 280,
  },
  scrollContent: {
    paddingRight: 8,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 16,
    color: colors.skyblue,
    marginRight: 8,
    lineHeight: 22,
  },
  paragraph: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.skyblue,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 16,
    alignItems: "center",
  },
  instructionsContent: {
    paddingVertical: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
