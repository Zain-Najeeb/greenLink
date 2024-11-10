import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { ButtonField, InputField, FormLayout, CustomSnackBar } from "@/components/index";

import useApiCall from "@/hooks/useApiCall";
import createUser from "@/api/users/signup";
import { primaryColour } from "@/constants/Colors";
import { useSession } from "@/hooks/useSession";
import loginUser from "@/api/users/signin";
import { useSnackbar } from "@/hooks/useSnackbar";

const favicon = require("@/assets/images/favicon.png");

interface FormErrors {
  email?: string;
  password?: string;
}

const SignInScreen: React.FC = () => {
  const { execute, data, error, isLoading, isSuccess, isError, reset } = useApiCall(loginUser);
  const { newSession } = useSession();
  const { showSnackbar } = useSnackbar();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
      showSnackbar("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      showSnackbar("Please enter a valid email");
    }

    if (!password) {
      newErrors.password = "Password is required";
      showSnackbar("Password is required");
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      showSnackbar("Password must be at least 6 characters");
    }

    if (!email && !password) {
      showSnackbar("Invalid Sign In");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await execute({ email, password });
      if (data.data) {
        newSession(data.data);
      }
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
      <InputField
        label="Password"
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
          if (errors.password) {
            setErrors((prev) => ({ ...prev, password: undefined }));
          }
        }}
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password}
      />
      <ButtonField
        title="Sign In"
        onPress={handleSignIn}
        style={styles.signInButton}
        loading={loading}
        disabled={loading}
      />
      <Link href="./forgotPassword" asChild>
        <ButtonField
          title="Forgot password?"
          onPress={() => console.log("Forgot password pressed")}
          variant="link"
          style={styles.forgotPassword}
        />
      </Link>
      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>or</Text>
      </View>
      <Link href="/(auth)/users/signUp" asChild>
        <ButtonField
          title="Sign up"
          onPress={() => console.log("Sign up pressed")}
          variant="link"
        />
      </Link>
    </FormLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  signInButton: {
    marginTop: 20,
  },
  forgotPassword: {
    alignItems: "center",
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

export default SignInScreen;
