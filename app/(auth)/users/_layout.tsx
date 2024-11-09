import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { User } from "@/types/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { primaryColour } from "@/constants/Colors";

export default function RootLayout() {
  const segments = useSegments();
  console.log(segments[0]);

  useEffect(() => {
    const checkSession = async () => {
      const session = await AsyncStorage.getItem("supabase_session");
      if (session) {
        console.log("Session Is here");
      } else {
        console.log("no session");
      }
    };
    checkSession();
  }, []);

  const headerOptions = (headerTitle: string) => {
    return {
      headerTitle,
      headerTintColor: primaryColour,
    };
  };
  return (
    <Stack>
      <Stack.Screen name="signIn" options={headerOptions("Sign In")} />
      <Stack.Screen name="signUp" options={headerOptions("Create Account")} />
      <Stack.Screen name="forgotPassword" options={headerOptions("Forgot Password")} />
    </Stack>
  );
}
