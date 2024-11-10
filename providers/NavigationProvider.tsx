import React, { createContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, SetStateAction } from "react";
import {
  AddressCoordinates,
  AddressInfo,
  GeofencePoint,
  LocationCoords,
  RouteInformation,
} from "@/types/locationTypes";
import { useGeoFence } from "@/hooks/useGeofence";

export interface NavigationContextType {
  source: LocationCoords | null;
  destination: LocationCoords | null;
  addresses: AddressInfo[] | null;
  routeInfo: AddressCoordinates | null;
  step: number | null;
  busDistance: number | null;
  totalTime: number | null;
  totalDistance: number | null;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

// Default values for the context
export const NavigationContext = createContext<NavigationContextType>({
  source: null,
  destination: null,
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
  const totalTime = useRef<number | null>(null);
  const totalDistance = useRef<number | null>(null);
  const busDistance = useRef<number | null>(null);
  const { setGeofence } = useGeoFence();

  useEffect(() => {
    if (!active) return;

    const setNavigation = async () => {
      const geoLocations: GeofencePoint[] = [];
      const storedAddress = await AsyncStorage.getItem("addresses");
      const storedRoutes = await AsyncStorage.getItem("routeInfo");
      // console.log(storedAddress, storedRoutes, "HERE");
      if (storedAddress && storedRoutes) {
        const savedLocations = JSON.parse(storedAddress) as AddressInfo[];
        const savedRoutes = JSON.parse(storedRoutes) as AddressCoordinates;
        setRouteInfo(savedRoutes);
        setAddresses(savedLocations);
        let total = 0;
        savedLocations.forEach((element) => {
          if (element.type != "Walk to") {
            if (!source) {
              setSource({
                latitude: savedRoutes[element.address].lat,
                longitude: savedRoutes[element.address].lng,
              });
            }

            let parts =
              savedRoutes[element.address].distanceFromPrevious.split(" ");
            let value: number = parseFloat(parts[0]);
            if (parts[1] == "m") {
              value = value / 1000;
            }
            if (element.type === "Get on") {
              busDistance.current;
              geoLocations.push({
                latitude: savedRoutes[element.address].lat,
                longitude: savedRoutes[element.address].lng,
                radius: 50,
                step: 0,
                message: `Get on at  ${element.address} at ${
                  savedRoutes[element.address].time
                }`,
              });
            } else {
              geoLocations.push({
                latitude: savedRoutes[element.address].lat,
                longitude: savedRoutes[element.address].lng,
                radius: 50,
                step: 0,
                message: `Get off at  ${element.address} at ${
                  savedRoutes[element.address].time
                }`,
              });
            }
            total += value;
          }
        });

        if (geoLocations.length !== 0) {
          geoLocations[geoLocations.length - 1].step = 1;
          busDistance.current = total;
          setDestination({
            latitude: geoLocations[geoLocations.length - 1].latitude,
            longitude: geoLocations[geoLocations.length - 1].longitude,
          });
          setGeofence(geoLocations);
        }
      } else {
        return;
      }
      console.log(geoLocations);
    };

    setNavigation();
  }, [active]);

  useEffect(() => {
    const setNavigation = async () => {
      const storedAddress = await AsyncStorage.getItem("addresses");
      const storedRoutes = await AsyncStorage.getItem("routeInfo");

      if (storedAddress || storedRoutes) {
        console.log("SESSION NAVIGATION");
        setActive(true);
      }
    };

    setNavigation();
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        source: null,
        destination: null,
        addresses: addressInfo ?? [],
        routeInfo: routeInfo ?? null,
        step: step ?? 0,
        busDistance: busDistance.current ?? 0,
        totalTime: totalTime.current ?? 0,
        totalDistance: totalDistance.current ?? 0,
        active,
        setActive,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
