import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icons for ranks

// Define user structure for leaderboard data
interface User {
  id: string;
  name: string;
  points: number;
  rank: number;
}

const sampleData: User[] = [
  { id: "1", name: "Alice", points: 1200, rank: 1 },
  { id: "2", name: "Bob", points: 1150, rank: 2 },
  { id: "3", name: "Charlie", points: 1100, rank: 3 },
  { id: "18", name: "THANvro", points: 1000, rank: 10 }, // Example current user
];

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [userScore, setUserScore] = useState<User | null>(null);

  useEffect(() => {
    setLeaderboardData(sampleData);

    // Set the current user as an example
    const currentUser = sampleData.find(user => user.name === "THANvro");
    if (currentUser) {
      setUserScore(currentUser);
    }
  }, []);

  const renderTopThree = () => {
    return leaderboardData.slice(0, 3).map((user) => (
      <View key={user.id} style={styles.topUserRow}>
        <View style={styles.iconRow}>
          {user.rank === 1 && (
            <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
          )}
          {user.rank === 2 && (
            <MaterialIcons name="star" size={24} color="#C0C0C0" />
          )}
          {user.rank === 3 && (
            <MaterialIcons name="star" size={24} color="#CD7F32" />
          )}
        </View>
        <Text style={styles.topUserRank}>{user.rank}</Text>
        <Text style={styles.topUserName}>{user.name}</Text>
        <Text style={styles.topUserPoints}>{user.points} pts</Text>
      </View>
    ));
  };

  const renderItem = ({ item }: { item: User }) => (
    <View
      style={[
        styles.userRow,
        item.id === userScore?.id && styles.currentUserRow, // Highlight current user
      ]}
    >
      <Text style={styles.rank}>{item.rank}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points} pts</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      
      {/* Top 3 Users with icons for ranks */}
      <View style={styles.topThreeContainer}>{renderTopThree()}</View>

      {/* Main Leaderboard Excluding Top 3 */}
      <FlatList
        data={leaderboardData.slice(3)} // Display remaining users after top 3
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        ListFooterComponent={
          userScore && (
            <View style={styles.userScoreContainer}>
              <Text style={styles.userScoreTitle}>Your Score: {userScore.name}</Text>
              <Text style={styles.userScore}>{userScore.points} pts</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 130,
    marginBottom: 50,
  },
  topThreeContainer: {
    marginBottom: 20,
  },
  topUserRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  topUserRank: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#008751",
    width: 30,
    textAlign: "center",
  },
  topUserName: {
    fontSize: 25,
    flex: 1,
    marginLeft: 10,
  },
  topUserPoints: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "right",
    width: 80,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rank: {
    paddingLeft: 29,
    paddingRight: 34,
    fontSize: 30,
    fontWeight: "bold",
    color: "#008751",
    textAlign: "center",
    width: 30,
  },
  name: {
    fontSize: 25,
    flex: 1,
    marginLeft: 10,
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    width: 80,
  },
  currentUserRow: {
    backgroundColor: "#e6f7ff", // Highlight for current user
    borderRadius: 8, // Optional: adds rounded corners for a distinct look
  },
  userScoreContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  userScoreTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  userScore: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginTop: 4,
  },
});
