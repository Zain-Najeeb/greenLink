import useApiCall from "@/hooks/useApiCall";
import "react-native-get-random-values";
import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";

import { ButtonField } from "@/components";
import { signOut } from "@/api/users/signOut";
import { useSession } from "@/hooks/useSession";
import { Link } from "expo-router";
import Rewards from "@/components/rewards";

import { useGeoFence } from "@/hooks/useGeofence";
import { GeofencePoint } from "@/types/locationTypes";
import { useEffect } from "react";
export default function Home() {
  const { execute, data, error, isSuccess, isError, reset } =
    useApiCall(signOut);
  const GeoFences: GeofencePoint[] = [
    {
      latitude: 43.684349176009476,
      longitude: -79.76053713536464,
      radius: 1000,
    },
  ];
  const { setGeofence } = useGeoFence();
  // useEffect(() => {
  //   setGeofence(GeoFences);
  // }, []);

  const { session, isLoading, destroySession } = useSession();
  const handeSignOut = async () => {
    destroySession();
    await execute();
  };

  // Sample coupon data
  const coupons = [
    {
      storeName: "Domino's",
      expiryDate: "2024-12-31",
      discount: "10% off",
      link: "https://www.dominos.com",
    },
    { storeName: "Store B", expiryDate: "2025-01-15", discount: "15% off" },
    { storeName: "Store C", expiryDate: "2025-02-28", discount: "20% off" },
    { storeName: "Store D", expiryDate: "2025-02-28", discount: "20% off" },
    { storeName: "Store C", expiryDate: "2025-02-28", discount: "20% off" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hi! You are on the Home page because you have a session.</Text>
      <ButtonField
        title="Click Here to Sign Out (destroy the session)"
        onPress={handeSignOut}
        variant="link"
        style={styles.Home}
      />

      <Link href="./(app)/dashboard/navigate" asChild>
        <ButtonField
          title="Click Here to go to Navigation page"
          onPress={() => console.log("nav pressed")}
          variant="link"
        />
      </Link>

      <Rewards coupons={coupons} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Home: {
    alignItems: "center",
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
});
