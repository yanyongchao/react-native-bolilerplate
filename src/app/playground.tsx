import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import { GlassView } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useRef, useState } from 'react';
import { Alert, Platform, StyleSheet, useColorScheme } from 'react-native';
import { createMMKV } from 'react-native-mmkv';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Rect } from 'react-native-svg';

import AccountIcon from '@/assets/svg-icon/account.svg';
import { BottomTabInset, Colors, Spacing } from '@/constants/theme';
import { Pressable, ScrollView, Text, View } from '@/tw';

const storage = createMMKV();

const MODULES = [
  'SVG (react-native-svg)',
  'SVG Transformer',
  'Camera (expo-camera)',
  'Clipboard (expo-clipboard)',
  'Haptics (expo-haptics)',
  'ImagePicker (expo-image-picker)',
  'BlurView (expo-blur)',
  'GlassView (expo-glass-effect)',
  'LinearGradient (expo-linear-gradient)',
  'SecureStore (expo-secure-store)',
  'Localization (expo-localization)',
  'MMKV (react-native-mmkv)',
  'KeyboardController',
  'BottomSheet (@gorhom)',
  'FlashList (@shopify)',
] as const;

function SectionTitle({ children }: { children: string }) {
  return (
    <Text className="text-lg font-bold mt-4 mb-2 text-neutral-900 dark:text-neutral-100">
      {children}
    </Text>
  );
}

function DemoButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      className="bg-blue-500 active:bg-blue-600 rounded-lg px-4 py-2.5 mr-2 mb-2"
      onPress={onPress}>
      <Text className="text-white text-sm font-medium">{label}</Text>
    </Pressable>
  );
}

export default function PlaygroundScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const [log, setLog] = useState<string[]>([]);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 30));
  }, []);

  // --- Handlers ---

  const handleClipboard = async () => {
    await Clipboard.setStringAsync('Hello from Playground!');
    const text = await Clipboard.getStringAsync();
    addLog(`Clipboard: "${text}"`);
  };

  const handleHaptics = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    addLog('Haptics: medium impact triggered');
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.5,
    });
    if (result.canceled) {
      addLog('ImagePicker: canceled');
    } else {
      addLog(`ImagePicker: selected ${result.assets[0].uri.slice(-30)}`);
    }
  };

  const handleSecureStore = async () => {
    const key = 'playground_test';
    await SecureStore.setItemAsync(key, 'secret_value_123');
    const value = await SecureStore.getItemAsync(key);
    addLog(`SecureStore: stored & read "${value}"`);
    await SecureStore.deleteItemAsync(key);
  };

  const handleLocalization = () => {
    const locales = Localization.getLocales();
    addLog(`Locale: ${locales[0]?.languageTag ?? 'unknown'}, Calendar: ${Localization.getCalendars()[0]?.calendar ?? 'unknown'}`);
  };

  const handleMMKV = () => {
    storage.set('playground.test', 'mmkv_works');
    const value = storage.getString('playground.test');
    addLog(`MMKV: stored & read "${value}"`);
    storage.remove('playground.test');
  };

  const handleCamera = async () => {
    if (!cameraPermission?.granted) {
      const perm = await requestCameraPermission();
      if (!perm.granted) {
        Alert.alert('权限不足', '需要相机权限才能预览');
        return;
      }
    }
    setShowCamera((v) => !v);
    addLog(showCamera ? 'Camera: hidden' : 'Camera: shown');
  };

  const handleBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    addLog('BottomSheet: expanded');
  }, [addLog]);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingBottom: BottomTabInset + Spacing.three }}
      className="bg-white dark:bg-black">
          <ScrollView className="flex-1 px-4">
            <Text className="text-2xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">
              🧪 Playground
            </Text>
            <Text className="text-sm text-neutral-500 mb-2">
              原生模块验证页 · {MODULES.length} 个模块
            </Text>

            {/* SVG */}
            <SectionTitle>SVG</SectionTitle>
            <View className="flex-row items-center gap-4">
              <AccountIcon width={48} height={48} fill={colors.text} />
              <Svg width={48} height={48} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="40" fill="#4F46E5" />
                <Rect x="30" y="30" width="40" height="40" rx="8" fill="#fff" opacity={0.5} />
              </Svg>
              <Text className="text-sm text-neutral-500">react-native-svg ✓</Text>
            </View>

            {/* Actions */}
            <SectionTitle>功能测试</SectionTitle>
            <View className="flex-row flex-wrap">
              <DemoButton label="📋 Clipboard" onPress={handleClipboard} />
              <DemoButton label="📳 Haptics" onPress={handleHaptics} />
              <DemoButton label="🖼 ImagePicker" onPress={handleImagePicker} />
              <DemoButton label="🔐 SecureStore" onPress={handleSecureStore} />
              <DemoButton label="🌍 Localization" onPress={handleLocalization} />
              <DemoButton label="💾 MMKV" onPress={handleMMKV} />
              <DemoButton label="📷 Camera" onPress={handleCamera} />
              <DemoButton label="📄 BottomSheet" onPress={handleBottomSheet} />
            </View>

            {/* Camera Preview */}
            {showCamera && (
              <View className="h-48 rounded-xl overflow-hidden mt-2 mb-2">
                <CameraView style={StyleSheet.absoluteFill} facing="back" />
              </View>
            )}

            {/* LinearGradient */}
            <SectionTitle>LinearGradient</SectionTitle>
            <LinearGradient
              colors={['#4F46E5', '#7C3AED', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
              <Text className="text-white font-bold">expo-linear-gradient ✓</Text>
            </LinearGradient>

            {/* BlurView & GlassView */}
            <SectionTitle>Blur & Glass</SectionTitle>
            <View className="flex-row gap-3">
              <View className="flex-1 h-20 rounded-xl overflow-hidden bg-blue-200 dark:bg-blue-800 items-center justify-center">
                <BlurView intensity={40} style={StyleSheet.absoluteFill} />
                <Text className="text-sm font-medium z-10 text-neutral-900 dark:text-white">BlurView ✓</Text>
              </View>
              {Platform.OS === 'ios' && (
                <View className="flex-1 h-20 rounded-xl overflow-hidden bg-purple-200 dark:bg-purple-800 items-center justify-center">
                  <GlassView style={StyleSheet.absoluteFill} />
                  <Text className="text-sm font-medium z-10 text-neutral-900 dark:text-white">GlassView ✓</Text>
                </View>
              )}
            </View>

            {/* FlashList */}
            <SectionTitle>FlashList</SectionTitle>
            <View style={{ height: 120 }}>
              <FlashList
                data={Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)}
                horizontal
                renderItem={({ item }) => (
                  <View className="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-4 py-3 mr-2 justify-center">
                    <Text className="text-sm text-neutral-700 dark:text-neutral-300">{item}</Text>
                  </View>
                )}
              />
            </View>

            {/* Log */}
            <SectionTitle>日志输出</SectionTitle>
            <View className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-3 mb-6 min-h-25">
              {log.length === 0 ? (
                <Text className="text-sm text-neutral-400">点击上方按钮查看输出...</Text>
              ) : (
                log.map((l, i) => (
                  <Text key={i} className="text-xs text-neutral-600 dark:text-neutral-400 mb-0.5">
                    {l}
                  </Text>
                ))
              )}
            </View>
          </ScrollView>

          {/* BottomSheet */}
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['25%']}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: colors.backgroundElement }}>
            <BottomSheetView style={{ padding: 20, alignItems: 'center' }}>
              <Text className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                @gorhom/bottom-sheet ✓
              </Text>
              <Text className="text-sm text-neutral-500 mt-1">下拉关闭</Text>
            </BottomSheetView>
          </BottomSheet>
    </SafeAreaView>
  );
}
