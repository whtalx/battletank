import create from 'zustand';

import settings from './settings';

export const useStore = create(function mutator(set) {
  return {
    ...settings(set),
  };
});
