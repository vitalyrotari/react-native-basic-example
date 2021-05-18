import React, {useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {NavigationStack} from '../enums';
import {rootState} from '../atoms';

const SplashScreen = () => {
  const setRoot = useSetRecoilState(rootState);

  useEffect(() => {
    BackgroundTimer.setTimeout(() => {
      setRoot(NavigationStack.Auth);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator/>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
