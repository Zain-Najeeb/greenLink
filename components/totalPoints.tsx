import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { primaryColour } from "@/constants/Colors";

interface TotalPointsProps {
  points: number;
}

const TotalPoints: React.FC<TotalPointsProps> = ({ points }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Points</Text>
      <View style={styles.pointsBox}>
        <Text style={styles.pointsText}>{points}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: primaryColour,
    marginBottom: 10,
  },
  pointsBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  pointsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default TotalPoints;
