import React from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSession } from "@/hooks/useSession";
import useApiCall from "@/hooks/useApiCall";
import { signOut } from "@/api/users/signOut";
import Leaderboard from "@/components/leaderBoard";
import { primaryColour } from "@/constants/Colors";

export default function Account() {
  const { execute } = useApiCall(signOut);
  const { destroySession } = useSession();

  const handleLogOut = async () => {
    console.log("User logged out");
    destroySession();
    await execute();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Leaderboard */}
      <Leaderboard />

      {/* Log Out Option */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.option} onPress={handleLogOut}>
          <View style={styles.optionLeft}>
            <Icon name="logout" size={24} color={primaryColour} />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Log Out</Text>
              <Text style={styles.optionSubtitle}>
                Further secure your account for safety
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  bottomContainer: {
    paddingBottom: 6,
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionSubtitle: {
    fontSize: 12,
    color: "gray",
  },
});
