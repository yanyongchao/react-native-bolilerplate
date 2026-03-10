import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { ScrollView, Text } from '@/tw';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="justify-center flex-row">
      <SafeAreaView
        className="flex-1 px-6 items-center gap-3"
        style={{ paddingBottom: BottomTabInset + Spacing.three, maxWidth: MaxContentWidth }}>
        {
          new Array(200).fill(0).map((_, i) => (
            <Text key={i} className="text-2xl">
              Hello, Expo Router! {i + 1}
            </Text>
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}
