import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { storage } from "@/lib/storage";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

const LANGUAGE_KEY = "app.language";

function getInitialLanguage(): string {
  const saved = storage.getItem<string>(LANGUAGE_KEY);
  if (saved && saved !== "system") return saved;

  const deviceLang = Localization.getLocales()[0]?.languageCode ?? "en";
  return deviceLang.startsWith("zh") ? "zh" : "en";
}

const i18nInitPromise = i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export { i18nInitPromise, LANGUAGE_KEY };
export default i18n;
