import React, { useState, MutableRefObject } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { placeholderTextColor } from "@/constants/Colors";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSnackbar } from "@/hooks/useSnackbar";

type LocationAutocompleteProps = {
  placeholder: string;
  value: MutableRefObject<string>;
  maxResults?: number; // New prop to control max results
  minSearchLength?: number; // New prop to control when search begins
};

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  placeholder,
  value,
  maxResults = 5, // Default to 5 results
  minSearchLength = 3, // Default to start searching after 3 characters
}) => {
  const [inputValue, setInputValue] = useState(value.current || "");
  const { showSnackbar } = useSnackbar();

  const handleClear = () => {
    setInputValue("");
    value.current = "";
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          textInputProps={{
            placeholderTextColor: placeholderTextColor,
            style: styles.textInput,
            value: inputValue,
            onChangeText: (text) => {
              setInputValue(text);
              value.current = text;
            },
          }}
          minLength={minSearchLength} // Only start searching after minimum characters
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
            language: "en",
            components: "country:ca",
            strictbounds: true,
            location: "43.684980,-79.7626",
            radius: 15000,
            // Limit results returned by Google
            maxResults: maxResults,
          }}
          onPress={(data, details = null) => {
            if (details?.address_components) {
              const isBrampton = details.address_components.some(
                (component) =>
                  component.long_name === "Brampton" &&
                  component.types.includes("locality")
              );
              if (isBrampton) {
                setInputValue(data.description);
                value.current = data.description;
              } else {
                showSnackbar("Please choose a location within Brampton");
              }
            }
          }}
          styles={{
            powered: {
              display: "none",
            },
            container: {
              flex: 0,
              width: "100%",
            },
            textInput: {
              width: "100%",
            },
            listView: {
              width: "100%",
              maxHeight: 200, // Limit the height of the results list
            },
            row: {
              paddingVertical: 12, // Add some padding to make results more readable
            },
            description: {
              fontSize: 14, // Slightly smaller font size for results
            },
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          renderRow={(rowData) => {
            const mainText = rowData.structured_formatting.main_text;
            const secondaryText = rowData.structured_formatting.secondary_text;
            return (
              <View style={styles.resultRow}>
                <Text style={styles.mainText} numberOfLines={1}>
                  {mainText}
                </Text>
                <Text style={styles.secondaryText} numberOfLines={1}>
                  {secondaryText}
                </Text>
              </View>
            );
          }}
        />
        {inputValue && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <MaterialIcons name="cancel" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
  },
  inputWrapper: {
    position: "relative",
  },
  textInput: {
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: "#f8f8f8",
    width: "100%",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  resultRow: {
    padding: 10,
  },
  mainText: {
    fontSize: 14,
    fontWeight: "500",
  },
  secondaryText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});

export default LocationAutocomplete;
