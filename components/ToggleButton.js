import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ToggleButton({ label, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.toggleButton, isActive && styles.activeButton]}
      onPress={onPress}
    >
      <Text style={styles.toggleButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#0056b3",
  },
  toggleButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
