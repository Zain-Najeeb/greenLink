
import { getAddressFromCoordinates } from "./getCoords";
import { AddressInfo, AddressCoordinates,  NavigationResult} from "@/types/locationTypes";
export const getNavigationsteps = async (
  sourceAddress: string,
  destinationAddress: string
): Promise<NavigationResult> => {
  const RouteInfo: AddressCoordinates = {};
  const addresses: AddressInfo[] = [];

  const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    sourceAddress
  )}&destination=${encodeURIComponent(
    destinationAddress
  )}&mode=transit&transit_mode=bus&key=${
    process.env.EXPO_PUBLIC_GOOGLE_API_KEY
  }`;
  try {
    const response = await fetch(googleMapsUrl);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const steps = data.routes[0].legs[0].steps;
      let previousAddress: string | null = null;

      for (const step of steps) {
        if (step.travel_mode === "TRANSIT" && step.transit_details) {
          let departureAddress = await getAddressFromCoordinates(
            step.start_location.lat,
            step.start_location.lng
          );
          if ( RouteInfo[departureAddress]) {
            departureAddress = departureAddress.concat(" (BUS)")
          }

          RouteInfo[departureAddress] = {
            lat: step.start_location.lat,
            lng: step.start_location.lng,
            time: step.transit_details.departure_time.text, 
            type: 'BUS',
            distanceFromPrevious: previousAddress ? step.distance.text : '0 m'
          };
          addresses.push({
            type: "Get on",
            address: departureAddress,
          });
          previousAddress = departureAddress;

          const arrivalAddress = await getAddressFromCoordinates(
            step.end_location.lat,
            step.end_location.lng
          );
        
          RouteInfo[arrivalAddress] = {
            lat: step.end_location.lat,
            lng: step.end_location.lng,
            time: step.transit_details.arrival_time.text,
            type: 'BUS',
            distanceFromPrevious: step.transit_details.distance?.text || step.distance.text
          };
     
          addresses.push({
            type: "Get off",
            address: arrivalAddress,
          });
          previousAddress = arrivalAddress;

        } else if (step.travel_mode === "WALKING") {
          const walkToAddress = await getAddressFromCoordinates(
            step.end_location.lat,
            step.end_location.lng
          );
    
          RouteInfo[walkToAddress] = {
            lat: step.end_location.lat,
            lng: step.end_location.lng,
            time: step.duration.text,
            type: 'WALKING',
            distanceFromPrevious: step.distance.text
          };
        //   console.log("there")
          addresses.push({
            type: "Walk to",
            address: walkToAddress,
          });
          previousAddress = walkToAddress;
        }
      }
    }

    return { addresses, RouteInfo };
  } catch (error) {
    console.error("Error fetching directions:", error);
    return { addresses: [], RouteInfo: {} };
  
    };
}
