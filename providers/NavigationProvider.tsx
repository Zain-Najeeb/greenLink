import React, { createContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, SetStateAction } from "react";
import { RouteInformation } from "@/types/locationTypes";
import { useMemo } from "react";

export interface NavigationProvider {
  source: string | null;
  destination: string | null;
  addresses: string[] | null;
  routeInfo: RouteInformation | null;
  step: number | null;
  busDistance: number | null;
  totalTime: number | null;
  totalDistance: number | null;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

// Default values for the context
export const NavigationProvider = createContext<NavigationProvider>({
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

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const source = useRef<string | null>(null);
  const destination = useRef<string | null>(null);
  const addresses = useMemo<string[] | null>(() => null, []);
  const routeInfo = useMemo<RouteInformation | null>(() => null, []);
  const [step, setStep] = useState<number | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const totalTime = useRef<number | null>(null);
  const totalDistance = useRef<number | null>(null);
  const busDistance = useRef<number | null>(null);

  return (
    <NavigationProvider.Provider
      value={{
        source: source.current,
        destination: destination.current,
        addresses: addresses ?? [],
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
    </NavigationProvider.Provider>
  );
};
