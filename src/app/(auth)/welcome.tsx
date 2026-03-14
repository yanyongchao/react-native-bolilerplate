import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { SafeAreaView } from '@/tw';
import { View, Text, Pressable } from '@/tw';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6 gap-6">
        <Text className="text-3xl font-bold text-foreground">{t('auth.welcome.title')}</Text>
        <Text className="text-base text-muted-foreground text-center">{t('auth.welcome.subtitle')}</Text>

        <View className="w-full gap-3 mt-8">
          <Pressable
            className="w-full items-center rounded-xl bg-primary py-4 active:opacity-80"
            onPress={() => router.push('/login')}
          >
            <Text className="text-base font-semibold text-primary-foreground">{t('auth.welcome.login')}</Text>
          </Pressable>

          <Pressable
            className="w-full items-center rounded-xl bg-secondary py-4 active:opacity-80"
            onPress={() => router.push('/register')}
          >
            <Text className="text-base font-semibold text-secondary-foreground">
              {t('auth.welcome.register')}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
