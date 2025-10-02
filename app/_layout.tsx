import { COLORS } from "@/constants/theme";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.background }}
            onLayout={onLayoutRootView}
          >
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
