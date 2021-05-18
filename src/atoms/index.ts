import {atom} from 'recoil';
import {NavigationStack} from '../enums';

export const rootState = atom<NavigationStack>({
  key: 'rootState',
  default: NavigationStack.Splash,
});

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});

export const langSelectorState = atom<boolean>({
  key: 'langSelector',
  default: false,
});
