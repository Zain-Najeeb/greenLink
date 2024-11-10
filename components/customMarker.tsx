import React from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const CustomMarker = ({ color }: { color: string }) => (
  <View style={styles.markerContainer}>
    <Entypo name="location-pin" size={36} color={color} />
  </View>
);

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomMarker;
