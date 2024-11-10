import React, { useState, MutableRefObject } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { placeholderTextColor } from "@/constants/Colors";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure to install this package
import { useSnackbar } from "@/hooks/useSnackbar";

type LocationAutocompleteProps = {
  placeholder: string;
  value: MutableRefObject<string>;
};

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  placeholder,
  value,
}) => {
  const [inputValue, setInputValue] = useState(value.current || "");

  const handleClear = () => {
    setInputValue(""); // Clear the input value
    value.current = ""; // Reset the value prop
  };
  const { showSnackbar } = useSnackbar();


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
              setInputValue(text); // Update input state on change
              value.current = text; // Update the value ref
            },
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
            language: "en",
            components: "country:ca",
            strictbounds: true,
            location: "43.684980,-79.7626",
            radius: 15000,
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
                // console.log("Location outside Brampton was selected");
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
            },
          }}
          fetchDetails={true}
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
    paddingRight: 40, // Space for the clear button
    backgroundColor: "#f8f8f8",
    width: "100%",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});

export default LocationAutocomplete;
