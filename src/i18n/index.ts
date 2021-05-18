import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-community/async-storage';
import {I18nManager} from 'react-native';
import i18next, {LanguageDetectorAsyncModule, Resource as I18NResource} from 'i18next';

i18next.on('languageChanged', function (lng) {
  AsyncStorage.setItem('@i18next-async-storage/language', lng).then();
});

function callFallbackIfFunc(fallback: any, callback: Function) {
  if (typeof fallback === 'function') {
    return fallback(callback);
  }
  return callback(fallback);
}

export function i18nextLanguageDetector(
  fallback: any,
  availableTags: string[],
): LanguageDetectorAsyncModule {
  return {
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async function (callback): Promise<void> {
      try {
        const language = await AsyncStorage.getItem(
          '@i18next-async-storage/language',
        );

        if (language) {
          callback(language);
          return;
        }

        const {languageTag, isRTL} =
          RNLocalize.findBestAvailableLanguage(availableTags) ?? {};

        if (languageTag) {
          I18nManager.forceRTL(isRTL as boolean);
          callback(languageTag);
          return;
        }
      } catch {}

      callFallbackIfFunc(fallback, callback);
    },
    cacheUserLanguage: async function (language) {
      try {
        await AsyncStorage.setItem(
          '@i18next-async-storage/user-language',
          language,
        );
      } catch {}
    },
  };
}
