import * as Localization from 'expo-localization';
import { create } from 'zustand';

import i18n, { LANGUAGE_KEY } from '@/i18n';
import { storage } from '@/lib/storage';

type LanguageOption = 'zh' | 'en' | 'system';

interface LanguageState {
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
}

function resolveSystemLanguage(): 'zh' | 'en' {
  const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'en';
  return deviceLang.startsWith('zh') ? 'zh' : 'en';
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: (storage.getItem<LanguageOption>(LANGUAGE_KEY)) ?? 'system',

  setLanguage: (lang) => {
    storage.setItem(LANGUAGE_KEY, lang);
    const resolved = lang === 'system' ? resolveSystemLanguage() : lang;
    i18n.changeLanguage(resolved);
    set({ language: lang });
  },
}));
