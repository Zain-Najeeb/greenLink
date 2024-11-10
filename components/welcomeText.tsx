import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { primaryColour } from "@/constants/Colors";

interface Name {
  name: string
}

const WelcomeText: React.FC<Name> = ({name}) => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Welcome, " + name;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100); // Adjust speed of animation here
    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.welcomeText}>{displayText}</Text>;
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: primaryColour,
    marginVertical: 10,
  },
});

export default WelcomeText;
