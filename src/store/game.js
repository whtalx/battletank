import produce from 'immer';

import { getFromLocalStorage } from '../utils';

import { ENEMIES, MAPS } from '../data';
import { GAME } from '../constants';

export default function game(set) {
  return {
    status: GAME.STATUS.RUNNING,
    defeated: false,
    enemies: ENEMIES[3],
    level: 3,
    lives: 3,
    map: MAPS[3],
    ...getFromLocalStorage({ hiScore: 20000 }),

    setGame(state) {
      return set(produce(state));
    },
  };
}
