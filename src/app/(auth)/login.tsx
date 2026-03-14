import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Header } from '@/components/ui/header';
import { View, Text, Pressable, SafeAreaView, ScrollView } from '@/tw';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={t('auth.login.title')} useSafeArea={false} />
      <ScrollView className="flex-1" contentContainerClassName="px-6 gap-4 pb-6" overScrollMode="never">
        <Text className="text-muted-foreground">{t('auth.login.emailPlaceholder')}</Text>
        <Text className="text-muted-foreground">{t('auth.login.passwordPlaceholder')}</Text>
        <View className="w-full h-600">
          <Text className="text-sm text-right text-primary">xx</Text>
        </View>
        <Pressable
          className="w-full items-center rounded-xl bg-primary py-4 mt-8 active:opacity-80"
          onPress={() => router.push('/verify-2fa')}
        >
          <Text className="text-base font-semibold text-primary-foreground">{t('auth.login.submit')}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
