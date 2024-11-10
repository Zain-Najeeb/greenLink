// recentRoutes.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Route = {
  id: string;
  name: string;
  date: string;
};

type RecentRoutesProps = {
  routes: Route[];
};

const RecentRoutes: React.FC<RecentRoutesProps> = ({ routes }) => {
  // Get the three most recent routes
  const recentRoutes = routes.slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Routes</Text>
      {recentRoutes.map((route) => (
        <View key={route.id} style={styles.routeItem}>
          <Text style={styles.routeName}>{route.name}</Text>
          <Text style={styles.routeDate}>{route.date}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  routeItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  routeName: {
    fontSize: 16,
    fontWeight: "600",
  },
  routeDate: {
    fontSize: 14,
    color: "#666",
  },
});

export default RecentRoutes;
