import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { primaryColour } from '@/constants/Colors';
import { InputProps } from './types';

// Define and export the `InputField` function directly
export default function InputField({ 
  label,            // Label text for the input field
  value,            // Current value of the input
  onChangeText,     // Callback to handle changes to the input
  placeholder,      // Placeholder text for the input field
  secureTextEntry = false, // If true, hides the input (useful for passwords)
  keyboardType = 'default', // Type of keyboard (e.g., 'numeric', 'email-address')
  autoCapitalize = 'none',  // Auto-capitalization behavior
  autoCorrect = false,      // If true, enables auto-correction
  error            // Error message to display if there's an issue with the input
}: InputProps) {
  return (
    <View style={styles.inputGroup}>
      {/* Label for the input field */}
      <Text style={styles.label}>{label}</Text>
      
      {/* TextInput component for user input */}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError // Apply error style if there's an error
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />

      {/* Display error text below the input if error is provided */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// Define styles for the InputField component
const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20, // Adds space between input fields
  },
  label: {
    fontSize: 16,        // Sets font size for label text
    marginBottom: 8,     // Adds space below label
    color: primaryColour,       // Label color
  },
  input: {
    height: 48,             // Input field height
    borderWidth: 1,         // Border width for input
    borderColor: '#ddd',    // Default border color
    borderRadius: 8,        // Rounds input corners
    paddingHorizontal: 12,  // Horizontal padding inside input
    fontSize: 16,           // Font size for input text
  },
  inputError: {
    borderColor: '#ff0000', // Border color when there's an error
  },
  errorText: {
    color: '#ff0000',       // Text color for error message
    fontSize: 12,           // Smaller font size for error text
    marginTop: 4,           // Adds space above error message
  },
});
