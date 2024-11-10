import React, { useState, useRef } from "react";
import { AutoCompleteSearch } from "@/components";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { ButtonField } from "@/components";
import useApiCall from "@/hooks/useApiCall";
import { getNavigationsteps } from "@/api/maps/getNavigationSteps";
import {
  RouteInformation,
  AddressInfo,
  AddressCoordinates,
} from "@/types/locationTypes";
import { Route } from "@/types/users";
import { insertRoute } from "@/api/route/insertRoute";
import { useSession } from "@/hooks/useSession";

const Navigate = () => {
  const { execute } = useApiCall(getNavigationsteps);
  const destinationRef = useRef<string>("");
  const sourceRef = useRef<string>("");
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [coordinatesDict, setCoordinatesDict] = useState<AddressCoordinates>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const { user } = useSession();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await execute(sourceRef.current, destinationRef.current);
      console.log(sourceRef.current, destinationRef.current);
      // console.log(result.success);
      if (result.success && result.data) {
        const route: Route = {
          source: sourceRef.current,
          destination: destinationRef.current,
        };
        await insertRoute(user?.id!, route);
        setAddresses(result.data.addresses);
        setCoordinatesDict(result.data.RouteInfo);
        // console.log(result.data.RouteInfo);
      } else {
        // something went wrong,,,
        console.error(result.error);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getCoordinatesForAddress = (
    address: string
  ): RouteInformation | null => {
    return coordinatesDict[address] || null;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <AutoCompleteSearch placeholder="Select a Source" value={sourceRef} />
          <View style={styles.spacing} />
          <AutoCompleteSearch
            placeholder="Select a Destination"
            value={destinationRef}
          />
        </View>

        <ButtonField
          title={loading ? "Loading..." : "Click Here to start Navigation"}
          onPress={handleSearch}
          variant="link"
          disabled={loading}
        />

        {addresses.length > 0 && (
          <View style={styles.addressList}>
            {addresses.map((item, index) => {
              const coords = getCoordinatesForAddress(item.address);
              return (
                <View key={index} style={styles.addressItem}>
                  <Text style={styles.addressText}>
                    {index + 1}. {item.type}: {item.address}
                  </Text>
                  {coords && (
                    <>
                      <Text style={styles.coordsText}>
                        Lat: {coords.lat.toFixed(6)}, Lng:{" "}
                        {coords.lng.toFixed(6)}
                      </Text>
                      <Text style={styles.coordsText}>
                        Time: {coords.time}, Distance From Previous Step:{" "}
                        {coords.distanceFromPrevious}
                      </Text>

                      {coords.departure && (
                        <Text style={styles.coordsText}>
                          Depart at {coords.departure}
                          {coords.distanceFromPrevious}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    marginTop: 20,
  },
  spacing: {
    height: 16,
  },
  addressList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  addressItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  addressText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  coordsText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
});

export default Navigate;
