import produce from 'immer';

import { getFromLocalStorage, newGame } from '../utils';

import { GAME } from '../constants';

export default function game(set) {
  return {
    status: GAME.STATUS.RUNNING,
    ...newGame(getFromLocalStorage({ hiScore: 20000 })),
    setGame(state) {
      return set(produce(state));
    },
  };
}
