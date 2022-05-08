import produce from 'immer';

import { getFromLocalStorage } from '../utils';

import { SETTINGS } from '../constants';

export default function settings(set) {
  return {
    ...getFromLocalStorage({ settings: SETTINGS.DEFAULT }),
    saveSettings(state) {
      return set(produce(state));
    },
  };
}
