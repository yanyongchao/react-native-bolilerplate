import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { Collapsible } from '@/components/ui/collapsible';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Pressable, ScrollView, Text, View } from '@/tw';
import { Image } from '@/tw/image';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInset={insets}
      contentContainerClassName="flex-row justify-center"
      contentContainerStyle={contentPlatformStyle}>
      <View className="grow w-full" style={{ maxWidth: MaxContentWidth }}>
        <View className="gap-4 items-center px-6 py-16">
          <Text className="text-[32px] leading-11 font-semibold">Explore</Text>
          <Text className="text-center text-muted-foreground">
            This starter app includes example{'\n'}code to help you get started.
          </Text>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable className="active:opacity-70">
              <View className="flex-row px-6 py-2 rounded-4xl justify-center gap-1 items-center bg-surface">
                <Text className="text-sm leading-7.5">Expo documentation</Text>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </View>
            </Pressable>
          </ExternalLink>
        </View>

        <View className="px-6 gap-8 pt-4">
          <Collapsible title="File-based routing">
            <Text className="text-sm leading-5 font-medium">
              This app uses Expo Router for file-based routing. Just like Next.js, you can create a new file
              under the 
            </Text>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <Text className="text-sm leading-7.5 text-link">Learn more</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <View className="items-center bg-surface">
              <Text className="text-sm leading-5 font-medium">
                You can open this project on Android, iOS, and the web. To open the web version,
                press <Text className="text-sm leading-5 font-bold">w</Text> in the terminal running this
                project.
              </Text>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                className="w-full rounded-4 mt-2"
                style={{ aspectRatio: 296 / 171 }}
              />
            </View>
          </Collapsible>

          <Collapsible title="Images">
            <Text className="text-sm leading-5 font-medium">
              For static images, you can use the
            </Text>
            <Image
              source={require('@/assets/images/react-logo.png')}
              className="self-center"
              style={{ width: 100, height: 100 }}
            />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <Text className="text-sm leading-7.5 text-link">Learn more</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <Text className="text-sm leading-5 font-medium">
              This template has light and dark mode support. The
              <Text className="text-xs font-mono font-medium">useColorScheme()</Text> hook lets you inspect what the
              user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
            </Text>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <Text className="text-sm leading-7.5 text-link">Learn more</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <Text className="text-sm leading-5 font-medium">
              This template includes an example of an animated component. The
              <Text className="text-xs font-mono font-medium">src/components/ui/collapsible.tsx</Text> component uses the
              powerful <Text className="text-xs font-mono font-medium">react-native-reanimated</Text> library to
              animate opening this hint.
            </Text>
          </Collapsible>
        </View>
      </View>
    </ScrollView>
  );
}
