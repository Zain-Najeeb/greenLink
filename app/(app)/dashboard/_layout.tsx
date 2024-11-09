import { Stack, Redirect } from "expo-router";
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
  return session ? (
    <Stack>
      <Stack.Screen name="home" options={headerOptions("Home Page")} />
      <Stack.Screen name="navigate" options={headerOptions("Navigate")} />
    </Stack>
  ) : (
    <Redirect href="/(auth)/users" />
  );
}
