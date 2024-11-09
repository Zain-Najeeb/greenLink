import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, Animated } from "react-native";

import { ButtonField, InputField } from "@/components";
import { signOut } from "@/api/users/signOut";
import useApiCall from "@/hooks/useApiCall";
import { useSession } from "@/hooks/useSession";

export default function Home() {
  const [destination, setDestination] = useState<string>("");
  const { execute } = useApiCall(signOut);
  const { session } = useSession();

  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity]);

  const handleSignOut = async () => {
    await execute();
  };

  return (
    <>
      <Animated.Text
        style={[styles.welcomeText, { transform: [{ translateY }], opacity }]}
      >
        {session && session.user_metadata
          ? `Welcome, ${session.user_metadata.full_name}!`
          : "Welcome!"}
      </Animated.Text>
      <InputField
        label="Where would you like to go?"
        value={destination}
        onChangeText={(text: string) => {
          setDestination(text);
        }}
        placeholder="Enter your destination"
      />
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
