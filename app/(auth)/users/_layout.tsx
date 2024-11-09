import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { User } from "@/types/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { primaryColour } from "@/constants/Colors";
import { useSession } from "@/hooks/useSession";

export default function RootLayout() {
  const { session, isLoading, checkSession } = useSession();

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
    </Stack>
  );
}
