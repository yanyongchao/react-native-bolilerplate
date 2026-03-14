import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Header } from '@/components/ui/header';
import { View, Text, Pressable } from '@/tw';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <Header title={t('auth.register.title')} />
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-muted-foreground">{t('auth.register.emailPlaceholder')}</Text>
        <Text className="text-muted-foreground">{t('auth.register.passwordPlaceholder')}</Text>

        <Pressable
          className="w-full items-center rounded-xl bg-primary py-4 mt-8 active:opacity-80"
          onPress={() => router.push('/verify-email')}
        >
          <Text className="text-base font-semibold text-primary-foreground">{t('auth.register.submit')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
