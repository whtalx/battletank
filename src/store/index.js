import create from 'zustand';

import game from './game';
import settings from './settings';

export const useStore = create(function mutator(set) {
  return {
    game: game(set),
    settings: settings(set),
  };
});
