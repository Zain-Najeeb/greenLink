import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import MapView from "react-native-maps";
import { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import SelectRoute from "@/components/selectRoute";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import SwipeUpDown from "react-native-swipe-up-down";

import { ButtonField } from "@/components";
export default function Map() {
  const [selectRoute, setSelectRoute] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const mapData = {
    region: {
      latitude: 43.7315,
      longitude: -79.7624,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
  };

  useEffect(() => {
    if (!isLoading) {
      setSelectRoute(false);
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_DEFAULT} {...mapData} />
      <ButtonField
        title={""}
        onPress={() => setSelectRoute(!selectRoute)}
        variant="primary"
        style={{ backgroundColor: "white" }}
        icon={
          selectRoute ? (
            <FontAwesome name="chevron-down" size={24} color="#8e8e93" />
          ) : (
            <FontAwesome name="chevron-up" size={24} color="#8e8e93" />
          )
        }
      />
      {selectRoute && (
        <SelectRoute isLoading={isLoading} setLoading={setLoading} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
});
