import React, { useEffect } from "react";
import SignInScreen from "./users/signIn"; // Adjust path as necessary
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();
  useEffect(() => {
    // Delay navigation slightly to ensure the layout is fully mounted
    setTimeout(() => {
      router.replace("/users/signIn"); // Replace with your desired route
    }, 100); // Delay the navigation for 100ms
  }, [router]);
  return null;
}
