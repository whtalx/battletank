import { store } from '../store';

import { MESSAGES } from '../constants';

const game = new Worker(new URL('./game.js', import.meta.url));

game.onmessage = function onmessage({ data: { type, payload } }) {
  switch (type) {
    case MESSAGES.INIT: {
      document.getElementById('canvas').classList.add('loaded');
      break;
    }

    default: {
      break;
    }
  }

  store.setState(function updateState(state) {
    state.game = { ...state.game, ...payload };
  });
};

export function postMessage(props) {
  game.postMessage(props);
}
