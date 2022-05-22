import create from 'zustand/vanilla';

import game from './game';
import settings from './settings';

export const store = create(function mutator(set) {
  return {
    game: game(set),
    settings: settings(set),
  };
});
