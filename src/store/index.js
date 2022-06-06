import create from 'zustand/vanilla';

import game from './game';
import session from './session';
import settings from './settings';

export const store = create(function mutator(set) {
  return {
    game: game(set),
    session: session(set),
    settings: settings(set),
  };
});
