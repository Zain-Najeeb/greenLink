import { Stack, Redirect } from "expo-router";
import { primaryColour } from "@/constants/Colors";
import { useSession } from "@/hooks/useSession";
import { GeoFenceProvider } from "@/providers/GeoFencingProvider";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const { session } = useSession();

  const headerOptions = (headerTitle: string) => {
    return {
      headerTitle,
      headerTintColor: primaryColour,
    };
  };

  return session ? (
    <GeoFenceProvider>
      <Stack>
        <Stack.Screen name="home" options={headerOptions("Home Page")} />
        <Stack.Screen name="navigate" options={headerOptions("Navigate")} />
      </Stack>
    </GeoFenceProvider>
  ) : (
    <Redirect href="/(auth)/users" />
  );
}
