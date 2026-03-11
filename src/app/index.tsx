import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import AccountIcon from '@/assets/svg-icon/account.svg';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { ScrollView, Text } from '@/tw';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1" contentContainerClassName="justify-center flex-row">
      <SafeAreaView
        className="flex-1 px-6 items-center gap-3"
        style={{ paddingBottom: BottomTabInset + Spacing.three, maxWidth: MaxContentWidth }}>
        <AccountIcon width={80} height={80} fill="#333" />
        {
          new Array(200).fill(0).map((_, i) => (
            <Text key={i} className="text-2xl text-foreground">
              {t('home.greeting', { index: i + 1 })}
            </Text>
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}
