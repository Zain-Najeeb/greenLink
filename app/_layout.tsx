import { Stack } from "expo-router";
import React from "react";
import { primaryColour } from "@/constants/Colors";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/users" />
    </Stack>
  );
};

export default RootLayout;
