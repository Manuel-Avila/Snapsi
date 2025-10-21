import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "react-query";
import { useProfile } from "@/hooks/useProfile";

const protectedRoutes = ["(tabs)", "user"];

export default function RouteGuardLayout() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { getMyProfile } = useProfile();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const currentGroup = segments[0] as string;

    const inProtectedRoute = protectedRoutes.includes(currentGroup);

    if (!token && inProtectedRoute) {
      router.replace("/(auth)/login");
    } else if (token && currentGroup === "(auth)") {
      router.replace("/(tabs)/home");
    }
  }, [isLoading, token, segments]);

  useQuery(["myProfile"], getMyProfile, {
    enabled: !!token,
  });

  if (isLoading) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
