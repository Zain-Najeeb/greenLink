import useApiCall from "@/hooks/useApiCall";
import "react-native-get-random-values";
import React from "react";
import { Text, StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

import { ButtonField } from "@/components";
import { signOut } from "@/api/users/signOut";
import { useSession } from "@/hooks/useSession";
import { Link } from "expo-router";
import Rewards from "@/components/rewards";
import WelcomeText from "@/components/welcomeText";
import RecentRoutes from "@/components/recentRoutes";
import Stats from "@/components/stats";
import TotalPoints from "@/components/totalPoints";
import RewardProgress from "@/components/rewardProgress";

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
      radius: 30,
    },
  ];
  const { setGeofence } = useGeoFence();
  useEffect(() => {
    setGeofence(GeoFences);
  }, []);

  const { session, user, isLoading, destroySession } = useSession();
  const handeSignOut = async () => {
    destroySession();
    await execute();
  };

  // Sample coupon data
  const coupons = [
    {
      storeName: "Trish Juice",
      expiryDate: "2024-12-31",
      discount: "10% off",
    },
    {
      storeName: "Street Bitez",
      expiryDate: "2025-01-15",
      discount: "15% off",
    },
    {
      storeName: "Indian Curry Express & Bar",
      expiryDate: "2025-02-28",
      discount: "20% off",
    },
    {
      storeName: "Domino's",
      expiryDate: "2024-12-31",
      discount: "10% off",
      link: "https://www.dominos.com",
      logo: "",
    },
    {
      storeName: "Store B",
      expiryDate: "2025-01-15",
      discount: "15% off",
      link: "https://www.dominos.com",
      logo: "",
    },
    {
      storeName: "Store C",
      expiryDate: "2025-02-28",
      discount: "20% off",
      link: "https://www.dominos.com",
      logo: "",
    },
    {
      storeName: "Store D",
      expiryDate: "2025-02-28",
      discount: "20% off",
      link: "https://www.dominos.com",
      logo: "",
    },
    {
      storeName: "Store E",
      expiryDate: "2025-02-28",
      discount: "20% off",
      link: "https://www.dominos.com",
      logo: "",
    },
  ];

  const recentRoutes = [
    { id: "1", name: "Route 1", date: "2024-11-08" },
    { id: "2", name: "Route 2", date: "2024-11-07" },
    { id: "3", name: "Route 3", date: "2024-11-06" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <WelcomeText name={user?.name!} />
        <RecentRoutes routes={recentRoutes} />

        {/* Eco Score and Total Reward Points Side by Side */}
        <View style={styles.statsRow}>
          <TotalPoints points={user?.points!} />
          <Stats score={user?.score!} />
        </View>

        {/* Progress towards next reward */}
        <View style={styles.rewardProgressContainer}>
          <RewardProgress points={user?.points!} target={10000} />
        </View>
        <Rewards coupons={coupons} />
      </ScrollView>
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
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rewardProgressContainer: {
    marginTop: -30, // Minimized top margin to bring it closer to the above components
    alignItems: "center", // Center the progress bar
  },
});
