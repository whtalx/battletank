import produce from 'immer';

import { getFromLocalStorage } from '../utils/localStorage';
import { isTouchDevice } from '../utils/bool';

import SETTINGS from '../constants/settings';

export default function settings(set) {
  return {
    ...getFromLocalStorage({ ...SETTINGS.DEFAULT, showOverlay: isTouchDevice }),
    saveSettings(state) {
      return set(produce(state));
    },
  };
}
