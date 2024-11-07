import { Stack } from "expo-router";
import React from "react";
import { primaryColour } from "@/constants/Colors";
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerTintColor: primaryColour,
        }}
      />
      <Stack.Screen
        name="users/signIn"
        options={{
          headerTitle: "Sign In",
          headerTintColor: primaryColour,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
