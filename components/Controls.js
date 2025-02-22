import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Controls({
  label,
  onRotateLeft,
  onRotateRight,
  onMoveForward,
  onMoveBackward,
}) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonLabel}>{label}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onRotateLeft}>
          <Text style={styles.buttonText}>Rotate Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onRotateRight}>
          <Text style={styles.buttonText}>Rotate Right</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onMoveForward}>
          <Text style={styles.buttonText}>Move Forward</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onMoveBackward}>
          <Text style={styles.buttonText}>Move Backward</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
