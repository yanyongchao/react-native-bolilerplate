import { useRouter } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArrowLeftIcon from '@/assets/svg-icon/arrow-left.svg';
import { cn } from '@/lib/utils';
import { View, Text } from '@/tw';

interface HeaderProps {
  /** 页面标题，居中显示 */
  title?: string;
  /** 左侧自定义内容，传入后替换默认返回按钮 */
  headerLeft?: React.ReactNode;
  /** 右侧自定义内容（操作按钮区） */
  headerRight?: React.ReactNode;
  /** 是否显示返回按钮，默认 true */
  showBack?: boolean;
  /** 自定义返回行为 */
  onBack?: () => void;
  /** 容器 className */
  className?: string;
  /** 是否透明背景（用于沉浸式页面） */
  transparent?: boolean;
  /** 是否由 Header 自己处理顶部安全区域，默认 true；外层已有 SafeAreaView 时传 false */
  useSafeArea?: boolean;
}

export function Header({
  title,
  headerLeft,
  headerRight,
  showBack = true,
  onBack,
  className,
  transparent = false,
  useSafeArea = true,
}: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View
      className={cn('w-full', !transparent && 'bg-background', className)}
      // style={useSafeArea ? { paddingTop: Platform.OS === 'web' ? 14 : insets.top } : undefined}
    >
      <View className="flex-row items-center justify-between px-4 py-3.5">
        {/* 左侧区域：返回按钮或自定义内容 */}
        <View className="min-w-6 items-start">
          {headerLeft ??
            (showBack ? (
              <View
                className="h-6 w-6 items-center justify-center"
                onStartShouldSetResponder={() => true}
                onResponderRelease={handleBack}
              >
                <ArrowLeftIcon width={24} height={24} />
              </View>
            ) : (
              <View className="h-6 w-6" />
            ))}
        </View>

        {/* 中间标题 */}
        {title ? (
          <View className="absolute inset-x-16 items-center">
            <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
              {title}
            </Text>
          </View>
        ) : null}

        {/* 右侧操作区 */}
        <View className="min-w-8.5 items-end">{headerRight ?? <View className="h-6 w-8.5" />}</View>
      </View>
    </View>
  );
}
