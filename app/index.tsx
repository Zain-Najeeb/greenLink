import React from "react";
import { Redirect } from "expo-router";
import { useSession } from "@/hooks/useSession";

export default function Index() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    //loading spiner
    return null;
  }

  return session ? (
    <Redirect href="./(app)/dashboard/home" />
  ) : (
    <Redirect href="./(auth)/users/signIn" />
  );
}
