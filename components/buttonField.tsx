import React from 'react';
import { 
  TouchableOpacity,  // Button component that responds to touch events
  Text,               // Text component for button label
  StyleSheet,         // StyleSheet for defining component styles
  ActivityIndicator   // Spinner component to indicate loading state
} from 'react-native';
import { ButtonProps } from './types';
import { primaryColour }  from '../constants/Colors'
// Define and export the `CustomButton` function directly
export default function CustomButton({ 
  onPress,        // Function to handle button press events
  title,          // Text displayed inside the button
  variant = 'primary', // Button style variant ('primary' or 'link')
  style = {},     // Additional styles passed as a prop
  disabled = false, // If true, button is disabled and cannot be pressed
  loading = false  // If true, shows a loading spinner instead of text
}: ButtonProps) {
  // Define button styles dynamically based on the `variant` and `disabled` props
  const buttonStyles = [
    styles.button,
    variant === 'link' && styles.linkButton, // Style for 'link' variant
    disabled && styles.disabledButton,       // Style for disabled button
    style                                    // Additional styles passed in props
  ];

  // Define text styles dynamically based on `variant` and `disabled` props
  const textStyles = [
    styles.text,
    variant === 'link' && styles.linkText,   // Text style for 'link' variant
    disabled && styles.disabledText          // Text style for disabled button
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      onPress={onPress}
      disabled={disabled || loading} // Disable if loading or explicitly disabled
    >
      {/* Display loading spinner if `loading` is true; otherwise, show button text */}
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#fff' : '#'} // Spinner color based on variant
        />
      ) : (
        <Text style={textStyles}>{title}</Text> // Display button title text
      )}
    </TouchableOpacity>
  );
}

// Define styles for CustomButton component
const styles = StyleSheet.create({
  button: {
    backgroundColor: primaryColour,    // Default button background color
    height: 48,                    // Button height
    borderRadius: 8,               // Rounded corners for button
    justifyContent: 'center',      // Center text or spinner vertically
    alignItems: 'center',          // Center text or spinner horizontally
  },
  linkButton: {
    backgroundColor: 'transparent', // Transparent background for 'link' variant
    height: 'auto',                 // Dynamic height for link button
  },
  disabledButton: {
    backgroundColor: '#cccccc',     // Background color for disabled button
    opacity: 0.7,                   // Lower opacity to indicate disabled state
  },
  text: {
    color: '#fff',                  // Default text color
    fontSize: 16,                   // Text font size
    fontWeight: '600',              // Font weight for primary button text
  },
  linkText: {
    color: primaryColour,               // Text color for 'link' variant
    fontSize: 14,                   // Font size for link text
    fontWeight: 'normal',           // Normal font weight for link text
  },
  disabledText: {
    color: '#666666',               // Text color for disabled button
  },
});
