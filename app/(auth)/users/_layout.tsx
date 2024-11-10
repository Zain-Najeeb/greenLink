import { Redirect, Stack } from "expo-router";
import { primaryColour } from "@/constants/Colors";
import { useSession } from "@/hooks/useSession";
export default function RootLayout() {
  const { session } = useSession();
  const headerOptions = (headerTitle: string) => {
    return {
      headerTitle,
      headerTintColor: primaryColour,
    };
  };

  return !session ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn" options={headerOptions("Sign In")} />
      <Stack.Screen name="signUp" options={headerOptions("Create Account")} />
      <Stack.Screen
        name="forgotPassword"
        options={headerOptions("Forgot Password")}
      />
    </Stack>
  ) : (
    <Redirect href="/(app)/dashboard" />
  );
}
