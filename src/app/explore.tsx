import { SymbolView } from 'expo-symbols';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
          <Text className="text-[32px] leading-11 font-semibold">{t('explore.title')}</Text>
          <Text className="text-center text-muted-foreground">
            {t('explore.subtitle')}
          </Text>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable className="active:opacity-70">
              <View className="flex-row px-6 py-2 rounded-4xl justify-center gap-1 items-center bg-surface">
                <Text className="text-sm leading-7.5">{t('explore.docs')}</Text>
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
          <Collapsible title={t('explore.fileRouting')}>
            <Text className="text-sm leading-5 font-medium">
              {t('explore.fileRoutingDesc')}
            </Text>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <Text className="text-sm leading-7.5 text-link">{t('explore.learnMore')}</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title={t('explore.platformSupport')}>
            <View className="items-center bg-surface">
              <Text className="text-sm leading-5 font-medium">
                {t('explore.platformSupportDesc')}
                <Text className="text-sm leading-5 font-bold">{t('explore.platformSupportKey')}</Text> in the terminal running this
                project.
              </Text>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                className="w-full rounded-4 mt-2"
                style={{ aspectRatio: 296 / 171 }}
              />
            </View>
          </Collapsible>

          <Collapsible title={t('explore.images')}>
            <Text className="text-sm leading-5 font-medium">
              {t('explore.imagesDesc')}
            </Text>
            <Image
              source={require('@/assets/images/react-logo.png')}
              className="self-center"
              style={{ width: 100, height: 100 }}
            />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <Text className="text-sm leading-7.5 text-link">{t('explore.learnMore')}</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title={t('explore.themeComponents')}>
            <Text className="text-sm leading-5 font-medium">
              {t('explore.themeComponentsDesc')}
            </Text>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <Text className="text-sm leading-7.5 text-link">{t('explore.learnMore')}</Text>
            </ExternalLink>
          </Collapsible>

          <Collapsible title={t('explore.animations')}>
            <Text className="text-sm leading-5 font-medium">
              {t('explore.animationsDesc')}
            </Text>
          </Collapsible>
        </View>
      </View>
    </ScrollView>
  );
}
