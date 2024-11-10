import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import MapView, { MapWMSTile } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import SelectRoute from "@/components/selectRoute";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ButtonField, CustomMarker } from "@/components";
import Entypo from "@expo/vector-icons/Entypo";
import { pinIconColour, primaryColour } from "@/constants/Colors";

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string;

export default function Map() {
  const [selectRoute, setSelectRoute] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasValidRoute, setHasValidRoute] = useState<boolean>(false);

  const route = {
    origin: { latitude: 43.687393, longitude: -79.76181799999999 },
    destination: { latitude: 43.691067, longitude: -79.766769 },
  };
  const mapData = {
    region: {
      latitude: 43.683334,
      longitude: -79.76667,
      latitudeDelta: 0.0922, // Smaller number = more zoom
      longitudeDelta: 0.0421, // Smaller number = more zoom
    },
  };

  // Check if route coordinates are valid
  const isValidRoute = () => {
    return (
      route.origin.latitude !== 0 &&
      route.origin.longitude !== 0 &&
      route.destination.latitude !== 100 &&
      route.destination.longitude !== 100
    );
  };

  const focusOnUser = () => {
    mapRef.current?.animateToRegion(
      {
        ...mapData.region,
        latitudeDelta: 0.01, // Closer zoom for user location
        longitudeDelta: 0.01,
      },
      1000
    );
  };
  const mapRef = React.useRef<MapView>(null);
  useEffect(() => {
    setSelectRoute(false);
  }, [isLoading]);
  useEffect(() => {
    if (mapRef.current && route.origin && route.destination) {
      mapRef.current.fitToCoordinates([route.origin, route.destination], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }
  }, [route.origin, route.destination]);
  useEffect(() => {
    const validRoute = isValidRoute();
    setHasValidRoute(validRoute);

    if (!validRoute) {
      // If no valid route, focus on user
      focusOnUser();
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={mapData.region}
        showsUserLocation={true}
        followsUserLocation={!hasValidRoute}
        showsMyLocationButton={true}
      >
        {isValidRoute() && (
          <>
            <Marker
              coordinate={route.origin}
              title="Start"
              description="Starting point"
              tracksViewChanges={false}
            >
              <CustomMarker color={pinIconColour} />
            </Marker>

            <Marker
              coordinate={route.destination}
              title="End"
              description="Destination point"
              tracksViewChanges={false}
            >
              <CustomMarker color={pinIconColour} />
            </Marker>

            {GOOGLE_MAPS_APIKEY && (
              <MapViewDirections
                origin={route.origin}
                destination={route.destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="#007AFF"
                mode="TRANSIT"
                optimizeWaypoints={true}
                onReady={(result) => {
                  // Fit to route when directions are loaded
                  mapRef.current?.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      top: 70,
                      right: 70,
                      bottom: 70,
                      left: 70,
                    },
                    animated: true,
                  });
                  setHasValidRoute(true);
                }}
                onError={(errorMessage) => {
                  console.log("GOT AN ERROR:", errorMessage);
                  setHasValidRoute(false);
                  focusOnUser();
                }}
              />
            )}
          </>
        )}
      </MapView>
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
