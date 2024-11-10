import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { primaryColour } from "@/constants/Colors";

interface RewardProgressProps {
  points: number;
  target: number;
}

const RewardProgress: React.FC<RewardProgressProps> = ({ points, target }) => {
  const progress = Math.min(points / target, 1); // Ensure it doesn’t exceed 100%

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>Progress to Next Reward</Text>
      <Progress.Bar
        progress={progress}
        width={300}
        color={primaryColour}
        unfilledColor="#E0E0E0"
        borderRadius={5}
      />
      <Text style={styles.pointsText}>
        {points} / {target} points
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  pointsText: {
    fontSize: 14,
    marginTop: 5,
    color: "#666",
  },
});

export default RewardProgress;
