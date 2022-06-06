import { store } from '../store';

import { MESSAGES } from '../constants';

const game = new Worker(new URL('./game/index.js', import.meta.url));

game.onmessage = function onmessage({ data: { type, payload } }) {
  switch (type) {
    case MESSAGES.INIT: {
      document.getElementById('canvas').classList.add('loaded');
      break;
    }

    case MESSAGES.STORE_UPDATE: {
      store.setState(function updateState(state) {
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            state.game[key] = payload[key];
          }
        }
      });

      break;
    }

    case MESSAGES.SET_SESSION: {
      store.setState(function updateState(state) {
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            state.session[key] = payload[key];
          }
        }
      });

      break;
    }

    default: {
      break;
    }
  }
};

export function postMessage(props) {
  game.postMessage(props);
}
