/* eslint-disable no-restricted-globals */
import createStore from 'zustand/vanilla';

import { changeLevel } from '../utils';

import { GAME, MESSAGES } from '../constants';

import game from '../store/game';

const store = createStore(function mutator(set) {
  return game(set);
});

self.onmessage = function onmessage({ data: { type, payload } }) {
  function sendStore() {
    const { setGame, ...rest } = store.getState();
    self.postMessage({ type, payload: rest });
  }

  switch (type) {
    case MESSAGES.INIT: {
      store.getState().setGame(function updateState(state) {
        state.status = GAME.STATUS.WAITING;
      });

      sendStore();
      break;
    }

    case MESSAGES.SET_LEVEL: {
      store.getState().setGame(function updateState(state) {
        const updates = changeLevel(payload);

        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            state[key] = updates[key];
          }
        }
      });

      sendStore();
      break;
    }

    case MESSAGES.SET_STATE: {
      store.getState().setGame(function updateState(state) {
        state.status = payload;
      });

      sendStore();
      break;
    }

    default: {
      break;
    }
  }
};
