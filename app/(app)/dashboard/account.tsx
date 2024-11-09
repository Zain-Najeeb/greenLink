import React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";

export default function Account() {

  return (
    <SafeAreaView style={styles.container}>
      <Text> Hi You are On Account page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Home: {
    alignItems: "center",
    marginTop: 20,
  },
  container: {
    flex: 1
  }
});
