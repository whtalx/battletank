import produce from 'immer';

import { getFromLocalStorage } from '../utils';

import { ENEMIES, MAPS } from '../data';
import { GAME } from '../constants';

export default function game(set) {
  return {
    status: GAME.STATUS.RUNNING,
    defeated: false,
    enemies: ENEMIES[2],
    level: 2,
    lives: 3,
    map: MAPS[2],
    ...getFromLocalStorage({ hiScore: 20000 }),

    setGame(state) {
      return set(produce(state));
    },
  };
}
