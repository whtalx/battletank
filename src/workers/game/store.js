import createStore from 'zustand/vanilla';
import produce from 'immer';

import { MESSAGES } from '../../constants';

import { newGame } from '../../utils/game';

function game(set) {
  return {
    ...newGame(),
    setGame(state) {
      return set(produce(state));
    },
  };
}

const store = createStore(function mutator(set) {
  return game(set);
});

store.subscribe(function listener({ setGame, ...payload }) {
  self.postMessage({ type: MESSAGES.STORE_UPDATE, payload });
});

export function saveUpdates(updateState) {
  store.getState().setGame(updateState);
}
