import useApiCall from "@/hooks/useApiCall";
import React from "react";
import { Text, StyleSheet } from "react-native";

import { ButtonField } from "@/components";
import { signOut } from "@/api/users/signOut";
import { useSession } from "@/hooks/useSession";
export default function Home() {
  const { execute, data, error, isSuccess, isError, reset } =
    useApiCall(signOut);
  const { session, isLoading } = useSession();
  const handeSignOut = async () => {
    await execute();
  };

  return (
    <>
      <Text> Hi You are On Home page because you have a Session </Text>
      <ButtonField
        title="Click Here to Sign out (destroy the session"
        onPress={handeSignOut}
        variant="link"
        style={styles.Home}
      />
    </>
  );
}

const styles = StyleSheet.create({
  Home: {
    alignItems: "center",
    marginTop: 20,
  },
});
