import useApiCall from "@/hooks/useApiCall";
import React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";

import { ButtonField } from "@/components";
import { signOut } from "@/api/users/signOut";
import { useSession } from "@/hooks/useSession";
import { Link } from "expo-router";
export default function Home() {
  const { execute, data, error, isSuccess, isError, reset } =
    useApiCall(signOut);
  const { session, isLoading } = useSession();
  const handeSignOut = async () => {
    await execute();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text> Hi You are On Home page because you have a Session </Text>
      <ButtonField
        title="Click Here to Sign out (destroy the session"
        onPress={handeSignOut}
        variant="link"
        style={styles.Home}
      />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Home: {
    alignItems: "center",
    marginTop: 20,
  },
  container: {
    flex: 1
  }
});
