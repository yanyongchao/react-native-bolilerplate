import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Header } from '@/components/ui/header';
import { View, Text, Pressable } from '@/tw';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <Header title={t('auth.verifyEmail.title')} />
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-lg font-semibold text-foreground">{t('auth.verifyEmail.title')}</Text>
        <Text className="text-muted-foreground text-center">{t('auth.verifyEmail.subtitle')}</Text>

        <Pressable
          className="w-full items-center rounded-xl bg-primary py-4 mt-8 active:opacity-80"
          onPress={() => router.push('/invite-code')}
        >
          <Text className="text-base font-semibold text-primary-foreground">{t('common.confirm')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
