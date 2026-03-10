import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';
import { Pressable, Text, View } from '@/tw';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const rotation = useSharedValue(0);

  const handlePress = () => {
    setIsOpen((value) => !value);
    rotation.value = withTiming(isOpen ? 0 : 90, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="bg-background">
      <Pressable
        className="flex-row items-center gap-2 active:opacity-70"
        onPress={handlePress}>
        <View className="size-6 rounded-xl justify-center items-center bg-surface">
          <Animated.View style={animatedStyle}>
            <SymbolView
              name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
              size={14}
              weight="bold"
              tintColor={theme.text}
            />
          </Animated.View>
        </View>

        <Text className="text-sm leading-5 font-medium">{title}</Text>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <View className="mt-4 rounded-3 ml-6 p-6 bg-surface">
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
}
