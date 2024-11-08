import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { User } from "@/types/users";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const segments = useSegments();
  console.log(segments[0]);

  useEffect(() => {
    const checkSession = async () => {
      const session = await AsyncStorage.getItem("supabase_session");
      if (session) {
        console.log("Session Is here");
      } else {
        console.log("no session");
      }
    };
    checkSession();
  }, []);
  //   useProtectedRoute(user);

  //   const authContext: AuthContextType = {
  //     signIn: (userData: User) => {
  //       setUser(userData);
  //     },
  //     signOut: () => {
  //       setUser(null);
  //     },
  //     user,
  //     isLoading,
  //   };

  return (
    <Slot />
    // <AuthContext.Provider value={authContext}>
    //   <Slot />
    // </AuthContext.Provider>
  );
}
