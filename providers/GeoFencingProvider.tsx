import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
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
  const notificationRef = useRef<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    if (!trigger) return;

    let locationSubscription: Location.LocationSubscription | null = null;

    const watchingGeo = async () => {
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
    };
    watchingGeo();
    return () => {
      console.log("Unmounted");
      locationSubscription?.remove();
    };
  }, [trigger]);

  useEffect(() => {
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
        setTrigger(true);
      } catch (error) {
        setErrorMsg(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    };
    setupPermissions();
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

    // console.log(distance);

    return distance <= geofencePoint.radius;
  };

  const checkIfInGeofence = async (
    userLocation: LocationCoords,
    geofencePoints: GeofencePoint[]
  ): Promise<void> => {
    let inside = false;
    let message = "";
    let step = 0;
    for (const point of geofencePoints) {
      if (isWithinRadius(userLocation, point)) {
        inside = true;
        message = point.message;
        step = point.step;
        console.log("inside");
        break;
      }
    }

    setIsInGeofence(inside);

    // Only send notification if the state has changed and it's different from the last notification
    if (notificationRef.current !== inside) {
      notificationRef.current = inside;

      await sendNotification(inside ? message : "Have a safe travel");
      if (step) {
        //last geofence
      }
      if (!inside) {
        setTrigger((prev) => !prev);
      }
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
