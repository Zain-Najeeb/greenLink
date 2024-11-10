import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { ButtonField, InputField, FormLayout, CustomSnackBar } from "@/components/index";
import { placeholderTextColor } from "@/constants/Colors";
import { primaryColour } from "@/constants/Colors";
import { useSnackbar } from "@/hooks/useSnackbar";
const favicon = require("@/assets/images/favicon.png");

interface FormErrors {
  email?: string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const {showSnackbar} = useSnackbar()
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
      showSnackbar("Please Enter an Email");
     
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      showSnackbar("Please Enter a Valid Email");
     
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      setSnackbarMessage("Verification email sent!");
      // setSnackbarVisible(true); // Show success message in snackbar
      showSnackbar("Email Sent", );
    } catch (error) {
      // Handle error (if needed)
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={primaryColour} />
    </View>
  ) : (
    <FormLayout>
      <Image source={favicon} style={styles.logo} />
      <InputField
        label="Email"
        value={email}
        onChangeText={(text: string) => {
          setEmail(text);
          if (errors.email) {
            setErrors((prev) => ({ ...prev, email: undefined }));
          }
        }}
        placeholder="Enter your email"
        keyboardType="email-address"
        error={errors.email}
      />
      <ButtonField
        title="Send Verification Email"
        onPress={handleForgotPassword}
        style={styles.sendButton}
        loading={loading}
        disabled={loading}
      />
    

    </FormLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  sendButton: {
    marginTop: 20,
  },
  dividerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  dividerText: {
    color: "#666",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default ForgotPassword;
