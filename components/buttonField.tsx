import React, { forwardRef } from "react";
import {
  TouchableOpacity, // Button component that responds to touch events
  Text, // Text component for button label
  StyleSheet, // StyleSheet for defining component styles
  ActivityIndicator,
  View, // Spinner component to indicate loading state
} from "react-native";
import { ButtonProps } from "./types";
import { primaryColour } from "../constants/Colors";
import { Ref } from "react";
// Define and export the `CustomButton` function directly
const CustomButton = forwardRef(
  (
    {
      onPress,
      title,
      variant = "primary",
      style = {},
      disabled = false,
      loading = false,
      icon = null,
    }: ButtonProps,
    ref: Ref<TouchableOpacity>
  ) => {
    const buttonStyles = [
      styles.button,
      variant === "link" && styles.linkButton,
      disabled && styles.disabledButton,
      style,
    ];

    const textStyles = [
      styles.text,
      variant === "link" && styles.linkText,
      disabled && styles.disabledText,
    ];

    return (
      <TouchableOpacity
        ref={ref} // Attach the ref here
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator color={variant === "primary" ? "#fff" : "#000"} />
        ) : (
          <View>
            {icon && <View style={{ backgroundColor: "white" }}>{icon}</View>}
            <Text style={textStyles}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

export default CustomButton;

// Define styles for CustomButton component
const styles = StyleSheet.create({
  button: {
    backgroundColor: primaryColour, // Default button background color
    height: 48, // Button height
    borderRadius: 8, // Rounded corners for button
    justifyContent: "center", // Center text or spinner vertically
    alignItems: "center", // Center text or spinner horizontally
  },
  linkButton: {
    backgroundColor: "transparent", // Transparent background for 'link' variant
    height: "auto", // Dynamic height for link button
  },
  disabledButton: {
    backgroundColor: "#cccccc", // Background color for disabled button
    opacity: 0.7, // Lower opacity to indicate disabled state
  },
  text: {
    color: "#fff", // Default text color
    fontSize: 16, // Text font size
    fontWeight: "600", // Font weight for primary button text
  },
  linkText: {
    color: primaryColour, // Text color for 'link' variant
    fontSize: 14, // Font size for link text
    fontWeight: "normal", // Normal font weight for link text
  },
  disabledText: {
    color: "#666666", // Text color for disabled button
  },
});
