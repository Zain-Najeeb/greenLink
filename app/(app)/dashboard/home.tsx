import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, Animated } from "react-native";

import { ButtonField } from "@/components";
import { signOut } from "@/api/users/signOut";
import useApiCall from "@/hooks/useApiCall";
import { useSession } from "@/hooks/useSession";

export default function Home() {
  const { execute } = useApiCall(signOut);
  const { session } = useSession();

  const translateX = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateX, opacity]);

  const handleSignOut = async () => {
    await execute();
  };

  return (
    <>
      <Animated.Text
        style={[styles.welcomeText, { transform: [{ translateX }], opacity }]}
      >
        {session && session.user_metadata
          ? `Welcome, ${session.user_metadata.full_name}!`
          : "Welcome!"}
      </Animated.Text>
      <Text>Hi, you are on the Home page because you have a session.</Text>
      <ButtonField
        title="Click Here to Sign out (destroy the session)"
        onPress={handleSignOut}
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
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
