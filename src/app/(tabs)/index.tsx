import { useTranslation } from 'react-i18next';

import AccountIcon from '@/assets/svg-icon/account.svg';
import { MaxContentWidth } from '@/constants/theme';
import { SafeAreaView, ScrollView, Text, View } from '@/tw';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="items-center px-6">
        <View className="w-full items-center" style={{ maxWidth: MaxContentWidth }}>
          <AccountIcon width={80} height={80} fill="#333" />
          {new Array(200).fill(0).map((_, i) => (
            <Text key={i} className="text-2xl text-foreground">
              {t('home.greeting', { index: i + 1 })}
            </Text>
          ))}
          <Text>33</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
