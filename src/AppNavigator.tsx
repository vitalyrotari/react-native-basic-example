import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {useRecoilValue} from 'recoil';
import {rootState} from './atoms';
import {MainScreen, LoginScreen, SplashScreen} from './screens';

enableScreens();

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator
    initialRouteName="Main"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen name="Main" component={MainScreen} />
  </Stack.Navigator>
);

const navigationStacks = new Map<string, React.ComponentType<any>>([
  ['auth', AuthStack],
  ['main', MainStack],
]);

export const AppNavigator = () => {
  const root = useRecoilValue(rootState);
  const rootStack = navigationStacks.has(root)
    ? navigationStacks.get(root)
    : SplashScreen;

  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <Stack.Screen
        name="Root"
        component={rootStack as React.ComponentType<any>}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
