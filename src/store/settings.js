import produce from 'immer';

import { getFromLocalStorage, isTouchDevice } from '../utils';

import { SETTINGS } from '../constants';

export default function settings(set) {
  return {
    ...getFromLocalStorage({ ...SETTINGS.DEFAULT, showOverlay: isTouchDevice }),
    saveSettings(state) {
      return set(produce(state));
    },
  };
}
