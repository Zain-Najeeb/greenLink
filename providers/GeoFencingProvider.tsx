import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

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
  const notificationRef = useRef<boolean>(false); 
  const locationSubscriptionRef = useRef<Location.LocationSubscription | null>(null);

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
            // accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1,
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
      locationSubscriptionRef.current = null;
    };
  }, [geofence]);

  const isWithinRadius = (
    userLocation: LocationCoords,
    geofencePoint: GeofencePoint
  ): boolean => {
    const toRadians = (degree: number) => (degree * Math.PI / 180);
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

    // console.log(distance);

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
    if (notificationRef.current !== inside) {
      if(inside == true) {
        locationSubscriptionRef.current?.remove(); 
        locationSubscriptionRef.current = null;
      }
      
      notificationRef.current = inside;
      sendNotification(
        inside
          ? "You have entered the geofence area."
          : "You have exited the geofence area."
      );
    }
  };

  const sendNotification = async (message: string) => {
    try {
      // console.log("Attempting to send notification:", message);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Geofence Alert",
          body: message,
          sound: true,
          priority: "high",
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          seconds: 1,
        },
      });

      // console.log("Notification scheduled successfully");
    } catch (error) {
      console.error("Failed to send notification:", error);
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
