import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { useColorScheme } from 'react-native';

import { ExternalLink } from './external-link';

import { Colors, MaxContentWidth } from '@/constants/theme';
import { Pressable, Text, View } from '@/tw';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
          <TabTrigger name="playground" href="/playground" asChild>
            <TabButton>Playground</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      className="active:opacity-70">
      <View
        className={`py-1 px-3 rounded-2 ${
          isFocused ? 'bg-surface-active' : 'bg-surface'
        }`}>
        <Text
          className={`text-sm leading-5 font-medium ${
            isFocused ? 'text-foreground' : 'text-muted-foreground'
          }`}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View
      {...props}
      className="absolute w-full p-4 justify-center items-center flex-row">
      <View className="py-2 px-8 rounded-4 flex-row items-center grow gap-2 bg-surface" style={{ maxWidth: MaxContentWidth }}>
        <Text className="text-sm font-bold mr-auto">
          Expo Starter
        </Text>

        {props.children}

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable className="flex-row justify-center items-center gap-1 ml-4">
            <Text className="text-sm leading-7.5">Docs</Text>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </View>
    </View>
  );
}
