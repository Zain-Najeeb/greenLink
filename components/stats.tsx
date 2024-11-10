import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { primaryColour } from "@/constants/Colors";

interface StatsProps {
  score: number;
}

const getScoreColor = (score: number) => {
  if (score < 40) return "#FF4C4C"; // Red for low scores
  if (score < 70) return "#FFA500"; // Orange for medium scores
  return "#4CAF50"; // Green for high scores
};

const Stats: React.FC<StatsProps> = ({ score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eco Score</Text>
      <CircularProgress
        value={score}
        radius={50}
        duration={1000}
        progressValueColor={getScoreColor(score)}
        maxValue={100}
        activeStrokeColor={getScoreColor(score)}
        activeStrokeSecondaryColor="#E0E0E0"
        inActiveStrokeColor="#E0E0E0"
        inActiveStrokeOpacity={0.3}
        title="%"
        titleStyle={{
          fontSize: 16,
          color: getScoreColor(score),
          fontWeight: "bold",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: primaryColour,
    marginBottom: 10,
  },
  percentText: {
    fontSize: 16,
    color: primaryColour,
    fontWeight: "bold",
  },
});

export default Stats;
