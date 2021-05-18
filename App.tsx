/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Suspense} from 'react';
import i18next, {Resource as I18NResource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './src/AppNavigator';
import {i18nextLanguageDetector} from './src/i18n';
import {LanguageSelector} from './src/modules';

export const i18Resources: I18NResource = {
  en: {
    translation: require('./src/i18n/dictionaries/en.json'),
  },
  ro: {
    translation: require('./src/i18n/dictionaries/ro.json'),
  },
  ru: {
    translation: require('./src/i18n/dictionaries/ru.json'),
  },
};

i18next
  .use(initReactI18next)
  .use(i18nextLanguageDetector('en', Object.keys(i18Resources)))
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: i18Resources,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

i18next.on('initialized', function (options) {
  // const fallbackLang = 'en';
  // OneSignal.sendTag('language', options.lng ?? fallbackLang);
});

i18next.on('languageChanged', function (lng) {
  // OneSignal.sendTag('language', lng);
});

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={null}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <LanguageSelector
          items={[
            {label: 'English', caption: 'English', value: 'en'},
            {label: 'Русский', caption: 'Russian', value: 'ru'},
            {label: 'Română', caption: 'Romanian', value: 'ro'},
          ]}
        />
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
