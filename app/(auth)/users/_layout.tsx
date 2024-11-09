import { Stack } from "expo-router";
import { primaryColour } from "@/constants/Colors";

export default function RootLayout() {
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
