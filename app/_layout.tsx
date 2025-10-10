import { COLORS } from "@/constants/theme";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { toastConfig } from "@/components/ui/ToastConfig";
import { AuthProvider } from "@/context/AuthContext";
import RouteGuardLayout from "@/components/RouteGuardLayout";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: COLORS.background }}
              onLayout={onLayoutRootView}
            >
              <StatusBar style="light" />
              <RouteGuardLayout />
              <Toast config={toastConfig} />
            </SafeAreaView>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
