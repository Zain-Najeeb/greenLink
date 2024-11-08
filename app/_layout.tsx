import { Stack } from "expo-router";
import React from "react";
import { primaryColour } from "@/constants/Colors";
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="users/signIn"
        options={{
          headerTitle: "Sign In",
          headerTintColor: primaryColour,
        }}
      />
      <Stack.Screen
        name="users/signUp"
        options={{
          headerTitle: "Sign Up",
          headerTintColor: primaryColour,
        }}
      />
      <Stack.Screen
        name="users/forgotPassword"
        options={{
          headerTitle: "Forgot Password",
          headerTintColor: primaryColour,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
