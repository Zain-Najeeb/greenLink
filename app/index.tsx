import React from "react";
import SignUpScreen from "./(auth)/users/signUp";
import { Redirect } from "expo-router";
export default function Index() {
  return <Redirect href="/(auth)/users/signIn" />;
}
