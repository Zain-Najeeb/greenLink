import { useContext } from "react";
import { GeoFenceContext } from "@/providers/GeoFencingProvider";

export function useGeoFence() {
  const context = useContext(GeoFenceContext);
  if (context === undefined) {
    throw new Error("useGeoFence must be used within a GeofenceProvider");
  }
  return context;
}
