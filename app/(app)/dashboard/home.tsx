import useApiCall from "@/hooks/useApiCall";
import "react-native-get-random-values";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { ButtonField } from "@/components";
import { signOut } from "@/api/users/signOut";
import { useSession } from "@/hooks/useSession";
import { Link } from "expo-router";

export default function Home() {
  const { execute, data, error, isSuccess, isError, reset } =
    useApiCall(signOut);
  const { session, isLoading, destroySession } = useSession();
  const handeSignOut = async () => {
    destroySession();
    await execute();
  };

  return (
    <>
      <Text> Hi You are On Home page because you have a Session </Text>
      <ButtonField
        title="Click Here to Sign out (destroy the session)"
        onPress={handeSignOut}
        variant="link"
        style={styles.Home}
      />

      <Link href="/(app)/dashboard/navigate" asChild>
        <ButtonField
          title="Click Here to go to navigation page"
          onPress={() => console.log("nav pressed")}
          variant="link"
        />
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  Home: {
    alignItems: "center",
    marginTop: 20,
  },
});
