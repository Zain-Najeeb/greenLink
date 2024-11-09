import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import MapView from "react-native-maps";
import { PROVIDER_DEFAULT, Marker } from "react-native-maps";

import { ButtonField } from "@/components";
export default function Map() {
  const mapData = {
    region: {
      latitude: 43.7315,
      longitude: -79.7624,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
  };

  return (
    <>
      <View>
        <MapView style={styles.map} provider={PROVIDER_DEFAULT} {...mapData}>
          <Marker
            key={1}
            coordinate={{
              latitude: 43.7315,
              longitude: -79.7624,
            }}
          />
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
