import React from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, Alert } from "react-native";

export default function Account() {

  const handleLogOff = () => {
    Alert.alert("Log Off", "You have been logged off.");
    // Add additional log-off logic here, such as clearing user data or navigating to the login screen
  };

  const handleViewProfile = () => {
    Alert.alert("Profile", "Navigate to Profile Screen");
    // Add navigation to the profile screen here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingText}>Hi, You are on the Account page</Text>
      <View style={styles.buttonContainer}>
        <Button title="View Profile" onPress={handleViewProfile} />
        <Button title="Log Off" onPress={handleLogOff} color="red" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headingText: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
