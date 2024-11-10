import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { sendNotification } from "@/util/sendNotification";
import { GeofencePoint, LocationCoords } from "@/types/locationTypes";

type LocationType = Location.LocationObject | null;

interface GeoFenceContextType {
  location: LocationType;
  geofence: GeofencePoint[] | null;
  isInGeofence: boolean;
  errorMsg: string | null;
  setGeofence: (geofence: GeofencePoint[] | null) => void;
  checkIfInGeofence: (
    userLocation: LocationCoords,
    geofencePoints: GeofencePoint[]
  ) => void;
}

export const GeoFenceContext = createContext<GeoFenceContextType | undefined>(
  undefined
);

export function GeoFenceProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationType>(null);
  const [geofence, setGeofence] = useState<GeofencePoint[] | null>(null);
  const [isInGeofence, setIsInGeofence] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastNotificationState, setLastNotificationState] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;
    const setupPermissions = async () => {
      try {
        const locationStatus =
          await Location.requestForegroundPermissionsAsync();
        if (locationStatus.status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const notificationStatus =
          await Notifications.requestPermissionsAsync();
        if (notificationStatus.status !== "granted") {
          setErrorMsg("Permission to send notifications was denied");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 5,
          },
          (newLocation) => {
            setLocation(newLocation);
            if (geofence) {
              checkIfInGeofence(newLocation.coords, geofence);
            }
          }
        );
      } catch (error) {
        setErrorMsg(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    };

    setupPermissions();
    return () => {
      locationSubscription?.remove();
    };
  }, [geofence]);

  const isWithinRadius = (
    userLocation: LocationCoords,
    geofencePoint: GeofencePoint
  ): boolean => {
    const toRadians = (degree: number) => (degree * Math.PI) / 180;
    const R = 6371e3; // Radius of Earth in meters

    const lat1 = toRadians(userLocation.latitude);
    const lat2 = toRadians(geofencePoint.latitude);
    const deltaLat = toRadians(geofencePoint.latitude - userLocation.latitude);
    const deltaLon = toRadians(
      geofencePoint.longitude - userLocation.longitude
    );

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters

    return distance <= geofencePoint.radius;
  };

  const checkIfInGeofence = (
    userLocation: LocationCoords,
    geofencePoints: GeofencePoint[]
  ): void => {
    let inside = false;

    for (const point of geofencePoints) {
      if (isWithinRadius(userLocation, point)) {
        inside = true;
        break;
      }
    }

    setIsInGeofence(inside);

    // Only send notification if the state has changed and it's different from the last notification
    if (lastNotificationState !== inside) {
      setLastNotificationState(inside);
      sendNotification(
        inside
          ? "You have entered the geofence area."
          : "You have exited the geofence area."
      );
    }
  };

  return (
    <GeoFenceContext.Provider
      value={{
        location,
        geofence,
        isInGeofence,
        errorMsg,
        setGeofence,
        checkIfInGeofence,
      }}
    >
      {children}
    </GeoFenceContext.Provider>
  );
}
