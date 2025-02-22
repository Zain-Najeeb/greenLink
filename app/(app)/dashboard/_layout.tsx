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
import * as Notifications from "expo-notifications";
import { useSession } from "@/hooks/useSession";
import { NavigationProvider } from "@/providers/NavigationProvider";
import { GeoFenceProvider } from "@/providers/GeoFencingProvider";
const Tab = createBottomTabNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function RootLayout() {
  const { session } = useSession();
  return session ? (
    <GeoFenceProvider>
      <NavigationProvider>
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
          </Tab.Navigator>
        </NavigationContainer>
      </NavigationProvider>
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
