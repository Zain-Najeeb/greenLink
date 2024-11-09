import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { ButtonField, InputField, FormLayout } from "@/components/index";
import { placeholderTextColor } from "@/constants/Colors";
import { primaryColour } from "@/constants/Colors";
const favicon = require("@/assets/images/favicon.png");
interface FormErrors {
  email?: string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
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
    } catch (error) {
      //Error
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={primaryColour} />
    </View>
  )
  : (
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
    backgroundColor: "#fff",
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
