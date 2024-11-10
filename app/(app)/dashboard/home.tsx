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

  const routes = [
    { id: "1-338", name: "Queen", date: "2024-11-01" },
    { id: "2-338", name: "Main", date: "2024-11-02" },
    { id: "4-338", name: "Chinguacousy", date: "2024-11-03" },
    { id: "5-338", name: "Bovaird", date: "2024-11-04" },
    { id: "7-338", name: "Kennedy", date: "2024-11-05" },
    { id: "10-338", name: "South Industrial", date: "2024-11-06" },
    { id: "12-338", name: "Grenoble", date: "2024-11-07" },
    { id: "14-338", name: "Torbram", date: "2024-11-08" },
    { id: "16-338", name: "Southgate", date: "2024-11-09" },
    { id: "18-338", name: "Dixie", date: "2024-11-10" },
    { id: "20-338", name: "East Industrial", date: "2024-11-11" },
    { id: "24-338", name: "Van Kirk", date: "2024-11-12" },
    { id: "27-338", name: "Robert Parkinson", date: "2024-11-13" },
    { id: "29-338", name: "Williams", date: "2024-11-14" },
    { id: "33-338", name: "Peter Robertson", date: "2024-11-15" },
    { id: "36-338", name: "Gardenbrooke", date: "2024-11-16" },
    { id: "50-338", name: "Gore Road", date: "2024-11-17" },
    { id: "53-338", name: "Ray Lawson", date: "2024-11-18" },
    { id: "115-338", name: "Pearson Airport Express", date: "2024-11-19" },
    { id: "502-338", name: "Zum Main", date: "2024-11-20" },
  ];

  const recentRoutes = getRandomRoutes();
  function getRandomRoutes(): { id: string; name: string; date: string }[] {
    const shuffledRoutes = routes.sort(() => 0.5 - Math.random());
    return shuffledRoutes.slice(0, 3);
  }
  // Sample recent routes data and coupon data omitted for brevity

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <WelcomeText name={user?.name!} />
        <RecentRoutes routes={recentRoutes} />

        {/* Eco Score and Total Reward Points Side by Side */}
        <View style={styles.statsRow}>
          <TotalPoints points={user?.points!} />
          <Stats score={user?.eco_score!} />
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
