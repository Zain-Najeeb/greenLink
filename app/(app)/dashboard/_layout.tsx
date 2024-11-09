import { Stack } from "expo-router";
import { primaryColour } from "@/constants/Colors";
import { SafeAreaView, StyleSheet } from "react-native";

export default function RootLayout() {
  const headerOptions = (headerTitle: string) => {
    return {
      headerTitle,
      headerTintColor: primaryColour,
    };
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack>
        <Stack.Screen name="home" options={headerOptions("Home Page")} />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: primaryColour,
  },
});
