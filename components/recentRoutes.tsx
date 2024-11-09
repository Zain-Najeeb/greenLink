import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

type Route = {
  id: string;
  name: string;
  date: string;
};

type RecentRoutesProps = {
  routes: Route[];
};

const RecentRoutes: React.FC<RecentRoutesProps> = ({ routes }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Routes</Text>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.routeItem}>
            <Text style={styles.routeName}>{item.name}</Text>
            <Text style={styles.routeDate}>{item.date}</Text>
          </View>
        )}
      />
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
