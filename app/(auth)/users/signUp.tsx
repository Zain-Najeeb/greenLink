import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  ButtonField,
  InputField,
  FormLayout,
  CustomSnackBar,
} from "@/components/index";
import useApiCall from "@/hooks/useApiCall";
import createUser from "@/api/users/signup";
import { useSession } from "@/hooks/useSession";
import { useSnackbar } from "@/hooks/useSnackbar";
import { primaryColour } from "@/constants/Colors";

const favicon = require("@/assets/images/favicon.png");

interface FormErrors {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUpScreen: React.FC = () => {
  const { execute } = useApiCall(createUser);
  const { newSession } = useSession();
  const { showSnackbar } = useSnackbar();

  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullname) {
      newErrors.fullname = "Full name is required";
      showSnackbar("Full name is required");
    }
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
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      showSnackbar("Passwords do not match");
    }

    if (!fullname && !email && !password) {
      showSnackbar("Invalid Sign Up");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const options = {
        data: {
          full_name: fullname,
        },
      };

      const data = await execute({ email, password, options });
      if (data.data) {
        newSession(data.data);
      }
    } catch (error) {
      // Error handling
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
        label="Full Name"
        value={fullname}
        onChangeText={(text: string) => {
          setFullName(text);
          if (errors.fullname)
            setErrors((prev) => ({ ...prev, fullname: undefined }));
        }}
        placeholder="Enter your full name"
        keyboardType="default"
        error={errors.fullname}
      />

      <InputField
        label="Email"
        value={email}
        onChangeText={(text: string) => {
          setEmail(text);
          if (errors.email)
            setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        placeholder="Enter your email address"
        keyboardType="email-address"
        error={errors.email}
      />

      <InputField
        label="Password"
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
          if (errors.password)
            setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password}
      />

      <InputField
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text: string) => {
          setConfirmPassword(text);
          if (errors.confirmPassword)
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }}
        placeholder="Confirm your password"
        secureTextEntry
        error={errors.confirmPassword}
      />

      <ButtonField
        title="Sign Up"
        onPress={handleSignUp}
        style={styles.signUpButton}
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
  signUpButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default SignUpScreen;
