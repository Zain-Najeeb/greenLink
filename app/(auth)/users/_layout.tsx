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
    <Stack>
      <Stack.Screen name="signIn" options={headerOptions("")} />
      <Stack.Screen name="signUp" options={headerOptions("")} />
      <Stack.Screen name="forgotPassword" options={headerOptions("")} />
    </Stack>
  ) : (
    <Redirect href="/(app)/dashboard" />
  );
}
