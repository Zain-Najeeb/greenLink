import useApiCall from "@/hooks/useApiCall";
import "react-native-get-random-values";
import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";

import { ButtonField } from "@/components";
import { signOut } from "@/api/users/signOut";
import { useSession } from "@/hooks/useSession";
import { Link } from "expo-router";
import Rewards from "@/components/rewards";
import WelcomeText from "@/components/welcomeText";
import RecentRoutes from "@/components/recentRoutes";
import Stats from "@/components/stats";

export default function Home() {
  const { execute, data, error, isSuccess, isError, reset } =
    useApiCall(signOut);
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

  // Sample recent routes data
  const recentRoutes = [
    { id: "1", name: "Route 1", date: "2024-11-08" },
    { id: "2", name: "Route 2", date: "2024-11-07" },
    { id: "3", name: "Route 3", date: "2024-11-06" },
  ];

  const score = 60; // Example eco score from 0 to 99

  return (
    <SafeAreaView style={styles.container}>
      <WelcomeText />
      <RecentRoutes routes={recentRoutes} />
      <Stats score={score} />
      <Rewards coupons={coupons} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
