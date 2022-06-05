import createStore from 'zustand/vanilla';

import game from '../../store/game';

import { MESSAGES } from '../../constants';

const store = createStore(function mutator(set) {
  return game(set);
});

store.subscribe(function listener({ setGame, ...payload }) {
  self.postMessage({ type: MESSAGES.STORE_UPDATE, payload });
});

export function saveUpdates(updateState) {
  store.getState().setGame(updateState);
}
