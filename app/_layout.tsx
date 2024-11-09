import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { primaryColour } from "@/constants/Colors";
import { SessionProvider } from "@/providers/SessionProvider";
const RootLayout = () => {
  return (
    <SessionProvider>
      <SafeAreaView style={styles.safeArea}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/users" />
          <Stack.Screen name="(app)/dashboard" />
        </Stack>
      </SafeAreaView>
    </SessionProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: primaryColour,
  },
});

export default RootLayout;
