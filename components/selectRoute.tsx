import React, { useState, useRef } from "react";
import { AutoCompleteSearch } from "@/components";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  FlatList,
  Platform,
} from "react-native";
import { ButtonField } from "@/components";
import useApiCall from "@/hooks/useApiCall";
import { getNavigationsteps } from "@/api/maps/getNavigationSteps";
import { SelectRouteProps } from "./types";
import {
  RouteInformation,
  AddressInfo,
  AddressCoordinates,
} from "@/types/locationTypes";
import { useNavigation } from "@/hooks/useNavigation";

const keyboardVerticalOffset = Platform.OS === "ios" ? 300 : 0;

const SelectRoute: React.FC<SelectRouteProps> = ({ isLoading, setLoading }) => {
  const { execute } = useApiCall(getNavigationsteps);
  const { setActive } = useNavigation();
  const destinationRef = useRef<string>("");
  const sourceRef = useRef<string>("");
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [coordinatesDict, setCoordinatesDict] = useState<AddressCoordinates>(
    {}
  );

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await execute(sourceRef.current, destinationRef.current);
      console.log(result);
      if (result.success && result.data) {
        setAddresses(result.data.addresses);
        setCoordinatesDict(result.data.RouteInfo);

        setActive((prev) => !prev);
      } else {
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <AutoCompleteSearch
              placeholder="Select a Source"
              value={sourceRef}
            />
            <View style={styles.spacing} />
            <AutoCompleteSearch
              placeholder="Select a Destination"
              value={destinationRef}
            />
            <View style={styles.spacing} />
            <ButtonField
              title="Search"
              onPress={handleSearch}
              style={styles.searchButton}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          {/* {addresses.length > 0 && (
            <FlatList
              data={addresses}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.addressList}
              renderItem={({ item, index }) => {
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
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                );
              }}
            />
          )} */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  searchButton: {
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

export default SelectRoute;
