import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { primaryColour } from "@/constants/Colors";
import { SessionProvider } from "@/providers/SessionProvider";
import { SnackbarProvider } from "@/providers/SnackbarProvider";
const RootLayout = () => {
  return (
    <SessionProvider>
        <SnackbarProvider>
              <Stack screenOptions={{ headerShown: false}}>
              <Stack.Screen name="(auth)/users" />
              <Stack.Screen name="(app)/dashboard" />
            </Stack>
      </SnackbarProvider>
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
