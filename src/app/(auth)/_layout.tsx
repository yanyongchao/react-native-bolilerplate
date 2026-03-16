import { Stack, router } from 'expo-router';
import { Platform } from 'react-native';
import { Pressable } from '@/tw';
import ArrowLeftIcon from '@/assets/svg-icon/arrow-left.svg';
import { useTheme } from '@/hooks/use-theme';

export default function AuthLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: Platform.OS === 'android' ? 'ios_from_right' : 'slide_from_right',
        title: '',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <Pressable onPress={() => router.back()}>
              <ArrowLeftIcon width={24} height={24} />
            </Pressable>
          ) : null,
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="verify-2fa" />
      <Stack.Screen name="verify-email" />
      <Stack.Screen name="invite-code" />
    </Stack>
  );
}
