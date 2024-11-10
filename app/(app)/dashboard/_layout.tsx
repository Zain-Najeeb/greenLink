import { Stack, Redirect } from "expo-router";
import { primaryColour } from "@/constants/Colors";
import { SafeAreaView, Image, StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Home from "./home";
import Map from "./map";
import Account from "./account";
import React from "react";
import Navigate from "./navigate";
import { useSession } from "@/hooks/useSession";
import { GeoFenceProvider } from "@/providers/GeoFencingProvider";
const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const { session } = useSession();
  return session ? (
    <GeoFenceProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: primaryColour,
            headerLeft: () => (
              <Image
                source={require("../../../assets/images/favicon.png")}
                style={styles.headerImage}
              />
            ),
            headerTitle: "",
            headerTitleAlign: "center", // Centers the title if you have one
          }}
        >
          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              tabBarLabel: "Map",
              tabBarIcon: ({ color }) => (
                <Fontisto name="map-marker-alt" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Navigate"
            component={Navigate}
            options={{
              tabBarLabel: "Navigate",
              tabBarIcon: ({ color }) => (
                <Fontisto name="navigate" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GeoFenceProvider>
  ) : (
    <Redirect href="/(auth)/users" />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    resizeMode: "contain",
    maxWidth: 150,
    maxHeight: 80,
    marginLeft: 10,
  },
});
