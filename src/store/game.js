import produce from 'immer';

import { getFromLocalStorage } from '../utils';

import { ENEMIES } from '../data';
import { GAME } from '../constants';

export default function game(set) {
  return {
    status: GAME.STATUS.WAITING,
    defeated: false,
    enemies: ENEMIES[0],
    level: 0,
    lives: 3,
    ...getFromLocalStorage({ hiScore: 20000 }),

    setGame(state) {
      return set(produce(state));
    },
  };
}
