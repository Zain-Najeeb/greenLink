import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, SetStateAction } from "react";
import {
  AddressCoordinates,
  AddressInfo,
  GeofencePoint,
  LocationCoords,
} from "@/types/locationTypes";
import { useGeoFence } from "@/hooks/useGeofence";

export interface NavigationContextType {
  source: LocationCoords;
  destination: LocationCoords;
  addresses: AddressInfo[] | null;
  routeInfo: AddressCoordinates | null;
  step: number | null;
  busDistance: number | null;
  totalTime: number | null;
  totalDistance: number | null;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const NavigationContext = createContext<NavigationContextType>({
  source: {
    latitude: 0,
    longitude: 0,
  },
  destination: {
    latitude: 0,
    longitude: 0,
  },
  addresses: null,
  routeInfo: null,
  step: null,
  busDistance: null,
  totalTime: null,
  totalDistance: null,
  active: false,
  setActive: () => {},
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [source, setSource] = useState<LocationCoords | null>(null);
  const [destination, setDestination] = useState<LocationCoords | null>(null);
  const [addressInfo, setAddresses] = useState<AddressInfo[] | null>(null);
  const [routeInfo, setRouteInfo] = useState<AddressCoordinates | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);
  const [busDistance, setBusDistance] = useState<number | null>(null);
  const { setGeofence } = useGeoFence();

  useEffect(() => {
    if (!active) return;

    const setNavigation = async () => {
      const geoLocations: GeofencePoint[] = [];
      const storedAddress = await AsyncStorage.getItem("addresses");
      const storedRoutes = await AsyncStorage.getItem("routeInfo");

      if (storedAddress && storedRoutes) {
        const savedLocations = JSON.parse(storedAddress) as AddressInfo[];
        const savedRoutes = JSON.parse(storedRoutes) as AddressCoordinates;
        setRouteInfo(savedRoutes);
        setAddresses(savedLocations);
        console.log(storedAddress);
        let total = 0;
        savedLocations.forEach((element) => {
          // console.log(element);
          if (element.type !== "Walk to") {
            if (!source) {
              setSource({
                latitude: savedRoutes[element.address].lat,
                longitude: savedRoutes[element.address].lng,
              });
            }

            const parts =
              savedRoutes[element.address].distanceFromPrevious.split(" ");
            let value = parseFloat(parts[0]);
            if (parts[1] === "m") {
              value /= 1000;
            }

            if (element.type === "Get on") {
              geoLocations.push({
                latitude: savedRoutes[element.address].lat,
                longitude: savedRoutes[element.address].lng,
                radius: 50,
                step: 0,
                message: `Get on at ${element.address} at ${
                  savedRoutes[element.address].time
                }`,
              });
            } else {
              geoLocations.push({
                latitude: savedRoutes[element.address].lat,
                longitude: savedRoutes[element.address].lng,
                radius: 50,
                step: 0,
                message: `Get off at ${element.address} at ${
                  savedRoutes[element.address].time
                }`,
              });
            }

            total += value;
          }
        });

        if (geoLocations.length !== 0) {
          geoLocations[geoLocations.length - 1].step = 1;
          setBusDistance(total);
          setDestination({
            latitude: geoLocations[geoLocations.length - 1].latitude,
            longitude: geoLocations[geoLocations.length - 1].longitude,
          });
          setGeofence(geoLocations);
        }
      }
    };

    setNavigation();
  }, [active]);

  useEffect(() => {
    const initializeNavigation = async () => {
      const storedAddress = await AsyncStorage.getItem("addresses");
      const storedRoutes = await AsyncStorage.getItem("routeInfo");

      if (storedAddress || storedRoutes) {
        console.log("SESSION NAVIGATION");
        setActive(true);
      }
    };

    initializeNavigation();
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        source,
        destination,
        addresses: addressInfo ?? [],
        routeInfo,
        step: step ?? 0,
        busDistance,
        totalTime,
        totalDistance,
        active,
        setActive,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
