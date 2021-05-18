import React, {useCallback} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {Translation} from 'react-i18next';
import {useSetRecoilState} from 'recoil';
import {NavigationStack} from '../enums';
import {rootState, langSelectorState} from '../atoms';

const LoginScreen = () => {
  const setRoot = useSetRecoilState(rootState);
  const setLangSelector = useSetRecoilState(langSelectorState);

  const handleLogin = useCallback(() => setRoot(NavigationStack.Main), []);
  const handleLanguage = useCallback(() => setLangSelector(true), []);

  return (
    <View style={styles.container}>
      <View>
        <Translation>{(t) => <Text>{t('hello')}</Text>}</Translation>
      </View>
      <Button onPress={handleLanguage} title="Select Language" />
      <Button onPress={handleLogin} title="Authentificate" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
