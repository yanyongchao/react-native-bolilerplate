import { i18nInitPromise } from '@/i18n';
import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// TODO: 替换为真实的 auth store 逻辑
const useIsAuthenticated = () => false;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useIsAuthenticated();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await i18nInitPromise;
      await SplashScreen.hideAsync();
      setIsReady(true);
    };

    void init();
  }, []);

  if (!isReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" redirect={isAuthenticated} />
                <Stack.Screen name="(tabs)" redirect={!isAuthenticated} />
              </Stack>
            </ThemeProvider>
          </QueryClientProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
